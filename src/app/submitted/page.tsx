'use client';

import { Header } from '@/components/layout/Header';
import { useSubmissionStore } from '@/lib/hooks/use-submission-store';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, CheckCircle, XCircle, AlertTriangle, FileText } from 'lucide-react';
import React from 'react';
import messages from '@/../messages/ja.json';

const t = messages.SubmittedPage;

const StatusInfo = {
  pending: {
    label: t.status.pending,
    icon: <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />,
    color: 'bg-gray-200 text-gray-800',
  },
  processing: {
    label: t.status.processing,
    icon: <Loader2 className="h-4 w-4 animate-spin text-blue-500" />,
    color: 'bg-blue-100 text-blue-800',
  },
  completed: {
    label: t.status.completed,
    icon: <CheckCircle className="h-4 w-4 text-green-500" />,
    color: 'bg-green-100 text-green-800',
  },
  failed: {
    label: t.status.failed,
    icon: <XCircle className="h-4 w-4 text-red-500" />,
    color: 'bg-red-100 text-red-800',
  },
};

const ApprovalInfo = {
    approved: {
        label: t.approval.approved,
        icon: <CheckCircle className="h-4 w-4 text-green-600" />,
        color: 'border-green-300 bg-green-50 text-green-800'
    },
    rejected: {
        label: t.approval.rejected,
        icon: <AlertTriangle className="h-4 w-4 text-yellow-600" />,
        color: 'border-yellow-300 bg-yellow-50 text-yellow-800'
    }
}

export default function SubmittedPage() {
  const { submissions, isLoaded } = useSubmissionStore();

  const sortedSubmissions = React.useMemo(() => {
    return [...submissions].sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  }, [submissions]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-headline mb-2">{t.title}</h1>
            <p className="text-lg text-muted-foreground">
              {t.description}
            </p>
          </div>

          {!isLoaded && (
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-40 w-full" />)}
            </div>
          )}

          {isLoaded && submissions.length === 0 && (
            <div className="text-center py-20 border-2 border-dashed rounded-xl bg-card">
              <FileText className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h2 className="text-2xl font-bold">{t.no_submissions_title}</h2>
              <p className="text-muted-foreground mt-2">{t.no_submissions_description}</p>
            </div>
          )}

          {isLoaded && submissions.length > 0 && (
            <div className="space-y-4">
              {sortedSubmissions.map((sub) => {
                const statusInfo = StatusInfo[sub.status];
                const approvalInfo = sub.approved ? ApprovalInfo.approved : ApprovalInfo.rejected;
                return (
                  <Card key={sub.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>{sub.title}</CardTitle>
                            <CardDescription className='mt-1'>
                            {formatDistanceToNow(new Date(sub.submittedAt), { addSuffix: true, locale: ja })}
                            </CardDescription>
                        </div>
                        <Badge className={`flex items-center gap-1.5 ${statusInfo.color} hover:${statusInfo.color}`}>
                          {statusInfo.icon}
                          {statusInfo.label}
                        </Badge>
                      </div>
                      
                    </CardHeader>
                    {sub.status === 'completed' && (
                      <CardContent className="space-y-4">
                        <div className={`p-3 border rounded-md flex items-center gap-2 text-sm ${approvalInfo.color}`}>
                            {approvalInfo.icon}
                            <span className="font-semibold">{t.analysis_result}</span>
                            <span>{approvalInfo.label}</span>
                        </div>
                        <div>
                            <h4 className='text-sm font-semibold mb-2'>{t.transcription_label}</h4>
                            <p className="text-sm text-muted-foreground bg-slate-50 p-3 rounded-md border max-h-28 overflow-y-auto">
                                {sub.transcription || t.transcription_failed}
                            </p>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
