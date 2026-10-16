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
  {
    "photoId": 1018,
    "caption": "Taking the long way home. Always worth it."
  },
  {
    "photoId": 1015,
    "caption": "A little perspective from somewhere up high."
  },
  {
    "photoId": 1016,
    "caption": "No agenda today. Just a good view."
  },
  {
    "photoId": 1039,
    "caption": "Found a quieter corner of the world."
  },
  {
    "photoId": 1043,
    "caption": "Collecting moments, one walk at a time."
  },
  {
    "photoId": 1025,
    "caption": "The best company for a slow afternoon."
  },
  {
    "photoId": 0,
    "caption": "An ordinary day with an unexpected highlight."
  },
  {
    "photoId": 1,
    "caption": "Leaving a little room for curiosity."
  },
  {
    "photoId": 2,
    "caption": "Today felt better at walking speed."
  },
  {
    "photoId": 3,
    "caption": "One small detour changed the whole afternoon."
  },
  {
    "photoId": 4,
    "caption": "A reminder to look up every now and then."
  },
  {
    "photoId": 5,
    "caption": "The kind of moment I almost walked past."
  },
  {
    "photoId": 6,
    "caption": "Saving this one for a rainy day."
  },
  {
    "photoId": 7,
    "caption": "A fresh page in the weekend notebook."
  },
  {
    "photoId": 8,
    "caption": "Nothing planned, plenty discovered."
  },
  {
    "photoId": 9,
    "caption": "Sometimes the pause is the best part."
  },
  {
    "photoId": 10,
    "caption": "Following whatever catches my eye."
  },
  {
    "photoId": 11,
    "caption": "This deserved a second look."
  },
  {
    "photoId": 12,
    "caption": "A little further from the usual routine."
  },
  {
    "photoId": 13,
    "caption": "Proof that an ordinary Tuesday can surprise you."
  },
  {
    "photoId": 14,
    "caption": "Trying to notice more and hurry less."
  },
  {
    "photoId": 15,
    "caption": "A new favorite from an unplanned stop."
  },
  {
    "photoId": 16,
    "caption": "One for the collection of little discoveries."
  },
  {
    "photoId": 17,
    "caption": "Glad I brought the camera today."
  },
  {
    "photoId": 18,
    "caption": "A moment that made the early start worthwhile."
  },
  {
    "photoId": 19,
    "caption": "Keeping a small memory of this afternoon."
  },
  {
    "photoId": 20,
    "caption": "The day took an interesting turn here."
  },
  {
    "photoId": 21,
    "caption": "No big story, just something worth sharing."
  },
  {
    "photoId": 22,
    "caption": "Finding inspiration between the errands."
  },
  {
    "photoId": 23,
    "caption": "This is what slowing down looked like today."
  },
  {
    "photoId": 24,
    "caption": "A familiar place, seen a little differently."
  },
  {
    "photoId": 25,
    "caption": "Stopped for a minute and stayed for ten."
  },
  {
    "photoId": 26,
    "caption": "The best part of taking a different route."
  },
  {
    "photoId": 27,
    "caption": "Adding another memory to the notebook."
  },
  {
    "photoId": 28,
    "caption": "A tiny escape from a busy week."
  },
  {
    "photoId": 29,
    "caption": "Looking for the details I usually miss."
  },
  {
    "photoId": 30,
    "caption": "Today brought a welcome change of pace."
  },
  {
    "photoId": 31,
    "caption": "Something about this made me stop."
  },
  {
    "photoId": 32,
    "caption": "An afternoon well spent doing very little."
  },
  {
    "photoId": 33,
    "caption": "Found a reason to linger a bit longer."
  },
  {
    "photoId": 34,
    "caption": "Letting the day unfold without a checklist."
  },
  {
    "photoId": 35,
    "caption": "A quick snapshot before moving on."
  },
  {
    "photoId": 36,
    "caption": "Another good reason to step outside the routine."
  },
  {
    "photoId": 37,
    "caption": "This one feels like a memory already."
  },
  {
    "photoId": 38,
    "caption": "A small discovery on an otherwise familiar day."
  },
  {
    "photoId": 39,
    "caption": "Making time for things with no deadline."
  },
  {
    "photoId": 40,
    "caption": "One last stop before heading home."
  },
  {
    "photoId": 41,
    "caption": "Grateful for the moments between the plans."
  },
  {
    "photoId": 42,
    "caption": "The sort of day I would happily repeat."
  },
  {
    "photoId": 43,
    "caption": "An unexpected favorite from this week."
  },
  {
    "photoId": 44,
    "caption": "Tucking this moment away for later."
  },
  {
    "photoId": 45,
    "caption": "There is always something new to notice."
  },
  {
    "photoId": 46,
    "caption": "Fifty-three fieldnotes, and plenty left to discover."
  }
];

// Fixed dates, IDs, and image IDs make repeated runs predictable.
// Each scene has its own caption and photo; pagination comes in the next lesson.
export const posts = scenes.map((scene, index) => {
  return {
    id: `post-${String(index + 1).padStart(3, '0')}`,
    author: { ...authors[index % authors.length] },
    caption: scene.caption,
    place: `Fieldnote ${String(index + 1).padStart(2, '0')}`,
    createdAt: new Date(Date.UTC(2026, 8, 30, 12) - index * 3_600_000).toISOString(),
    image: {
      url: `https://picsum.photos/id/${scene.photoId}/960/720`,
      alt: `Placeholder photograph for fieldnote ${index + 1}`,
      width: 960,
      height: 720,
    },
  };
});
