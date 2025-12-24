import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { category, duration, level, include = '', exclude = '', language = 'ja' } = body

    const categoryMap: Record<string, string> = {
      yoga: 'ヨガ',
      workout: '筋トレ',
      stretch: 'ストレッチ',
      meditation: '瞑想'
    }

    const levelMap: Record<string, string> = {
      beginner: '初心者',
      intermediate: '中級者',
      advanced: '上級者'
    }

    const steps = generateScriptSteps(category, parseInt(duration), level, include, exclude, language, categoryMap, levelMap)

    const title = language === 'en' 
      ? `Your Custom ${category.charAt(0).toUpperCase() + category.slice(1)} Session`
      : `あなた専用の${categoryMap[category]}セッション`
    
    return NextResponse.json({
      title,
      duration: language === 'en' ? `${duration} min` : `${duration}分`,
      level: language === 'en' ? level.charAt(0).toUpperCase() + level.slice(1) : levelMap[level],
      steps
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ 
      error: 'Failed to generate script',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

function generateScriptSteps(
  category: string,
  duration: number,
  level: string,
  include: string,
  exclude: string,
  language: string,
  categoryMap: Record<string, string>,
  levelMap: Record<string, string>
) {
  if (language === 'en') {
    return generateEnglishScript(category, duration, level, include, exclude)
  }
  return generateJapaneseScript(category, duration, level, include, exclude, categoryMap, levelMap)
}

function generateJapaneseScript(
  category: string,
  duration: number,
  level: string,
  include: string,
  exclude: string,
  categoryMap: Record<string, string>,
  levelMap: Record<string, string>
) {
  const steps = []
  const categoryName = categoryMap[category]
  
  steps.push({
    time: '0:00',
    text: `こんにちは。今日は一緒に${categoryName}を行いましょう。${levelMap[level]}向けの${duration}分間のセッションです。`
  })
  
  steps.push({
    time: '0:30',
    text: 'まずは楽な姿勢で立ちます。足は肩幅に開いて、両手を体の横に自然に下ろしてください。鼻から大きく息を吸って、口からゆっくり吐き出します。'
  })
  
  steps.push({
    time: '1:30',
    text: '首をゆっくりと左右に傾けます。右耳を右肩に近づけて、5秒キープ。反対側も同じように行います。肩の力を抜いて、リラックスしましょう。'
  })
  
  const mainSteps = getMainExercises(category, duration, include, exclude)
  mainSteps.forEach(step => steps.push(step))
  
  const cooldownTime = duration - 2
  const cooldownMin = Math.floor(cooldownTime / 60)
  const cooldownSec = cooldownTime % 60
  
  steps.push({
    time: `${cooldownMin}:${cooldownSec.toString().padStart(2, '0')}`,
    text: 'ゆっくりと呼吸を整えていきます。両手を胸の前で合わせて、深呼吸を3回繰り返しましょう。吸って、吐いて。'
  })
  
  const endMin = Math.floor(duration / 60)
  const endSec = duration % 60
  steps.push({
    time: `${endMin}:${endSec.toString().padStart(2, '0')}`,
    text: 'お疲れさまでした。素晴らしいセッションでしたね。また一緒に頑張りましょう。'
  })
  
  return steps
}

function generateEnglishScript(
  category: string,
  duration: number,
  level: string,
  include: string,
  exclude: string
) {
  const steps = []
  
  steps.push({
    time: '0:00',
    text: `Hello! Let's do a ${duration}-minute ${category} session together for ${level} level.`
  })
  
  steps.push({
    time: '0:30',
    text: 'Start by standing in a comfortable position. Place your feet shoulder-width apart, arms relaxed by your sides. Take a deep breath in through your nose, and slowly exhale through your mouth.'
  })
  
  steps.push({
    time: '1:30',
    text: 'Gently tilt your head to the left and right. Bring your right ear toward your right shoulder, hold for 5 seconds. Repeat on the other side. Keep your shoulders relaxed.'
  })
  
  const mainSteps = getMainExercisesEnglish(category, duration, include, exclude)
  mainSteps.forEach(step => steps.push(step))
  
  const cooldownTime = duration - 2
  const cooldownMin = Math.floor(cooldownTime / 60)
  const cooldownSec = cooldownTime % 60
  
  steps.push({
    time: `${cooldownMin}:${cooldownSec.toString().padStart(2, '0')}`,
    text: 'Let\'s cool down now. Bring your hands together in front of your chest. Take three deep breaths. Inhale, and exhale.'
  })
  
  const endMin = Math.floor(duration / 60)
  const endSec = duration % 60
  steps.push({
    time: `${endMin}:${endSec.toString().padStart(2, '0')}`,
    text: 'Great work today! You did an excellent session. See you next time!'
  })
  
  return steps
}

function getMainExercises(category: string, duration: number, include: string, exclude: string) {
  const steps = []
  const mainStartMin = 3
  const mainEndMin = duration - 3
  const mainDuration = mainEndMin - mainStartMin
  const numSteps = Math.min(8, Math.max(4, Math.floor(mainDuration / 1.5)))
  const interval = mainDuration / numSteps
  
  const excludeLower = exclude.toLowerCase()
  const avoidLegs = excludeLower.includes('大腿') || excludeLower.includes('太もも') || excludeLower.includes('脚') || excludeLower.includes('下半身') || excludeLower.includes('スクワット') || excludeLower.includes('ランジ')
  const avoidArms = excludeLower.includes('腕') || excludeLower.includes('上腕') || excludeLower.includes('腕立て')
  const avoidCore = excludeLower.includes('腹筋') || excludeLower.includes('体幹') || excludeLower.includes('プランク')
  
  const workoutExercises = [
    { text: '腕立て伏せの姿勢を取ります。両手を肩幅より少し広めに床につき、体を一直線に保ちます。膝をついても構いません。ゆっくり体を下ろして、押し上げます。10回繰り返しましょう。', tags: ['arms', 'core'] },
    { text: 'スクワットを行います。足を肩幅に開き、お尻を後ろに引きながら膝を曲げます。太ももが床と平行になるまで下ろして、立ち上がります。15回繰り返します。', tags: ['legs'] },
    { text: 'プランクの姿勢を取ります。肘を床につき、体を一直線に保ちます。お腹に力を入れて、30秒キープしましょう。呼吸を止めないでください。', tags: ['core'] },
    { text: 'ランジを行います。右足を大きく前に踏み出し、両膝を90度に曲げます。元の位置に戻り、左足も同様に。左右10回ずつ行いましょう。', tags: ['legs'] },
    { text: 'マウンテンクライマーです。腕立て伏せの姿勢から、右膝を胸に引き寄せ、素早く左右交互に動かします。30秒間続けます。', tags: ['core', 'legs'] },
    { text: 'バーピーを行います。立った状態から、しゃがんで両手を床につき、足を後ろに伸ばします。腕立て伏せを1回して、足を戻し、ジャンプします。8回繰り返しましょう。', tags: ['legs', 'arms', 'core'] },
    { text: '腹筋運動です。仰向けに寝て、膝を曲げます。両手を頭の後ろに置き、上体を起こします。20回繰り返します。', tags: ['core'] },
    { text: 'サイドプランクです。右肘を床につき、体を横向きにして一直線に保ちます。20秒キープして、反対側も同様に行います。', tags: ['core'] },
    { text: 'ショルダープレスです。立った姿勢で、両手を肩の高さに構えます。両手を天井に向かって押し上げ、ゆっくり下ろします。12回繰り返しましょう。', tags: ['arms'] },
    { text: 'バイシクルクランチです。仰向けに寝て、両手を頭の後ろに。右肘と左膝を近づけ、左右交互に動かします。20回繰り返します。', tags: ['core'] }
  ]
  
  let filteredWorkout = workoutExercises
  if (avoidLegs) {
    filteredWorkout = filteredWorkout.filter(ex => !ex.tags.includes('legs'))
  }
  if (avoidArms) {
    filteredWorkout = filteredWorkout.filter(ex => !ex.tags.includes('arms'))
  }
  if (avoidCore) {
    filteredWorkout = filteredWorkout.filter(ex => !ex.tags.includes('core'))
  }
  
  const exercises: Record<string, string[]> = {
    workout: filteredWorkout.map(ex => ex.text),
    yoga: [
      '山のポーズです。足を揃えて立ち、両手を体の横に下ろします。背筋を伸ばし、頭頂部を天井に向けて引き上げます。深く呼吸しましょう。',
      '前屈のポーズに移ります。息を吐きながら、腰から体を前に倒します。膝は軽く曲げても構いません。手を床につけるか、すねを掴みます。',
      '下向きの犬のポーズです。四つん這いから、お尻を高く持ち上げます。手のひらと足裏で床を押し、背中を伸ばします。5回深呼吸しましょう。',
      '戦士のポーズ1です。右足を大きく前に出し、左足は後ろに伸ばします。右膝を90度に曲げ、両手を天井に向けて伸ばします。力強く立ちましょう。',
      '三角のポーズに移ります。足を大きく開き、右足先を外に向けます。右手を右足に下ろし、左手を天井に伸ばします。胸を開いて呼吸します。',
      '木のポーズです。右足で立ち、左足の裏を右太ももの内側につけます。バランスを取りながら、両手を胸の前で合わせます。',
      '子供のポーズで休憩します。正座から上体を前に倒し、額を床につけます。両手は前に伸ばすか、体の横に置きます。深く呼吸してリラックスしましょう。',
      '猫と牛のポーズです。四つん這いになり、息を吸いながら背中を反らせ、吐きながら背中を丸めます。ゆっくり5回繰り返します。'
    ],
    stretch: [
      '首のストレッチです。右手で頭の左側を優しく押さえ、右側に傾けます。15秒キープして、反対側も同様に行います。',
      '肩のストレッチです。右腕を胸の前で左側に伸ばし、左手で右肘を引き寄せます。20秒キープして、反対側も行います。',
      '背中のストレッチです。両手を前で組み、背中を丸めながら腕を前に伸ばします。肩甲骨の間を広げるイメージで、20秒キープします。',
      '腰のストレッチです。仰向けに寝て、右膝を胸に引き寄せます。両手で膝を抱えて、20秒キープ。左側も同様に行います。',
      '太もも前側のストレッチです。立った状態で、右足首を右手で掴み、かかとをお尻に近づけます。バランスを取りながら20秒キープします。',
      '太もも裏側のストレッチです。床に座り、両足を前に伸ばします。上体を前に倒し、つま先に向かって手を伸ばします。30秒キープしましょう。',
      'ふくらはぎのストレッチです。壁に両手をつき、右足を後ろに引きます。かかとを床につけたまま、左膝を曲げます。20秒キープして、反対側も行います。',
      '全身のストレッチです。仰向けに寝て、両手を頭の上に伸ばし、つま先も伸ばします。体全体を気持ちよく伸ばして、深呼吸しましょう。'
    ],
    meditation: [
      '楽な姿勢で座ります。背筋を伸ばし、両手を膝の上に置きます。目を閉じて、自然な呼吸に意識を向けましょう。',
      '呼吸に集中します。鼻から息が入ってくる感覚、口から出ていく感覚を観察します。何も考えず、ただ呼吸を感じてください。',
      '体の感覚をスキャンします。頭のてっぺんから始めて、顔、首、肩へと意識を下ろしていきます。緊張している部分があれば、息を吐きながら緩めます。',
      '胸、お腹、腰へと意識を移します。呼吸とともに、お腹が膨らんだり縮んだりする動きを感じましょう。',
      '太もも、膝、ふくらはぎ、足先まで意識を下ろします。体全体がリラックスしているのを感じてください。',
      '心に浮かぶ思考を観察します。考えが浮かんできても、それを追いかけず、雲が流れるように見送ります。',
      '感謝の気持ちを感じます。今日の自分、周りの人々、この瞬間に感謝しましょう。',
      'ゆっくりと意識を戻します。指先、つま先を動かし、目を開ける準備をします。深呼吸を一度して、目を開けましょう。'
    ]
  }
  
  let exerciseList = exercises[category] || exercises.workout
  if (exerciseList.length < numSteps) {
    exerciseList = [...exerciseList, ...exerciseList]
  }
  const selectedExercises = exerciseList.slice(0, numSteps)
  
  selectedExercises.forEach((exercise, i) => {
    const totalMin = mainStartMin + (i * interval)
    const min = Math.floor(totalMin)
    const sec = Math.round((totalMin - min) * 60)
    steps.push({
      time: `${min}:${sec.toString().padStart(2, '0')}`,
      text: exercise
    })
  })
  
  return steps
}

function getMainExercisesEnglish(category: string, duration: number, include: string, exclude: string) {
  const steps = []
  const mainStartMin = 3
  const mainEndMin = duration - 3
  const mainDuration = mainEndMin - mainStartMin
  const numSteps = Math.min(8, Math.max(4, Math.floor(mainDuration / 1.5)))
  const interval = mainDuration / numSteps
  
  const excludeLower = exclude.toLowerCase()
  const avoidLegs = excludeLower.includes('leg') || excludeLower.includes('thigh') || excludeLower.includes('lower body') || excludeLower.includes('squat') || excludeLower.includes('lunge')
  const avoidArms = excludeLower.includes('arm') || excludeLower.includes('upper body') || excludeLower.includes('push')
  const avoidCore = excludeLower.includes('core') || excludeLower.includes('ab') || excludeLower.includes('plank')
  
  const workoutExercisesEn = [
    { text: 'Get into push-up position. Place your hands slightly wider than shoulder-width on the floor, keep your body in a straight line. You can keep your knees down if needed. Slowly lower your body and push back up. Repeat 10 times.', tags: ['arms', 'core'] },
    { text: 'Let\'s do squats. Stand with feet shoulder-width apart, push your hips back as you bend your knees. Lower until your thighs are parallel to the floor, then stand back up. Repeat 15 times.', tags: ['legs'] },
    { text: 'Hold a plank position. Rest on your elbows, keep your body in a straight line. Engage your core and hold for 30 seconds. Keep breathing steadily.', tags: ['core'] },
    { text: 'Time for lunges. Step your right foot forward, bend both knees to 90 degrees. Return to starting position and repeat with left leg. Do 10 reps on each side.', tags: ['legs'] },
    { text: 'Mountain climbers now. From push-up position, bring your right knee to your chest, then quickly alternate legs. Continue for 30 seconds.', tags: ['core', 'legs'] },
    { text: 'Let\'s do burpees. From standing, squat down and place hands on floor, jump feet back. Do one push-up, jump feet forward, then jump up. Repeat 8 times.', tags: ['legs', 'arms', 'core'] },
    { text: 'Abdominal crunches. Lie on your back with knees bent. Place hands behind your head and lift your upper body. Repeat 20 times.', tags: ['core'] },
    { text: 'Side plank time. Rest on your right elbow, body sideways in a straight line. Hold for 20 seconds, then switch to the other side.', tags: ['core'] },
    { text: 'Shoulder press. Stand with hands at shoulder height. Press both hands up toward the ceiling, then lower back down. Repeat 12 times.', tags: ['arms'] },
    { text: 'Bicycle crunches. Lie on your back, hands behind head. Bring right elbow to left knee, alternating sides. Repeat 20 times.', tags: ['core'] }
  ]
  
  let filteredWorkoutEn = workoutExercisesEn
  if (avoidLegs) {
    filteredWorkoutEn = filteredWorkoutEn.filter(ex => !ex.tags.includes('legs'))
  }
  if (avoidArms) {
    filteredWorkoutEn = filteredWorkoutEn.filter(ex => !ex.tags.includes('arms'))
  }
  if (avoidCore) {
    filteredWorkoutEn = filteredWorkoutEn.filter(ex => !ex.tags.includes('core'))
  }
  
  const exercises: Record<string, string[]> = {
    workout: filteredWorkoutEn.map(ex => ex.text),
    yoga: [
      'Mountain pose. Stand with feet together, arms by your sides. Lengthen your spine, reach the crown of your head toward the ceiling. Breathe deeply.',
      'Forward fold. Exhale as you hinge from your hips and fold forward. You can bend your knees slightly. Touch the floor or hold your shins.',
      'Downward facing dog. From all fours, lift your hips high. Press through your palms and feet, lengthen your spine. Take 5 deep breaths.',
      'Warrior 1 pose. Step your right foot forward, left leg extended back. Bend right knee to 90 degrees, raise both arms overhead. Stand strong.',
      'Triangle pose. Step feet wide apart, turn right toes out. Lower right hand to right leg, extend left arm to the ceiling. Open your chest and breathe.',
      'Tree pose. Stand on your right foot, place left sole on inner right thigh. Find your balance, bring hands together at your chest.',
      'Child\'s pose for rest. From kneeling, fold forward and rest your forehead on the floor. Extend arms forward or rest them by your sides. Breathe deeply and relax.',
      'Cat-cow pose. On all fours, inhale as you arch your back, exhale as you round it. Move slowly, repeat 5 times.'
    ],
    stretch: [
      'Neck stretch. Place right hand on left side of head, gently tilt to the right. Hold for 15 seconds, then switch sides.',
      'Shoulder stretch. Extend right arm across your chest to the left, use left hand to pull right elbow closer. Hold 20 seconds, then switch.',
      'Back stretch. Clasp hands in front, round your back as you reach arms forward. Feel the stretch between shoulder blades, hold 20 seconds.',
      'Lower back stretch. Lie on your back, bring right knee to chest. Hold knee with both hands for 20 seconds. Repeat with left leg.',
      'Quadriceps stretch. Standing, grab right ankle with right hand, bring heel toward buttocks. Balance and hold for 20 seconds.',
      'Hamstring stretch. Sit with legs extended forward. Fold forward from hips, reach toward your toes. Hold for 30 seconds.',
      'Calf stretch. Place both hands on wall, step right foot back. Keep heel on floor as you bend left knee. Hold 20 seconds, then switch.',
      'Full body stretch. Lie on your back, extend arms overhead and point toes. Stretch your entire body, breathe deeply.'
    ],
    meditation: [
      'Sit in a comfortable position. Lengthen your spine, rest hands on your knees. Close your eyes and bring awareness to your natural breath.',
      'Focus on your breathing. Notice the sensation of air entering through your nose, leaving through your mouth. Just observe, without thinking.',
      'Body scan from the top. Start at the crown of your head, move awareness down through face, neck, and shoulders. Release any tension with each exhale.',
      'Move awareness to chest, belly, and lower back. Feel your abdomen expanding and contracting with each breath.',
      'Scan down through thighs, knees, calves, and feet. Feel your entire body relaxed and at ease.',
      'Observe your thoughts. When thoughts arise, don\'t follow them. Let them pass like clouds in the sky.',
      'Cultivate gratitude. Feel thankful for yourself today, for the people around you, for this present moment.',
      'Slowly return awareness. Wiggle fingers and toes, prepare to open your eyes. Take one deep breath and gently open your eyes.'
    ]
  }
  
  let exerciseList = exercises[category] || exercises.workout
  if (exerciseList.length < numSteps) {
    exerciseList = [...exerciseList, ...exerciseList]
  }
  const selectedExercises = exerciseList.slice(0, numSteps)
  
  selectedExercises.forEach((exercise, i) => {
    const totalMin = mainStartMin + (i * interval)
    const min = Math.floor(totalMin)
    const sec = Math.round((totalMin - min) * 60)
    steps.push({
      time: `${min}:${sec.toString().padStart(2, '0')}`,
      text: exercise
    })
  })
  
  return steps
}
