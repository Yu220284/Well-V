
import type { Category, Session, Trainer } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'workout',
    name: 'ワークアウト',
    description: '体を動かして筋力やスタミナをつけよう',
    imageUrl: '/images/training.png',
    imageHint: 'running illustration',
  },
  {
    id: 'yoga',
    name: 'ヨガ',
    description: '呼吸を意識して、基礎代謝を高めよう',
    imageUrl: '/images/yoga.png',
    imageHint: 'yoga pose illustration',
  },
  {
    id: 'stretch',
    name: 'ストレッチ',
    description: '柔軟性を高め、リラックスしよう',
    imageUrl: '/images/stretch.png',
    imageHint: 'stretching illustration',
  },
];

export const SESSIONS: Session[] = [
  { 
    id: 'v-01', 
    title: 'ヒーリングヨガ＆ストレッチ（動画）', 
    category: 'yoga', 
    duration: 30, 
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    hasVideo: true,
    isPremium: true,
    imageUrl: 'https://picsum.photos/seed/v01-premium/600/400', 
    imageHint: 'premium yoga video session', 
    tags: ['動画', 'プレミアム'], 
    trainerId: 1 
  },
  { id: 'y-01', title: '朝の目覚めヨガ', category: 'yoga', duration: 600, audioUrl: '', imageUrl: 'https://picsum.photos/seed/y01-yoga/600/400', imageHint: 'morning yoga', tags: ['朝', '目覚め'], trainerId: 1 },
  { id: 'w-01', title: '朝のエナジーブースト筋トレ', category: 'workout', duration: 300, audioUrl: '/audio/w01-workout-trainer1.mp3', imageUrl: 'https://picsum.photos/seed/w01-workout/600/400', imageHint: 'morning energy workout', tags: ['朝', '筋トレ'], trainerId: 2 },
  { id: 's-01', title: '朝の全身ストレッチ', category: 'stretch', duration: 480, audioUrl: '', imageUrl: 'https://picsum.photos/seed/s01-stretch/600/400', imageHint: 'morning full body stretch', trainerId: 3 },
  { id: 'w-02', title: 'スクワットで下半身強化', category: 'workout', duration: 480, audioUrl: '', imageUrl: 'https://picsum.photos/seed/w02-workout/600/400', imageHint: 'squat exercise', tags: ['下半身'], trainerId: 4 },
  { id: 'w-03', title: '腹筋3分チャレンジ', category: 'workout', duration: 180, audioUrl: '', imageUrl: 'https://picsum.photos/seed/w03-workout/600/400', imageHint: 'abs workout', trainerId: 5 },
  { id: 'w-04', title: 'ヒップアップワークアウト', category: 'workout', duration: 600, audioUrl: '', imageUrl: 'https://picsum.photos/seed/w04-workout/600/400', imageHint: 'hip up workout', trainerId: 6 },
  { id: 'w-05', title: 'サーキットトレーニング', category: 'workout', duration: 720, audioUrl: '', imageUrl: 'https://picsum.photos/seed/w05-workout/600/400', imageHint: 'circuit training', trainerId: 7 },
  { id: 'y-02', title: '肩こり改善ヨガ', category: 'yoga', duration: 480, audioUrl: '', imageUrl: 'https://picsum.photos/seed/y02-yoga/600/400', imageHint: 'shoulder relief yoga', tags: ['肩こり'], trainerId: 8 },
  { id: 'y-03', title: '夜の安眠ヨガ', category: 'yoga', duration: 720, audioUrl: '', imageUrl: 'https://picsum.photos/seed/y03-yoga/600/400', imageHint: 'bedtime yoga', trainerId: 9 },
  { id: 'y-04', title: '太陽礼拝ショートフロー', category: 'yoga', duration: 900, audioUrl: '', imageUrl: 'https://picsum.photos/seed/y04-yoga/600/400', imageHint: 'sun salutation flow', trainerId: 10 },
  { id: 'y-05', title: '体幹を鍛えるヨガ', category: 'yoga', duration: 1080, audioUrl: '', imageUrl: 'https://picsum.photos/seed/y05-yoga/600/400', imageHint: 'core strengthening yoga', trainerId: 11 },
  { id: 's-02', title: '首・肩こり解消ストレッチ', category: 'stretch', duration: 300, audioUrl: '', imageUrl: 'https://picsum.photos/seed/s02-stretch/600/400', imageHint: 'neck shoulder stretch', trainerId: 12 },
  { id: 's-03', title: '夜のリラックスストレッチ', category: 'stretch', duration: 600, audioUrl: '', imageUrl: 'https://picsum.photos/seed/s03-stretch/600/400', imageHint: 'evening relaxation stretch', trainerId: 13 },
  { id: 's-04', title: '背骨を伸ばすストレッチ', category: 'stretch', duration: 720, audioUrl: '', imageUrl: 'https://picsum.photos/seed/s04-stretch/600/400', imageHint: 'spine stretching', trainerId: 14 },
  { id: 's-05', title: '股関節を柔らかくするストレッチ', category: 'stretch', duration: 900, audioUrl: '', imageUrl: 'https://picsum.photos/seed/s05-stretch/600/400', imageHint: 'hip flexibility stretch', trainerId: 15 },
];

