import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'iwase.220284@gmail.com';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Resendが設定されていない場合はコンソール出力のみ
    if (!resend) {
      console.log('=== メール送信（開発モード）===');
      console.log('管理者宛:', CONTACT_EMAIL);
      console.log('件名:', `[Well-V] ${subject}`);
      console.log('差出人:', `${name} <${email}>`);
      console.log('内容:', message);
      
      return NextResponse.json({ 
        success: true, 
        message: 'お問い合わせを受け付けました（開発モード）'
      });
    }

    // 管理者への通知メール
    await resend.emails.send({
      from: 'Well-V <onboarding@resend.dev>',
      to: CONTACT_EMAIL,
      subject: `[Well-V] ${subject}`,
      text: `
件名: ${subject}
お名前: ${name}
メールアドレス: ${email}

お問い合わせ内容:
${message}
      `.trim(),
    });

    // ユーザーへの自動返信メール
    await resend.emails.send({
      from: 'Well-V <onboarding@resend.dev>',
      to: email,
      subject: 'お問い合わせを受け付けました',
      text: `
${name} 様

お問い合わせいただきありがとうございます。
以下の内容で受け付けました。

件名: ${subject}
お問い合わせ内容:
${message}

内容を確認後、担当者よりご連絡させていただきます。
今しばらくお待ちください。

---
Well-V サポートチーム
      `.trim(),
    });

    return NextResponse.json({ 
      success: true, 
      message: 'お問い合わせを受け付けました'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'エラーが発生しました' },
      { status: 500 }
    );
  }
}
