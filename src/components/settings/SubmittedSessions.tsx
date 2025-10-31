'use client';

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

export function SubmittedSessions() {
  const { submissions, isLoaded } = useSubmissionStore();

  const sortedSubmissions = React.useMemo(() => {
    return [...submissions].sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  }, [submissions]);

  return (
    <Card>
        <CardHeader>
            <CardTitle>{t.title}</CardTitle>
            <CardDescription>{t.description}</CardDescription>
        </CardHeader>
        <CardContent>
             {!isLoaded && (
                <div className="space-y-4">
                    {[...Array(2)].map((_, i) => <Skeleton key={i} className="h-28 w-full" />)}
                </div>
            )}

            {isLoaded && submissions.length === 0 && (
                <div className="text-center py-10 border-2 border-dashed rounded-xl bg-card">
                <FileText className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-lg font-bold">{t.no_submissions_title}</h3>
                <p className="text-muted-foreground mt-1 text-sm">{t.no_submissions_description}</p>
                </div>
            )}

            {isLoaded && submissions.length > 0 && (
                <div className="space-y-4">
                {sortedSubmissions.map((sub) => {
                    const statusInfo = StatusInfo[sub.status];
                    const approvalInfo = sub.approved ? ApprovalInfo.approved : ApprovalInfo.rejected;
                    return (
                    <Card key={sub.id} className="bg-background/50">
                        <CardHeader className="pb-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-base">{sub.title}</CardTitle>
                                    <CardDescription className='mt-1 text-xs'>
                                    {formatDistanceToNow(new Date(sub.submittedAt), { addSuffix: true, locale: ja })}
                                    </CardDescription>
                                </div>
                                <Badge className={`flex items-center gap-1.5 ${statusInfo.color} hover:${statusInfo.color} text-xs`}>
                                    {statusInfo.icon}
                                    {statusInfo.label}
                                </Badge>
                            </div>
                        
                        </CardHeader>
                        {sub.status === 'completed' && (
                        <CardContent className="space-y-3 text-xs">
                            <div className={`p-2 border rounded-md flex items-center gap-2 ${approvalInfo.color}`}>
                                {approvalInfo.icon}
                                <span className="font-semibold">{t.analysis_result}</span>
                                <span>{approvalInfo.label}</span>
                            </div>
                            <div>
                                <h4 className='text-xs font-semibold mb-1 text-muted-foreground'>{t.transcription_label}</h4>
                                <p className="text-xs text-muted-foreground bg-slate-50 p-2 rounded-md border max-h-20 overflow-y-auto">
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
        </CardContent>
    </Card>
  );
}