export const TRAINERS: Trainer[] = [
    { id: 1, name: 'あかりん', imageUrl: 'https://picsum.photos/seed/trainer1/800/600', imageHint: 'female trainer portrait', communityId: 'akarin-group', specialty: 'ヨガ', bio: '朝ヨガで心と体をリフレッシュ！', followers: 12500, tags: ['ヨガ', '朝活'] },
    { id: 2, name: 'りゅうせい', imageUrl: 'https://picsum.photos/seed/trainer2/800/600', imageHint: 'male trainer portrait', communityId: 'ryusei-group', specialty: 'ワークアウト', bio: '筋トレで理想のボディを手に入れよう！', followers: 8900, tags: ['筋トレ', 'ワークアウト'] },
    { id: 3, name: 'ゆめの', imageUrl: 'https://picsum.photos/seed/trainer3/800/600', imageHint: 'female trainer smiling', communityId: 'yumeno-group', specialty: 'ストレッチ', bio: 'ストレッチで柔軟な体を作ろう！', followers: 15200, tags: ['ストレッチ', 'リラックス'] },
    { id: 4, name: 'そらち', imageUrl: 'https://picsum.photos/seed/trainer4/800/600', imageHint: 'female trainer portrait', communityId: 'sorachi-group', specialty: 'ワークアウト', bio: '下半身強化で基礎代謝アップ！', followers: 9800, tags: ['下半身', '筋トレ'] },
    { id: 5, name: 'はると', imageUrl: 'https://picsum.photos/seed/trainer5/800/600', imageHint: 'male trainer portrait', communityId: 'haruto-group', specialty: 'ワークアウト', bio: '短時間で効果的な腹筋トレーニング！', followers: 11200, tags: ['腹筋', '時短'] },
    { id: 6, name: 'みなと', imageUrl: 'https://picsum.photos/seed/trainer6/800/600', imageHint: 'male trainer portrait', communityId: 'minato-group', specialty: 'ワークアウト', bio: 'ヒップアップで美しいボディライン！', followers: 13400, tags: ['ヒップ', '美ボディ'] },
    { id: 7, name: 'ひなた', imageUrl: 'https://picsum.photos/seed/trainer7/800/600', imageHint: 'female trainer portrait', communityId: 'hinata-group', specialty: 'ワークアウト', bio: 'サーキットトレーニングで全身を鍛える！', followers: 10500, tags: ['全身', 'サーキット'] },
    { id: 8, name: 'るな', imageUrl: 'https://picsum.photos/seed/trainer8/800/600', imageHint: 'female trainer portrait', communityId: 'runa-group', specialty: 'ヨガ', bio: '肩こり解消ヨガでスッキリ！', followers: 14800, tags: ['肩こり', 'ヨガ'] },
    { id: 9, name: 'こはく', imageUrl: 'https://picsum.photos/seed/trainer9/800/600', imageHint: 'female trainer portrait', communityId: 'kohaku-group', specialty: 'ヨガ', bio: '夜ヨガで質の良い睡眠を！', followers: 16700, tags: ['夜', '安眠'] },
    { id: 10, name: 'れん', imageUrl: 'https://picsum.photos/seed/trainer10/800/600', imageHint: 'male trainer portrait', communityId: 'ren-group', specialty: 'ヨガ', bio: '太陽礼拝で一日をスタート！', followers: 12900, tags: ['太陽礼拝', '朝'] },
    { id: 11, name: 'あおい', imageUrl: 'https://picsum.photos/seed/trainer11/800/600', imageHint: 'female trainer portrait', communityId: 'aoi-group', specialty: 'ヨガ', bio: '体幹強化で安定した体を！', followers: 11600, tags: ['体幹', 'ヨガ'] },
    { id: 12, name: 'つばさ', imageUrl: 'https://picsum.photos/seed/trainer12/800/600', imageHint: 'female trainer portrait', communityId: 'tsubasa-group', specialty: 'ストレッチ', bio: '朝ストレッチで一日を元気に！', followers: 13100, tags: ['朝', 'ストレッチ'] },
    { id: 13, name: 'かなで', imageUrl: 'https://picsum.photos/seed/trainer13/800/600', imageHint: 'female trainer portrait', communityId: 'kanade-group', specialty: 'ストレッチ', bio: '首・肩の疲れをリセット！', followers: 15900, tags: ['首', '肩こり'] },
    { id: 14, name: 'しおん', imageUrl: 'https://picsum.photos/seed/trainer14/800/600', imageHint: 'female trainer portrait', communityId: 'shion-group', specialty: 'ストレッチ', bio: '背骨ストレッチで姿勢改善！', followers: 10200, tags: ['背骨', '姿勢'] },
    { id: 15, name: 'いつき', imageUrl: 'https://picsum.photos/seed/trainer15/800/600', imageHint: 'male trainer portrait', communityId: 'itsuki-group', specialty: 'ストレッチ', bio: '股関節の柔軟性を高めよう！', followers: 9500, tags: ['股関節', '柔軟性'] },
];

// NOTE: The audio files are placeholders. In a real app, these would point to files in Firebase Storage.
// For this project, we assume these files exist in the public/audio directory.
// You would need to add these mp3 files yourself.

