
import type { Category, Session, Trainer } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'workout',
    name: 'ワークアウト',
    description: '体を動かして筋力やスタミナをつけよう',
    imageUrl: 'https://picsum.photos/seed/stylish-workout/600/400',
    imageHint: 'running illustration',
  },
  {
    id: 'yoga',
    name: 'ヨガ',
    description: '呼吸を意識して、基礎代謝を高めよう',
    imageUrl: 'https://picsum.photos/seed/yoga-mat-plant/600/400',
    imageHint: 'yoga pose illustration',
  },
  {
    id: 'stretch',
    name: 'ストレッチ',
    description: '柔軟性を高め、リラックスしよう',
    imageUrl: 'https://picsum.photos/seed/stylish-stretch/600/400',
    imageHint: 'stretching illustration',
  },
];

export const SESSIONS: Session[] = [
  // Workout - 初心者向け
  {
    id: 'w-01',
    title: '朝のエナジーブースト筋トレ',
    category: 'workout',
    duration: 300,
    audioUrl: '',
    imageUrl: 'https://picsum.photos/seed/w01-workout/600/400',
    imageHint: 'morning energy workout',
  },
  {
    id: 'w-02',
    title: 'スクワットで下半身強化',
    category: 'workout',
    duration: 480,
    audioUrl: '',
    imageUrl: 'https://picsum.photos/seed/w02-workout/600/400',
    imageHint: 'squat exercise',
  },
  {
    id: 'w-03',
    title: '腹筋3分チャレンジ',
    category: 'workout',
    duration: 180,
    audioUrl: '',
    imageUrl: 'https://picsum.photos/seed/w03-workout/600/400',
    imageHint: 'abs workout',
  },
  // Workout - 中級者向け
  {
    id: 'w-04',
    title: 'ヒップアップワークアウト',
    category: 'workout',
    duration: 600,
    audioUrl: '',
    imageUrl: 'https://picsum.photos/seed/w04-workout/600/400',
    imageHint: 'hip up workout',
  },
  {
    id: 'w-05',
    title: 'サーキットトレーニング（短時間）',
    category: 'workout',
    duration: 720,
    audioUrl: '',
    imageUrl: 'https://picsum.photos/seed/w05-workout/600/400',
    imageHint: 'circuit training',
  },
  // Yoga - 初心者向け
  {
    id: 'y-01',
    title: '朝の目覚めヨガ',
    category: 'yoga',
    duration: 600,
    audioUrl: '',
    imageUrl: 'https://picsum.photos/seed/y01-yoga/600/400',
    imageHint: 'morning yoga',
  },
  {
    id: 'y-02',
    title: '肩こり改善ヨガ',
    category: 'yoga',
    duration: 480,
    audioUrl: '',
    imageUrl: 'https://picsum.photos/seed/y02-yoga/600/400',
    imageHint: 'shoulder relief yoga',
  },
  {
    id: 'y-03',
    title: '夜の安眠ヨガ',
    category: 'yoga',
    duration: 720,
    audioUrl: '',
    imageUrl: 'https://picsum.photos/seed/y03-yoga/600/400',
    imageHint: 'bedtime yoga',
  },
  // Yoga - 中級者向け
  {
    id: 'y-04',
    title: '太陽礼拝ショートフロー',
    category: 'yoga',
    duration: 900,
    audioUrl: '',
    imageUrl: 'https://picsum.photos/seed/y04-yoga/600/400',
    imageHint: 'sun salutation flow',
  },
  {
    id: 'y-05',
    title: '体幹を鍛えるヨガ',
    category: 'yoga',
    duration: 1080,
    audioUrl: '',
    imageUrl: 'https://picsum.photos/seed/y05-yoga/600/400',
    imageHint: 'core strengthening yoga',
  },
  // Stretch - 初心者向け
  {
    id: 's-01',
    title: '朝の全身ストレッチ',
    category: 'stretch',
    duration: 480,
    audioUrl: '',
    imageUrl: 'https://picsum.photos/seed/s01-stretch/600/400',
    imageHint: 'morning full body stretch',
  },
  {
    id: 's-02',
    title: '首・肩こり解消ストレッチ',
    category: 'stretch',
    duration: 300,
    audioUrl: '',
    imageUrl: 'https://picsum.photos/seed/s02-stretch/600/400',
    imageHint: 'neck shoulder stretch',
  },
  {
    id: 's-03',
    title: '夜のリラックスストレッチ',
    category: 'stretch',
    duration: 600,
    audioUrl: '',
    imageUrl: 'https://picsum.photos/seed/s03-stretch/600/400',
    imageHint: 'evening relaxation stretch',
  },
  // Stretch - 中級者向け
  {
    id: 's-04',
    title: '背骨を伸ばすストレッチ',
    category: 'stretch',
    duration: 720,
    audioUrl: '',
    imageUrl: 'https://picsum.photos/seed/s04-stretch/600/400',
    imageHint: 'spine stretching',
  },
  {
    id: 's-05',
    title: '股関節を柔らかくするストレッチ',
    category: 'stretch',
    duration: 900,
    audioUrl: '',
    imageUrl: 'https://picsum.photos/seed/s05-stretch/600/400',
    imageHint: 'hip flexibility stretch',
  },
];

export const TRAINERS: Trainer[] = [
    { 
        id: 1, 
        name: 'Sora', 
        imageUrl: 'https://picsum.photos/seed/trainer1/800/600', 
        imageHint: 'female trainer portrait', 
        groupId: 'sora-group',
        specialty: 'ヨガ・ストレッチ',
        bio: '10年以上のヨガ指導経験を持つインストラクター。心と体のバランスを大切にしたレッスンを提供します。',
        followers: 12500
    },
    { 
        id: 2, 
        name: 'Kaito', 
        imageUrl: 'https://picsum.photos/seed/trainer2/800/600', 
        imageHint: 'male trainer portrait', 
        groupId: 'kaito-group',
        specialty: 'ワークアウト・筋トレ',
        bio: 'パーソナルトレーナーとして多くのクライアントをサポート。効率的で楽しいトレーニングが得意です。',
        followers: 8900
    },
    { 
        id: 3, 
        name: 'Yui', 
        imageUrl: 'https://picsum.photos/seed/trainer3/800/600', 
        imageHint: 'female trainer smiling', 
        groupId: 'yui-group',
        specialty: 'ストレッチ・リラクゼーション',
        bio: 'リハビリテーション専門の理学療法士。体の不調改善と予防に特化したプログラムを提供します。',
        followers: 15200
    },
];

// NOTE: The audio files are placeholders. In a real app, these would point to files in Firebase Storage.
// For this project, we assume these files exist in the public/audio directory.
// You would need to add these mp3 files yourself.

