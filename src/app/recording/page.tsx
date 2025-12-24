"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { RecordingStudio } from "@/components/recording/RecordingStudio";
import { ScriptSelector } from "@/components/recording/ScriptSelector";
import { useLanguage } from "@/lib/hooks/use-language";
import { translations } from "@/lib/i18n/translations";
import type { RecordingScript } from "@/lib/types";
import { Crown } from "lucide-react";

export default function RecordingPage() {
  const { language } = useLanguage();
  const t = translations[language || 'ja'].recording;
  const [selectedScript, setSelectedScript] = useState<RecordingScript | null>(null);

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

            {!selectedScript ? (
              <ScriptSelector onSelect={setSelectedScript} />
            ) : (
              <RecordingStudio 
                script={selectedScript} 
                onBack={() => setSelectedScript(null)} 
              />
            )}
          </main>
        </div>
      </PageTransition>
    </div>
  );
}
