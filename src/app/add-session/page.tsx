
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/Header';
import { CATEGORIES } from '@/lib/data';
import React from 'react';
import messages from '@/../messages/ja.json';

const tCat = messages.categories;
const categories = CATEGORIES.map((c) => ({
  ...c,
  name: (tCat as any)[c.id],
}));

const FormSchema = z.object({
  title: z.string().min(2, {
    message: 'セッション名は2文字以上で入力してください。',
  }),
  category: z.enum(['workout', 'yoga', 'meditation'], {
    required_error: 'カテゴリーを選択してください。',
  }),
  audio: z
    .any()
    .refine((files) => files?.length == 1, '音声ファイルを選択してください。')
    .refine(
      (files) => files?.[0]?.type.startsWith('audio/'),
      '音声ファイルを選択してください。'
    ),
});

export default function AddSessionPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const reader = new FileReader();
    reader.readAsDataURL(data.audio[0]);
    reader.onload = () => {
      const audioDataUri = reader.result as string;
      console.log({
        title: data.title,
        category: data.category,
        audioFileName: data.audio[0].name,
        // In a real app, you'd send this to your backend/AI flow
        // audioDataUri: audioDataUri, 
      });

      toast({
        title: 'セッションが送信されました',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    };
    reader.onerror = (error) => {
        console.error("File reading error:", error);
        toast({
            variant: "destructive",
            title: "エラー",
            description: "ファイルの読み込みに失敗しました。",
        });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-headline mb-2">新しいセッションを追加</h1>
            <p className="text-lg text-muted-foreground">
              セッション名、カテゴリ、音声ファイルを指定して、新しいセッションを提案します。
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>セッション名</FormLabel>
                    <FormControl>
                      <Input placeholder="例：10分間モーニングヨガ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>カテゴリー</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="カテゴリーを選択" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="audio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>音声ファイル</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormDescription>
                      セッションで使用する音声ファイルをアップロードしてください。
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">セッションを送信</Button>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}
