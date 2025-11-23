"use client";

export type Language = 'ja' | 'en' | 'zh';

export interface LanguagePack {
  code: Language;
  name: string;
  version: string;
  translations: Record<string, any>;
}

export interface VoicePack {
  code: string;
  language: Language;
  name: string;
  version: string;
  voices: Record<string, string>;
}

const LANGUAGE_PACK_KEY = 'wellv_language_pack';
const SELECTED_LANGUAGE_KEY = 'wellv_selected_language';

export const AVAILABLE_LANGUAGES: { code: Language; name: string; nativeName: string }[] = [
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
];

export async function downloadLanguagePack(language: Language): Promise<LanguagePack> {
  const response = await fetch(`/messages/${language}.json`);
  const translations = await response.json();
  
  const pack: LanguagePack = {
    code: language,
    name: AVAILABLE_LANGUAGES.find(l => l.code === language)?.name || language,
    version: '1.0.0',
    translations,
  };
  
  localStorage.setItem(`${LANGUAGE_PACK_KEY}_${language}`, JSON.stringify(pack));
  return pack;
}

export function getStoredLanguagePack(language: Language): LanguagePack | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(`${LANGUAGE_PACK_KEY}_${language}`);
  return stored ? JSON.parse(stored) : null;
}

export function setSelectedLanguage(language: Language): void {
  localStorage.setItem(SELECTED_LANGUAGE_KEY, language);
}

export function getSelectedLanguage(): Language {
  if (typeof window === 'undefined') return 'ja';
  return (localStorage.getItem(SELECTED_LANGUAGE_KEY) as Language) || 'ja';
}

export function clearLanguagePacks(): void {
  AVAILABLE_LANGUAGES.forEach(lang => {
    localStorage.removeItem(`${LANGUAGE_PACK_KEY}_${lang.code}`);
  });
}
