"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import type { SubmittedSession } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

const SUBMISSIONS_KEY = 'wellv_submissions';

export function useSubmissionStore() {
  const [submissions, setSubmissions] = useState<SubmittedSession[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Ref to hold the latest submissions to avoid stale state in callbacks
  const submissionsRef = useRef(submissions);
  useEffect(() => {
    submissionsRef.current = submissions;
  }, [submissions]);

  useEffect(() => {
    try {
      const submissionsJson = localStorage.getItem(SUBMISSIONS_KEY);
      if (submissionsJson) {
        const storedSubmissions = JSON.parse(submissionsJson);
        setSubmissions(storedSubmissions);
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
    // Use ref to get the latest state
    saveSubmissions([...submissionsRef.current, submission]);
    return id;
  }, [saveSubmissions]);

  const updateSubmissionStatus = useCallback((id: string, status: SubmittedSession['status'], transcription?: string, approved?: boolean) => {
    // Use ref to get the latest state
    const newSubmissions = submissionsRef.current.map(sub => {
        if (sub.id === id) {
            return { ...sub, status, transcription, approved };
        }
        return sub;
    });
    saveSubmissions(newSubmissions);
  }, [saveSubmissions]);


  return {
    isLoaded,
    submissions,
    addSubmission,
    updateSubmissionStatus,
  };
}
