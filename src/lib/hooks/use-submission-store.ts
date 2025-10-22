"use client";

import { useState, useEffect, useCallback } from 'react';
import type { SubmittedSession } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

const SUBMISSIONS_KEY = 'wellv_submissions';

export function useSubmissionStore() {
  const [submissions, setSubmissions] = useState<SubmittedSession[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const submissionsJson = localStorage.getItem(SUBMISSIONS_KEY);
      if (submissionsJson) {
        setSubmissions(JSON.parse(submissionsJson));
      }
    } catch (error) {
      console.error("Failed to load submissions from localStorage", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveSubmissions = useCallback((subs: SubmittedSession[]) => {
    setSubmissions(subs);
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(subs));
  }, []);

  const addSubmission = useCallback((newSubmission: Omit<SubmittedSession, 'id' | 'status' | 'submittedAt'>): string => {
    const id = uuidv4();
    const submission: SubmittedSession = {
        ...newSubmission,
        id,
        status: 'pending',
        submittedAt: new Date().toISOString(),
    };
    saveSubmissions([...submissions, submission]);
    return id;
  }, [submissions, saveSubmissions]);

  const updateSubmissionStatus = useCallback((id: string, status: SubmittedSession['status'], transcription?: string, approved?: boolean) => {
    const newSubmissions = submissions.map(sub => {
        if (sub.id === id) {
            return { ...sub, status, transcription, approved };
        }
        return sub;
    });
    saveSubmissions(newSubmissions);
  }, [submissions, saveSubmissions]);


  return {
    isLoaded,
    submissions,
    addSubmission,
    updateSubmissionStatus,
  };
}
