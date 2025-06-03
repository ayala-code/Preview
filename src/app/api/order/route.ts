import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { platterType, fruits, addons, deliveryDate, deliveryTime, name, phone, address, notes } = await req.json();

    // Configure your SMTP transport (use environment variables in production)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'A26294255@gmail.com',
      subject: `[הזמנה חדשה] ${name}`,
      text: `סוג מגש: ${platterType}\nפירות: ${(fruits || []).join(', ')}\nתוספות: ${(addons || []).join(', ')}\nתאריך הגעה: ${deliveryDate}\nשעה: ${deliveryTime}\n\nשם: ${name}\nטלפון: ${phone}\nכתובת: ${address}\n\nהערות: ${notes || ''}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Order form error:', error);
    return NextResponse.json({ success: false, error: 'שליחת ההזמנה נכשלה.' }, { status: 500 });
  }
}
