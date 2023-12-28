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
export async function sendEmail(client: string, text: string) {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error('Error: API URL not found');
  }

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
    method: 'POST',
    mode: 'same-origin',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client, text }),
  });
  await delay(1000);
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
export function makeSendBtnMsg(status: SendStatus) {
  let msg = '';
  switch (status) {
    case SendStatus.PENDING: {
      msg = 'Delivering your message...';
      break;
    }
    case SendStatus.SUCCESS: {
      msg = 'Successfully Delieverd';
      break;
    }
    case SendStatus.FAIL: {
      msg = "Something's gone wrong..!";
      break;
    }
    default: {
      msg = 'Send Message';
    }
  }
  return msg;
}

export function makeSendBtnHoverMsg(
  emailStatus: ValidStatus,
  messageStatus: ValidStatus,
  btnStatus: ValidStatus,
  error: string
) {
  if (error !== '') return error;

  let msg = '';
  if (btnStatus !== ValidStatus.VALID) {
    msg = `Please check your`;
    if (emailStatus !== ValidStatus.VALID) msg += ' email';
    if (
      emailStatus !== ValidStatus.VALID &&
      messageStatus !== ValidStatus.VALID
    ) {
      msg += ' and';
    }
    if (messageStatus !== ValidStatus.VALID) msg += ' message';
  }
  return msg;
}

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
