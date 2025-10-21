import type { Category, Session } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'workout',
    name: 'Workout',
    description: 'Energizing sessions to get your body moving.',
    imageUrl: 'https://picsum.photos/seed/picsum-workout/600/400',
    imageHint: 'woman running',
  },
  {
    id: 'yoga',
    name: 'Yoga',
    description: 'Find your flow and connect with your breath.',
    imageUrl: 'https://picsum.photos/seed/picsum-yoga/600/400',
    imageHint: 'woman doing yoga',
  },
  {
    id: 'meditation',
    name: 'Meditation',
    description: 'Calm your mind and find inner peace.',
    imageUrl: 'https://picsum.photos/seed/picsum-meditation/600/400',
    imageHint: 'lotus flower',
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
    imageUrl: 'https://picsum.photos/seed/w01-sunrise/600/400',
    imageHint: 'morning sunrise',
  },
  {
    id: 'w-02',
    title: '10-Minute Cardio Blast',
    category: 'workout',
    duration: 600,
    audioUrl: '/audio/workout-10min.mp3',
    imageUrl: 'https://picsum.photos/seed/w02-running/600/400',
    imageHint: 'person running',
  },
  // Yoga
  {
    id: 'y-01',
    title: 'Gentle Morning Stretch',
    category: 'yoga',
    duration: 480,
    audioUrl: '/audio/yoga-8min.mp3',
    imageUrl: 'https://picsum.photos/seed/y01-stretch/600/400',
    imageHint: 'woman stretching',
  },
  {
    id: 'y-02',
    title: '15-Minute Power Flow',
    category: 'yoga',
    duration: 900,
    audioUrl: '/audio/yoga-15min.mp3',
    imageUrl: 'https://picsum.photos/seed/y02-flow/600/400',
    imageHint: 'yoga pose',
  },
  // Meditation
  {
    id: 'm-01',
    title: '3-Minute Mindful Breath',
    category: 'meditation',
    duration: 180,
    audioUrl: '/audio/meditation-3min.mp3',
    imageUrl: 'https://picsum.photos/seed/m01-breath/600/400',
    imageHint: 'calm water',
  },
  {
    id: 'm-02',
    title: '10-Minute Body Scan',
    category: 'meditation',
    duration: 600,
    audioUrl: '/audio/meditation-10min.mp3',
    imageUrl: 'https://picsum.photos/seed/m02-serene/600/400',
    imageHint: 'serene landscape',
  },
];

// NOTE: The audio files are placeholders. In a real app, these would point to files in Firebase Storage.
// For this project, we assume these files exist in the public/audio directory.
// You would need to add these mp3 files yourself.
