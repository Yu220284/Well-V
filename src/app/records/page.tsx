'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { PageTransition } from '@/components/layout/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/lib/hooks/use-language';
import { Activity, Weight, Heart, Plus, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExerciseRecord {
  id: string;
  date: string;
  type: string;
  duration: number;
  calories: number;
  notes: string;
}

interface HealthRecord {
  id: string;
  date: string;
  weight: number;
  condition: number;
  notes: string;
}

export default function RecordsPage() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [exerciseRecords, setExerciseRecords] = useState<ExerciseRecord[]>([]);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  
  const [exerciseForm, setExerciseForm] = useState({
    type: '',
    duration: '',
    calories: '',
    notes: ''
  });
  
  const [healthForm, setHealthForm] = useState({
    weight: '',
    condition: '3',
    notes: ''
  });

  const addExerciseRecord = () => {
    if (!exerciseForm.type || !exerciseForm.duration) {
      toast({ title: language === 'ja' ? '入力エラー' : 'Input Error', description: language === 'ja' ? '必須項目を入力してください' : 'Please fill required fields' });
      return;
    }
    
    const newRecord: ExerciseRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      type: exerciseForm.type,
      duration: parseInt(exerciseForm.duration),
      calories: parseInt(exerciseForm.calories) || 0,
      notes: exerciseForm.notes
    };
    
    setExerciseRecords([newRecord, ...exerciseRecords]);
    setExerciseForm({ type: '', duration: '', calories: '', notes: '' });
    toast({ title: language === 'ja' ? '記録完了' : 'Recorded', description: language === 'ja' ? 'エクササイズを記録しました' : 'Exercise recorded' });
  };

  const addHealthRecord = () => {
    if (!healthForm.weight) {
      toast({ title: language === 'ja' ? '入力エラー' : 'Input Error', description: language === 'ja' ? '体重を入力してください' : 'Please enter weight' });
      return;
    }
    
    const newRecord: HealthRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      weight: parseFloat(healthForm.weight),
      condition: parseInt(healthForm.condition),
      notes: healthForm.notes
    };
    
    setHealthRecords([newRecord, ...healthRecords]);
    setHealthForm({ weight: '', condition: '3', notes: '' });
    toast({ title: language === 'ja' ? '記録完了' : 'Recorded', description: language === 'ja' ? '体調を記録しました' : 'Health data recorded' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'ja' 
      ? `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
      : date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const conditionLabels = language === 'ja' 
    ? ['とても悪い', '悪い', '普通', '良い', 'とても良い']
    : ['Very Bad', 'Bad', 'Normal', 'Good', 'Very Good'];

  return (
    <div className="pb-24 bg-gradient-to-br from-background to-secondary/20 min-h-screen">
      <Header />
      <PageTransition>
        <div className="pt-12">
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="max-w-2xl mx-auto">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-white/80 dark:bg-white/10 shadow-sm transform -skew-x-12 -ml-4 mr-8 rounded-r-lg"></div>
                <h1 className="relative text-xl font-bold font-headline py-2 pl-2">
                  {language === 'ja' ? '記録' : 'Records'}
                </h1>
              </div>

              <Tabs defaultValue="exercise" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="exercise">
                    <Activity className="h-4 w-4 mr-2" />
                    {language === 'ja' ? 'エクササイズ' : 'Exercise'}
                  </TabsTrigger>
                  <TabsTrigger value="health">
                    <Heart className="h-4 w-4 mr-2" />
                    {language === 'ja' ? '体調管理' : 'Health'}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="exercise" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        {language === 'ja' ? '新規記録' : 'New Record'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>{language === 'ja' ? 'エクササイズ種類' : 'Exercise Type'} *</Label>
                        <Input 
                          value={exerciseForm.type}
                          onChange={(e) => setExerciseForm({...exerciseForm, type: e.target.value})}
                          placeholder={language === 'ja' ? 'ランニング、ヨガなど' : 'Running, Yoga, etc.'}
                        />
                      </div>
                      <div>
                        <Label>{language === 'ja' ? '時間（分）' : 'Duration (min)'} *</Label>
                        <Input 
                          type="number"
                          value={exerciseForm.duration}
                          onChange={(e) => setExerciseForm({...exerciseForm, duration: e.target.value})}
                          placeholder="30"
                        />
                      </div>
                      <div>
                        <Label>{language === 'ja' ? '消費カロリー' : 'Calories'}</Label>
                        <Input 
                          type="number"
                          value={exerciseForm.calories}
                          onChange={(e) => setExerciseForm({...exerciseForm, calories: e.target.value})}
                          placeholder="200"
                        />
                      </div>
                      <div>
                        <Label>{language === 'ja' ? 'メモ' : 'Notes'}</Label>
                        <Textarea 
                          value={exerciseForm.notes}
                          onChange={(e) => setExerciseForm({...exerciseForm, notes: e.target.value})}
                          placeholder={language === 'ja' ? '感想や気づきを記録' : 'Record your thoughts'}
                          rows={3}
                        />
                      </div>
                      <Button onClick={addExerciseRecord} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        {language === 'ja' ? '記録する' : 'Record'}
                      </Button>
                    </CardContent>
                  </Card>

                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      {language === 'ja' ? '記録履歴' : 'History'}
                    </h3>
                    {exerciseRecords.length === 0 ? (
                      <Card>
                        <CardContent className="p-6 text-center text-muted-foreground">
                          {language === 'ja' ? 'まだ記録がありません' : 'No records yet'}
                        </CardContent>
                      </Card>
                    ) : (
                      exerciseRecords.map((record) => (
                        <Card key={record.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-semibold">{record.type}</h4>
                                <p className="text-sm text-muted-foreground">{formatDate(record.date)}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">{record.duration}{language === 'ja' ? '分' : 'min'}</p>
                                {record.calories > 0 && (
                                  <p className="text-sm text-muted-foreground">{record.calories}kcal</p>
                                )}
                              </div>
                            </div>
                            {record.notes && (
                              <p className="text-sm text-muted-foreground mt-2">{record.notes}</p>
                            )}
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="health" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        {language === 'ja' ? '新規記録' : 'New Record'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>{language === 'ja' ? '体重（kg）' : 'Weight (kg)'} *</Label>
                        <Input 
                          type="number"
                          step="0.1"
                          value={healthForm.weight}
                          onChange={(e) => setHealthForm({...healthForm, weight: e.target.value})}
                          placeholder="60.5"
                        />
                      </div>
                      <div>
                        <Label>{language === 'ja' ? 'コンディション' : 'Condition'}</Label>
                        <div className="flex gap-2 mt-2">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <Button
                              key={level}
                              variant={healthForm.condition === level.toString() ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setHealthForm({...healthForm, condition: level.toString()})}
                              className="flex-1"
                            >
                              {level}
                            </Button>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {conditionLabels[parseInt(healthForm.condition) - 1]}
                        </p>
                      </div>
                      <div>
                        <Label>{language === 'ja' ? 'メモ' : 'Notes'}</Label>
                        <Textarea 
                          value={healthForm.notes}
                          onChange={(e) => setHealthForm({...healthForm, notes: e.target.value})}
                          placeholder={language === 'ja' ? '体調や気分を記録' : 'Record your condition'}
                          rows={3}
                        />
                      </div>
                      <Button onClick={addHealthRecord} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        {language === 'ja' ? '記録する' : 'Record'}
                      </Button>
                    </CardContent>
                  </Card>

                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      {language === 'ja' ? '記録履歴' : 'History'}
                    </h3>
                    {healthRecords.length === 0 ? (
                      <Card>
                        <CardContent className="p-6 text-center text-muted-foreground">
                          {language === 'ja' ? 'まだ記録がありません' : 'No records yet'}
                        </CardContent>
                      </Card>
                    ) : (
                      healthRecords.map((record) => (
                        <Card key={record.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-semibold flex items-center gap-2">
                                  <Weight className="h-4 w-4" />
                                  {record.weight}kg
                                </h4>
                                <p className="text-sm text-muted-foreground">{formatDate(record.date)}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">{conditionLabels[record.condition - 1]}</p>
                              </div>
                            </div>
                            {record.notes && (
                              <p className="text-sm text-muted-foreground mt-2">{record.notes}</p>
                            )}
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </PageTransition>
    </div>
  );
}
