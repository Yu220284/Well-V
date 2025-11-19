
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
import { createSession } from '@/ai/flows/create-session-flow';
import { Loader2 } from 'lucide-react';
import { CreateSessionInputSchema } from '@/lib/types';
import { useSubmissionStore } from '@/lib/hooks/use-submission-store';
import { useRouter } from 'next/navigation';

const t = messages.AddSessionPage;
const tCat = messages.categories;
const categories = CATEGORIES.map((c) => ({
  ...c,
  name: (tCat as any)[c.id],
}));

const FormSchema = CreateSessionInputSchema.extend({
  audio: z
    .any()
    .refine((files) => files?.length == 1, t.form_audio_validation_error)
    .refine(
      (files) => files?.[0]?.type.startsWith('audio/'),
      t.form_audio_validation_error
    ),
  thumbnail: z
    .any()
    .optional(),
}).omit({ audioDataUri: true, thumbnailDataUri: true });


export default function AddSessionPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { addSubmission, updateSubmissionStatus } = useSubmissionStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      category: 'workout',
    }
  });

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    let submissionId : string | null = null;

    try {
        const audioDataUri = await readFileAsDataURL(data.audio[0]);
        const thumbnailDataUri = data.thumbnail?.[0] ? await readFileAsDataURL(data.thumbnail[0]) : undefined;
        
        submissionId = addSubmission({ title: data.title, category: data.category });

        toast({
          title: t.toast_submitted_title,
          description: t.toast_submitted_description,
        });
        
        router.push('/menu');
        form.reset();

        // No need to await here, run in the background
        createSession({
          title: data.title,
          category: data.category,
          audioDataUri: audioDataUri,
          thumbnailDataUri: thumbnailDataUri
        }).then(result => {
          updateSubmissionStatus(submissionId!, 'completed', result);
        }).catch(error => {
          console.error("Flow execution error:", error);
          updateSubmissionStatus(submissionId!, 'failed');
          // Optionally show another toast for failure
        });

    } catch (error) {
        console.error("File reading error or initial submission error:", error);
        if (submissionId) {
            updateSubmissionStatus(submissionId, 'failed');
        }

        toast({
            variant: "destructive",
            title: t.toast_error_title,
            description: t.toast_file_error_description,
        });
    } finally {
        // This runs before the background process finishes, which is fine.
        setIsSubmitting(false);
    }
  }

  return (
    <div className="pb-24">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-headline mb-6">{t.title}</h1>
            <p className="text-lg text-muted-foreground">
              {t.description}
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.form_title_label}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.form_title_placeholder} {...field} />
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
                    <FormLabel>{t.form_category_label}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t.form_category_placeholder} />
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
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>サムネイル画像</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormDescription>
                      セッションのサムネイル画像をアップロードしてください。
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="audio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.form_audio_label}</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormDescription>
                      {t.form_audio_description}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? t.submitting_button : t.submit_button}
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}
