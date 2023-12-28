import nodemailer from 'nodemailer';

const myMail = process.env.EMAIL;
const smtpOptions = {
  service: 'gmail',
  auth: { user: myMail, pass: process.env.PASSWORD },
};

export async function POST(req: Request) {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });
  const { client, text } = await req.json();

  //pre-determined strings
  const subjectToMe = 'Direct Message from Portfolio v2';
  const textToMe = `Got a message from ${client}:

${text}`;
  const subjectToClient = 'auto-reply: Thanks for getting in touch';
  const textToClient = `Hello, this is Seungwan Cho.

Thanks for visiting my personal page and sending me a message.
I will check your message and reply to you as soon as possible.
If there is any other question for me, please feel free to send me an email.

Sincerely,

Seungwan Cho
Web developer
swcho8220@gmail.com
`;

  try {
    //send email to me
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
      subject: subjectToClient,
      text: textToClient,
    });
  } catch (error) {
    return new Error(String(error));
  }

  return new Response();
}

type EmailPayload = {
  from: string;
  to: string;
  subject: string;
  text: string;
};

// Replace with your SMTP credentials

export const sendEmail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  return await transporter.sendMail({
    ...data,
  });
};
