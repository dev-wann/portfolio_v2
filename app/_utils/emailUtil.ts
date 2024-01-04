import { delay } from '.';
import { LANG_ENUM, LangValueType } from '../_redux/module/preferSlice';

// enums
export enum SendStatus {
  IDLE,
  PENDING,
  SUCCESS,
  FAIL,
}

export enum ValidStatus {
  IDLE,
  VALID,
  INVALID,
}

// send mail by nodemailer
export async function sendEmail(
  client: string,
  text: string,
  lang: LangValueType | null
) {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error('Error: API URL not found');
  }

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
    method: 'POST',
    mode: 'same-origin',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client, text, lang }),
  });
  await delay(500);
  if (!res.ok) throw new Error(res.statusText);
  return res;
}

// validators
export function validateEmailAddress(address: string) {
  if (address === '') return ValidStatus.IDLE;
  const regex = new RegExp(
    /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
  );
  return regex.test(address) ? ValidStatus.VALID : ValidStatus.INVALID;
}

export function validateEmailMessage(msg: string, emailStatus: ValidStatus) {
  if (msg !== '') return ValidStatus.VALID;
  if (emailStatus === ValidStatus.VALID) return ValidStatus.INVALID;
  return ValidStatus.IDLE;
}

// send button message generators
export function makeSendBtnMsg(status: SendStatus, lang: LangValueType | null) {
  let msg = '';
  const isKor = lang === LANG_ENUM.KOR;

  switch (status) {
    case SendStatus.PENDING: {
      msg = isKor ? '메세지 전송 중...' : 'Delivering your message...';
      break;
    }
    case SendStatus.SUCCESS: {
      msg = isKor ? '전송 성공' : 'Successfully Delieverd';
      break;
    }
    case SendStatus.FAIL: {
      msg = isKor ? '오류 발생' : "Something's gone wrong..!";
      break;
    }
    default: {
      msg = isKor ? '메세지 보내기' : 'Send Message';
    }
  }
  return msg;
}

export function makeSendBtnHoverMsg(
  emailStatus: ValidStatus,
  messageStatus: ValidStatus,
  btnStatus: ValidStatus,
  error: string,
  lang: LangValueType | null
) {
  if (error !== '') return error;

  const isKor = lang === LANG_ENUM.KOR;

  let msg = '';
  if (btnStatus !== ValidStatus.VALID) {
    if (emailStatus !== ValidStatus.VALID) {
      msg += isKor ? '이메일' : ' email';
      if (isKor && messageStatus === ValidStatus.VALID) msg += '을';
    }
    if (
      emailStatus !== ValidStatus.VALID &&
      messageStatus !== ValidStatus.VALID
    ) {
      msg += isKor ? '과 ' : ' and';
    }
    if (messageStatus !== ValidStatus.VALID) {
      msg += isKor ? '메세지를' : ' message';
    }
    msg = isKor ? msg + ' 확인해주세요' : `Please check your` + msg;
  }
  return msg;
}
