import { posts } from "../data/posts.js";

// An asynchronous boundary, like a real API, but no server is needed yet.
// Stage 2 will replace this fixed batch with getPosts({ cursor, limit }).
export function getPosts({
  cursor = null,
  limit = 6,
  delayMs = 650,
  searchQuery = "",
} = {}) {
  console.log("searchQuery in utility getPosts", searchQuery);
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredPosts = posts.filter((post) =>
    post.caption.toLowerCase().includes(normalizedQuery),
  );
  return new Promise((resolve) => setTimeout(resolve, delayMs)).then(() => {
    const cursorIndex =
      cursor === null
        ? -1
        : filteredPosts.findIndex((post) => post.id === cursor);

    if (cursor !== null && cursorIndex === -1) {
      throw new Error("Invalid cursor");
    }

    const startIndex = cursorIndex + 1;
    const items = filteredPosts.slice(startIndex, startIndex + limit);
    const hasNextPage = startIndex + items.length < filteredPosts.length;

    return {
      items: structuredClone(items),
      nextCursor: hasNextPage ? items[items.length - 1].id : null,
      hasNextPage,
    };
  });
}
