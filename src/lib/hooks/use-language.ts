"use client";

import { useState, useEffect } from 'react';
import { Language, LanguagePack, getSelectedLanguage, getStoredLanguagePack, downloadLanguagePack, setSelectedLanguage } from '@/lib/i18n/language-pack';

export function useLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('ja');
  const [languagePack, setLanguagePack] = useState<LanguagePack | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initLanguage = async () => {
      const selected = getSelectedLanguage();
      setCurrentLanguage(selected);
      
      let pack = getStoredLanguagePack(selected);
      if (!pack) {
        pack = await downloadLanguagePack(selected);
      }
      setLanguagePack(pack);
      setIsLoading(false);
    };
    
    initLanguage();
  }, []);

  const changeLanguage = async (language: Language) => {
    setIsLoading(true);
    let pack = getStoredLanguagePack(language);
    if (!pack) {
      pack = await downloadLanguagePack(language);
    }
    setSelectedLanguage(language);
    setCurrentLanguage(language);
    setLanguagePack(pack);
    setIsLoading(false);
  };

  const t = (key: string, defaultValue?: string): string => {
    if (!languagePack) return defaultValue || key;
    const keys = key.split('.');
    let value: any = languagePack.translations;
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return defaultValue || key;
    }
    return value || defaultValue || key;
  };

  return { currentLanguage, changeLanguage, t, isLoading };
}
