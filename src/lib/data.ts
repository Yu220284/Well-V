import type { Category, Session } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'workout',
    name: 'Workout',
    description: 'Energizing sessions to get your body moving.',
    imageUrl: 'https://picsum.photos/seed/workout/600/400',
    imageHint: 'woman stretching',
  },
  {
    id: 'yoga',
    name: 'Yoga',
    description: 'Find your flow and connect with your breath.',
    imageUrl: 'https://picsum.photos/seed/yoga/600/400',
    imageHint: 'yoga pose',
  },
  {
    id: 'meditation',
    name: 'Meditation',
    description: 'Calm your mind and find inner peace.',
    imageUrl: 'https://picsum.photos/seed/meditation/600/400',
    imageHint: 'calm water',
  },
];

export const SESSIONS: Session[] = [
  // Workout
  {
    id: 'w-01',
    title: '5-Minute Morning Boost',
    category: 'workout',
    duration: 300,
    audioUrl: '/audio/workout-5min.mp3',
    imageUrl: 'https://picsum.photos/seed/w01-workout/600/400',
    imageHint: 'woman jogging',
  },
  {
    id: 'w-02',
    title: '10-Minute Cardio Blast',
    category: 'workout',
    duration: 600,
    audioUrl: '/audio/workout-10min.mp3',
    imageUrl: 'https://picsum.photos/seed/w02-workout/600/400',
    imageHint: 'running shoes',
  },
  // Yoga
  {
    id: 'y-01',
    title: 'Gentle Morning Stretch',
    category: 'yoga',
    duration: 480,
    audioUrl: '/audio/yoga-8min.mp3',
    imageUrl: 'https://picsum.photos/seed/y01-yoga/600/400',
    imageHint: 'sunrise yoga',
  },
  {
    id: 'y-02',
    title: '15-Minute Power Flow',
    category: 'yoga',
    duration: 900,
    audioUrl: '/audio/yoga-15min.mp3',
    imageUrl: 'https://picsum.photos/seed/y02-yoga/600/400',
    imageHint: 'yoga class',
  },
  // Meditation
  {
    id: 'm-01',
    title: '3-Minute Mindful Breath',
    category: 'meditation',
    duration: 180,
    audioUrl: '/audio/meditation-3min.mp3',
    imageUrl: 'https://picsum.photos/seed/m01-meditation/600/400',
    imageHint: 'zen garden',
  },
  {
    id: 'm-02',
    title: '10-Minute Body Scan',
    category: 'meditation',
    duration: 600,
    audioUrl: '/audio/meditation-10min.mp3',
    imageUrl: 'https://picsum.photos/seed/m02-meditation/600/400',
    imageHint: 'stacked stones',
  },
];

// NOTE: The audio files are placeholders. In a real app, these would point to files in Firebase Storage.
// For this project, we assume these files exist in the public/audio directory.
// You would need to add these mp3 files yourself.
