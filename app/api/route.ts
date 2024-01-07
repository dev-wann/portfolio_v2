import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { LANG_ENUM } from '../_redux/module/preferSlice';

export async function POST(req: Request, res: Response) {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });
  const { client, text, lang } = await req.json();

  //pre-determined strings
  const subjectToMe = 'Direct Message from Portfolio v2';
  const textToMe = `Got a message from ${client}:

${text}

Language: ${lang}`;

  const isKor = lang === LANG_ENUM.KOR;
  try {
    //send email notification to me
    await transporter.sendMail({
      from: client,
      to: myMail,
      subject: subjectToMe,
      text: textToMe,
    });
    //send email to client (auto-reply)
    await transporter.sendMail({
      from: myMail,
      to: client,
      subject: isKor ? subjectToClientKor : subjectToClientEng,
      text: isKor ? textToClientKor : textToClientEng,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({}, { status: 200 });
}

const myMail = process.env.EMAIL;
const smtpOptions = {
  service: 'gmail',
  auth: { user: myMail, pass: process.env.PASSWORD },
};

const subjectToClientEng = 'auto-reply: Thanks for getting in touch';
const subjectToClientKor = 'auto-reply: 문의 사항이 정상적으로 전달되었습니다';

const textToClientEng = `Hello, this is Seungwan Cho.

Thanks for visiting my personal page and sending me a message.
I will check your message and reply to you as soon as possible.
If there is any other question for me, please feel free to send me an email.

Sincerely,

Seungwan Cho
Web developer
swcho8220@gmail.com
`;
const textToClientKor = `안녕하세요, 조승완입니다.

저의 포트폴리오 페이지를 방문해주시고 문의 사항을 남겨 주셔서 감사합니다.
메세지를 확인 후 가능한 빨리 회신을 드리겠습니다.
또 다른 문의사항이 생기신다면 언제든지 편하게 메일 주세요!

감사합니다.

조승완 드림.
Web developer
swcho8220@gmail.com
`;
