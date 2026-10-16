# Fieldnotes — Feed Lab

A React + JavaScript learning project for pagination and frontend system design.
**Current checkpoint: 1 — scaffold, data model, and basic feed.**

## Run locally

Use Node 22.12+ (Node 24 works).

```sh
npm install
npm run dev
```

Open the local address printed in the terminal. `npm run build` creates a production build; `npm run preview` serves that build locally.

Post data is local. Photos load from [Lorem Picsum](https://picsum.photos/), using fixed image IDs rather than random URLs. Internet access is needed for photos and optional Google Fonts; system fonts provide a fallback. No credentials or backend setup are required. Tooling: [Vite](https://vite.dev/guide/).

## Lesson 1: follow the data

Read these files in order:

1. `src/data/posts.js`: the data model and 53 reproducible posts. Each post has stable identity, an author, a caption, an ISO date, and image metadata. IDs identify posts; array positions do not.
2. `src/api/feed.js`: `getInitialPosts()` waits 650 ms, then resolves to `{ items }`, containing all 53 posts. This is an in-browser fake API, not an HTTP server. Returning a copy keeps UI changes from modifying the source dataset.
3. `src/components/Feed.jsx`: owns `posts` and `status`, calls the API in an effect, and maps results into components. Status is one of `loading`, `success`, or `error`, so contradictory loading/error flags cannot occur.
4. `src/components/Post.jsx`: receives a post through props and renders it. It knows nothing about fetching.
5. `src/App.jsx`: arranges the page. `src/styles.css` handles presentation and responsive layout.

The flow is **dataset → API promise → Feed state → Post props → rendered UI**.

### Why the effect has cleanup

A promise may finish after its effect is no longer active. The local `ignore` flag prevents that result from updating state. React Strict Mode intentionally runs an extra setup/cleanup cycle in development; you may see two calls to the fake API. Both timers run, but only the current effect uses its result. This is stale-result protection, not cancellation or request deduplication. We will implement those mechanics explicitly later.

### What to try before moving on

- Change the API delay to 2000 ms. Predict the first render, then reload.
- Change one caption in the dataset. Follow how it reaches the screen.
- Temporarily return `{ items: [] }` to see the empty state.
- Temporarily throw `new Error('Practice failure')` after the delay to see the error state. Restore the function afterward.
- Explain why `key={post.id}` is safer than using the array index when posts are inserted or reordered.
- Explain why `Post` does not need its own copy of the feed state.

The image width and height are included as basic HTML metadata. Custom image placeholders, lazy loading, and failure recovery are a dedicated later layer. There are no pretend social buttons yet; likes and saves will become real behaviors when we study optimistic updates.

## Incremental roadmap

Keep each checkpoint working before adding the next. No TanStack Query initially.

| Step | Build | Question to be able to answer |
| --- | --- | --- |
| 1 — current | Data model, async boundary, 53-post feed, basic loading/error/empty states | Who owns data, and what causes a render? |
| 2 | `getPosts({ cursor, limit })` returning `{ items, nextCursor, hasNextPage }` | Why can offset pagination skip or repeat posts when data changes? |
| 3 | Load More, append results, prevent concurrent requests | Why must appending use the latest state? |
| 4 | An IntersectionObserver sentinel, retaining an accessible Load More fallback | What happens when the sentinel stays visible during a request? |
| 5 | PostImage, loading/error placeholders, reserved aspect ratio, native lazy loading | Why can image loading move the content under the user? |
| 6 | Cache keys, deduplication by post ID, request deduplication, bounded prefetch | What is cached, for how long, and when is it invalidated? |
| 7 | Deterministic failure injection, retry the failed cursor, end-of-feed behavior | How do we preserve existing posts when another page fails? |
| 8 | Virtualization with measured heights and scroll anchoring | Why does pagination alone not bound DOM size or memory? |
| 9 | Optimistic likes/saves, live inserts, offline recovery, responsive images/CDNs, accessibility and metrics | Which tradeoffs change with latency, data volume, and user scale? |

### Next lesson: cursor contract

Before writing code, define the request and response shape. Use a stable sort, such as `createdAt DESC, id DESC`, with the ID as the tie-breaker. Treat the cursor as an opaque continuation token in the UI. The fake API will resolve it against the dataset. A browser-local implementation illustrates semantics; it cannot establish backend scalability or security guarantees.

Then walk through this case: fetch page 1, insert a newer post, fetch page 2. Identify why an offset can repeat an item and how a cursor avoids shifting the continuation point. We will implement and verify that behavior before wiring up Load More.

## Deliberate boundaries at this checkpoint

All 53 posts are fetched once. Cursor pagination, Load More, IntersectionObserver, caching, prefetch, retries, deduplication, and virtualization are **not implemented yet**. They are sequential lessons, not hidden abstractions in the starter. Pagination will split this dataset into smaller batches in the next lesson.
