import { posts } from '../data/posts.js';

// An asynchronous boundary, like a real API, but no server is needed yet.
// Stage 2 will replace this fixed batch with getPosts({ cursor, limit }).
export function getInitialPosts({ delayMs = 650 } = {}) {
  return new Promise((resolve) => setTimeout(resolve, delayMs))
    .then(() => ({ items: structuredClone(posts.slice(0, 6)) }));
}
