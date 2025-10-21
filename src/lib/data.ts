
import type { Category, Session } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'workout',
    name: 'Workout',
    description: 'Energizing sessions to get your body moving.',
    imageUrl: 'https://picsum.photos/seed/stylish-workout/600/400',
    imageHint: 'running illustration',
  },
  {
    id: 'yoga',
    name: 'Yoga',
    description: 'Find your flow and connect with your breath.',
    imageUrl: 'https://picsum.photos/seed/stylish-yoga/600/400',
    imageHint: 'yoga pose illustration',
  },
  {
    id: 'meditation',
    name: 'Meditation',
    description: 'Calm your mind and find inner peace.',
    imageUrl: 'https://picsum.photos/seed/stylish-meditation/600/400',
    imageHint: 'calm mind illustration',
  },
];

export const SESSIONS: Session[] = [
  // Workout
  {
    id: 'w-01',
    title: '5分で完了！朝のブーストワークアウト',
    category: 'workout',
    duration: 300,
    audioUrl: '/audio/workout-5min.mp3',
    imageUrl: 'https://picsum.photos/seed/w01-workout/600/400',
    imageHint: 'woman jogging',
  },
  {
    id: 'w-02',
    title: '10分で脂肪燃焼！カーディオブラスト',
    category: 'workout',
    duration: 600,
    audioUrl: '/audio/workout-10min.mp3',
    imageUrl: 'https://picsum.photos/seed/w02-workout/600/400',
    imageHint: 'running shoes',
  },
  // Yoga
  {
    id: 'y-01',
    title: '心と体を整えるモーニングストレッチ',
    category: 'yoga',
    duration: 480,
    audioUrl: '/audio/yoga-8min.mp3',
    imageUrl: 'https://picsum.photos/seed/y01-yoga/600/400',
    imageHint: 'sunrise yoga',
  },
  {
    id: 'y-02',
    title: '15分でリフレッシュ！パワーフローヨガ',
    category: 'yoga',
    duration: 900,
    audioUrl: '/audio/yoga-15min.mp3',
    imageUrl: 'https://picsum.photos/seed/y02-yoga/600/400',
    imageHint: 'yoga class',
  },
  // Meditation
  {
    id: 'm-01',
    title: '3分で集中力アップ！マインドフル呼吸法',
    category: 'meditation',
    duration: 180,
    audioUrl: '/audio/meditation-3min.mp3',
    imageUrl: 'https://picsum.photos/seed/m01-meditation/600/400',
    imageHint: 'zen garden',
  },
  {
    id: 'm-02',
    title: '10分でリラックス。ボディスキャン瞑想',
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
