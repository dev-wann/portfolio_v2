'use client';

import {
  SendStatus,
  ValidStatus,
  makeSendBtnHoverMsg,
  makeSendBtnMsg,
  sendEmail,
  validateEmailAddress,
  validateEmailMessage,
} from '@/app/_utils/emailUtil';
import { useState } from 'react';
import styles from './DirectMessage.module.scss';

export default function DirectMessage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sendStatus, setSendStatus] = useState(SendStatus.IDLE);
  const [error, setError] = useState('');

  // status
  const emailStatus = validateEmailAddress(email);
  const messageStatus = validateEmailMessage(message, emailStatus);
  const btnStatus =
    emailStatus === ValidStatus.VALID && messageStatus === ValidStatus.VALID
      ? ValidStatus.VALID
      : ValidStatus.INVALID;

  // button messages
  let btnMainMsg = makeSendBtnMsg(sendStatus);
  const btnHoverMsg = makeSendBtnHoverMsg(
    emailStatus,
    messageStatus,
    btnStatus,
    error
  );

  // event listener
  const updateEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const updateMessage = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setMessage(e.currentTarget.value);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // send button not activated
    if (btnStatus !== ValidStatus.VALID) return;
    // already sent an email
    if (sendStatus !== SendStatus.IDLE) return;
    setSendStatus(SendStatus.PENDING);
    // check honey trap
    if ((document.querySelector('#tr') as HTMLInputElement)?.value) {
      console.log('You just activated my trap card.');
      return;
    }
    // send email
    sendEmail(email, message)
      .then(() => setSendStatus(SendStatus.SUCCESS))
      .catch((error) => {
        setError(String(error));
        setSendStatus(SendStatus.FAIL);
      });
  };

  const textareaPlaceholder = `Hello there!
Would you like to start a project with me?`;

  // render
  return (
    <div className={styles.wrapper}>
      <h2 className="observe text">Direct message</h2>
      <form className={styles.form} onSubmit={sendMessage}>
        <label className="observe text">Email address</label>
        <input
          type="text"
          placeholder="email@domain.com"
          autoComplete="off"
          spellCheck="false"
          onChange={updateEmail}
          className={`${
            emailStatus ? styles[ValidStatus[emailStatus]] : ''
          } observe`}
        />
        <label className="observe text">Message</label>
        <textarea
          placeholder={textareaPlaceholder}
          spellCheck="false"
          onChange={updateMessage}
          className={`${styles[ValidStatus[messageStatus]]} observe`}
        />
        <button
          type="submit"
          className={`${styles[ValidStatus[btnStatus]]} ${
            styles[SendStatus[sendStatus]]
          } observe`}
        >
          <span>{btnMainMsg}</span>
          <span>{btnHoverMsg}</span>
        </button>
        <Trap />
      </form>
    </div>
  );
}

function Trap() {
  // honeytrap to prevent bot attack
  return (
    <input
      id="tr"
      type="text"
      tabIndex={-1}
      style={{ position: 'absolute', width: 0, height: 0, left: '-999px' }}
    />
  );
}
