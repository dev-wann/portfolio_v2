'use client';

import useLangString from '@/app/_hooks/useLangString';
import { RootState } from '@/app/_redux';
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
import { useSelector } from 'react-redux';
import styles from './DirectMessage.module.scss';

export default function DirectMessage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sendStatus, setSendStatus] = useState(SendStatus.IDLE);
  const [error, setError] = useState('');

  const strs = useLangString('contact', 'dm');
  const lang = useSelector((state: RootState) => state.prefer.lang);

  // status
  const emailStatus = validateEmailAddress(email);
  const messageStatus = validateEmailMessage(message, emailStatus);
  const btnStatus =
    emailStatus === ValidStatus.VALID && messageStatus === ValidStatus.VALID
      ? ValidStatus.VALID
      : ValidStatus.INVALID;

  // button messages
  let btnMainMsg = makeSendBtnMsg(sendStatus, lang);
  const btnHoverMsg = makeSendBtnHoverMsg(
    emailStatus,
    messageStatus,
    btnStatus,
    error,
    lang
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
    sendEmail(email, message, lang)
      .then(() => setSendStatus(SendStatus.SUCCESS))
      .catch((error) => {
        setError(String(error));
        setSendStatus(SendStatus.FAIL);
      });
  };

  // render
  return (
    <div className={styles.wrapper}>
      <h2 className="observe text">{strs ? strs['dm'] : 'Direct message'}</h2>
      <form className={styles.form} onSubmit={sendMessage}>
        <label className="observe text">
          {strs ? strs.email : 'Email address'}
        </label>
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
        <label className="observe text">{strs ? strs.msg : 'Message'}</label>
        <textarea
          placeholder={strs ? strs['placeholder'] : ''}
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
