/**
 * @typedef {Object} Post
 * @property {string} id Stable identity, independent of its position in the feed.
 * @property {{name: string, handle: string, initials: string}} author
 * @property {string} caption
 * @property {string} createdAt ISO timestamp, useful for our later cursor ordering.
 * @property {{url: string, alt: string, width: number, height: number}} image
 */

const authors = [
  { name: 'Maya Chen', handle: 'mayawanders', initials: 'MC' },
  { name: 'Arjun Rao', handle: 'arjunoutside', initials: 'AR' },
  { name: 'Leah Brooks', handle: 'slowmornings', initials: 'LB' },
];

const scenes = [
  { photoId: 1018, alt: 'A mountain valley stretching toward distant peaks', caption: 'Taking the long way home. Always worth it.', place: 'Out in the open' },
  { photoId: 1015, alt: 'A river winding through a rugged mountain landscape', caption: 'A little perspective from somewhere up high.', place: 'Above the everyday' },
  { photoId: 1016, alt: 'Rocky mountain peaks beneath an open sky', caption: 'No agenda today. Just a good view.', place: 'Off the clock' },
  { photoId: 1039, alt: 'A waterfall flowing through a green landscape', caption: 'Found a quieter corner of the world.', place: 'Somewhere quiet' },
  { photoId: 1043, alt: 'A broad natural landscape beneath the sky', caption: 'Collecting moments, one walk at a time.', place: 'The scenic route' },
  { photoId: 1025, alt: 'A dog looking toward the camera', caption: 'The best company for a slow afternoon.', place: 'Close to home' },
];

// Fixed dates, IDs, and image IDs make repeated runs predictable.
// The extra posts are the dataset for our next lesson; stage 1 displays only six.
export const posts = Array.from({ length: 36 }, (_, index) => {
  const scene = scenes[index % scenes.length];
  return {
    id: `post-${String(index + 1).padStart(3, '0')}`,
    author: { ...authors[index % authors.length] },
    caption: scene.caption,
    place: scene.place,
    createdAt: new Date(Date.UTC(2026, 8, 30, 12) - index * 3_600_000).toISOString(),
    image: {
      url: `https://picsum.photos/id/${scene.photoId}/960/720`,
      alt: scene.alt,
      width: 960,
      height: 720,
    },
  };
});
