"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { RecordingStudio } from "@/components/recording/RecordingStudio";
import { useLanguage } from "@/lib/hooks/use-language";
import { translations } from "@/lib/i18n/translations";
import type { RecordingScript } from "@/lib/types";
import { Crown, Search, Clock, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SESSIONS } from "@/lib/data";
import { RECORDING_SCRIPTS } from "@/lib/recording-scripts";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const convertSessionToScript = (session: any): RecordingScript => {
  const existingScript = RECORDING_SCRIPTS.find(s => s.id === session.id);
  if (existingScript) return existingScript;

  const segmentCount = Math.ceil(session.duration / 60);
  const segments = Array.from({ length: segmentCount }, (_, i) => ({
    id: `${i + 1}`,
    text: `セグメント ${i + 1} のガイダンステキスト`,
    duration: Math.min(60, session.duration - i * 60),
  }));

  return {
    id: session.id,
    title: session.title,
    category: session.category,
    totalDuration: session.duration,
    segments,
    tags: session.tags || [],
    language: 'ja',
    isRecorded: !!session.audioUrl,
  };
};

const SCRIPTS = SESSIONS.filter(s => !s.hasVideo).map(convertSessionToScript);

export default function RecordingPage() {
  const { language } = useLanguage();
  const t = translations[language || 'ja'].recording;
  const tTags = translations[language || 'ja'].tags;
  const [selectedScript, setSelectedScript] = useState<RecordingScript | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [tagFilters, setTagFilters] = useState<string[]>([]);
  const [languageFilters, setLanguageFilters] = useState<string[]>([]);
  const [durationFilters, setDurationFilters] = useState<string[]>([]);
  const [showUnrecorded, setShowUnrecorded] = useState(false);

  const allTags = Array.from(new Set(SCRIPTS.flatMap(s => s.tags || [])));
  const allLanguages = Array.from(new Set(SCRIPTS.map(s => s.language || 'ja')));

  const filteredScripts = SCRIPTS.filter(script => {
    const matchesSearch = script.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilters.length === 0 || categoryFilters.includes(script.category);
    const matchesTags = tagFilters.length === 0 || (script.tags && tagFilters.some(tag => script.tags!.includes(tag)));
    const matchesLanguage = languageFilters.length === 0 || languageFilters.includes(script.language || 'ja');
    const matchesUnrecorded = !showUnrecorded || !script.isRecorded;
    
    let matchesDuration = durationFilters.length === 0;
    if (durationFilters.includes('short') && script.totalDuration <= 300) matchesDuration = true;
    if (durationFilters.includes('medium') && script.totalDuration > 300 && script.totalDuration <= 600) matchesDuration = true;
    if (durationFilters.includes('long') && script.totalDuration > 600) matchesDuration = true;

    return matchesSearch && matchesCategory && matchesTags && matchesLanguage && matchesDuration && matchesUnrecorded;
  });

  const toggleFilter = (value: string, filters: string[], setFilters: (v: string[]) => void) => {
    setFilters(filters.includes(value) ? filters.filter(f => f !== value) : [...filters, value]);
  };

  if (selectedScript) {
    return (
      <div className="pb-24 bg-gradient-to-br from-background to-secondary/20 min-h-screen">
        <Header />
        <PageTransition>
          <div className="pt-12">
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <RecordingStudio 
                script={selectedScript} 
                onBack={() => setSelectedScript(null)} 
              />
            </main>
          </div>
        </PageTransition>
      </div>
    );
  }

  return (
    <div className="pb-24 bg-gradient-to-br from-background to-secondary/20 min-h-screen">
      <Header />
      <PageTransition>
        <div className="pt-12">
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 shadow-sm transform -skew-x-12 -ml-4 mr-8 rounded-r-lg"></div>
              <h1 className="relative text-xl font-bold font-headline py-1.5 pl-2 flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-500" />
                {t.title}
              </h1>
            </div>

            <div className="flex gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t.selectScript}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>{language === 'ja' ? '絞り込み' : 'Filters'}</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-6 mt-6">
                    <div>
                      <h3 className="font-semibold mb-3">{language === 'ja' ? 'カテゴリ' : 'Category'}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="cat-all"
                            checked={categoryFilters.length === 3}
                            onCheckedChange={(checked) => setCategoryFilters(checked ? ['workout', 'yoga', 'stretch'] : [])}
                          />
                          <Label htmlFor="cat-all" className="font-medium">{language === 'ja' ? '全て' : 'All'}</Label>
                        </div>
                        {['workout', 'yoga', 'stretch'].map(cat => (
                          <div key={cat} className="flex items-center space-x-2">
                            <Checkbox
                              id={`cat-${cat}`}
                              checked={categoryFilters.includes(cat)}
                              onCheckedChange={() => toggleFilter(cat, categoryFilters, setCategoryFilters)}
                            />
                            <Label htmlFor={`cat-${cat}`}>{tTags[cat as keyof typeof tTags]}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {allTags.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-3">{language === 'ja' ? 'タグ' : 'Tags'}</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="tag-all"
                              checked={tagFilters.length === allTags.length}
                              onCheckedChange={(checked) => setTagFilters(checked ? [...allTags] : [])}
                            />
                            <Label htmlFor="tag-all" className="font-medium">{language === 'ja' ? '全て' : 'All'}</Label>
                          </div>
                          {allTags.map(tag => (
                            <div key={tag} className="flex items-center space-x-2">
                              <Checkbox
                                id={`tag-${tag}`}
                                checked={tagFilters.includes(tag)}
                                onCheckedChange={() => toggleFilter(tag, tagFilters, setTagFilters)}
                              />
                              <Label htmlFor={`tag-${tag}`}>{tag}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="font-semibold mb-3">{language === 'ja' ? '時間' : 'Duration'}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="dur-all"
                            checked={durationFilters.length === 3}
                            onCheckedChange={(checked) => setDurationFilters(checked ? ['short', 'medium', 'long'] : [])}
                          />
                          <Label htmlFor="dur-all" className="font-medium">{language === 'ja' ? '全て' : 'All'}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="dur-short"
                            checked={durationFilters.includes('short')}
                            onCheckedChange={() => toggleFilter('short', durationFilters, setDurationFilters)}
                          />
                          <Label htmlFor="dur-short">{language === 'ja' ? '5分以下' : '≤5 min'}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="dur-medium"
                            checked={durationFilters.includes('medium')}
                            onCheckedChange={() => toggleFilter('medium', durationFilters, setDurationFilters)}
                          />
                          <Label htmlFor="dur-medium">{language === 'ja' ? '5-10分' : '5-10 min'}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="dur-long"
                            checked={durationFilters.includes('long')}
                            onCheckedChange={() => toggleFilter('long', durationFilters, setDurationFilters)}
                          />
                          <Label htmlFor="dur-long">{language === 'ja' ? '10分以上' : '>10 min'}</Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">{language === 'ja' ? 'その他' : 'Other'}</h3>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="unrecorded"
                          checked={showUnrecorded}
                          onCheckedChange={(checked) => setShowUnrecorded(!!checked)}
                        />
                        <Label htmlFor="unrecorded">{language === 'ja' ? '未収録のみ' : 'Unrecorded only'}</Label>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="space-y-3">
              {filteredScripts.map((script) => (
                <Card key={script.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{script.title}</h3>
                          {script.isRecorded && (
                            <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-600 dark:text-green-400 rounded">
                              {language === 'ja' ? '収録済み' : 'Recorded'}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                          <span className="px-2 py-0.5 bg-primary/10 rounded-full text-xs">
                            {tTags[script.category]}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {Math.floor(script.totalDuration / 60)}{language === 'ja' ? '分' : 'min'}
                          </span>
                          <span className="text-xs">
                            {script.segments.length}{language === 'ja' ? 'セグメント' : ' segments'}
                          </span>
                          {script.tags && script.tags.map(tag => (
                            <span key={tag} className="text-xs">#{tag}</span>
                          ))}
                        </div>
                      </div>
                      <Button onClick={() => setSelectedScript(script)}>
                        {t.startRecording}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredScripts.length === 0 && (
              <p className="text-center text-muted-foreground py-10">
                {language === 'ja' ? '該当する台本が見つかりません' : 'No scripts found'}
              </p>
            )}
          </main>
        </div>
      </PageTransition>
    </div>
  );
}
