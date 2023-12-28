'use client';

import { useCallback, useState } from 'react';
import styles from './DirectMessage.module.scss';

export default function DirectMessage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // event listener
  const updateEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const updateMessage = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setMessage(e.currentTarget.value);
  };
  const sendMessage = (e: React.FormEvent) => {
    // TODO: make api to send message
    e.preventDefault();
  };

  // validators
  const validateEmail = useCallback((address: string) => {
    if (address === '') return '';
    const regex = new RegExp(
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    );
    return regex.test(address) ? 'valid' : 'invalid';
  }, []);
  const validateMessage = (msg: string) => {
    if (msg !== '') return 'valid';
    if (emailStatus === 'valid') return 'invalid';
    return '';
  };

  // status
  const emailStatus = validateEmail(email);
  const messageStatus = validateMessage(message);
  const btnStatus =
    emailStatus === 'valid' && messageStatus === 'valid' ? 'valid' : 'invalid';
  let btnHoverMsg = null;
  if (btnStatus !== 'valid') {
    btnHoverMsg = `Please check your`;
    if (emailStatus !== 'valid') btnHoverMsg += ' email';
    if (emailStatus !== 'valid' && messageStatus !== 'valid')
      btnHoverMsg += ' and';
    if (messageStatus !== 'valid') btnHoverMsg += ' message';
  }

  const textareaPlaceholder = `Hello there!
Would you like to start a project with me?`;

  // render
  return (
    <div className={styles.wrapper}>
      <h2 className="observe text">Direct message</h2>
      <form className={styles.form} onSubmit={sendMessage}>
        <label htmlFor="email" className="observe text">
          Email address
        </label>
        <input
          type="text"
          id="email"
          placeholder="email@domain.com"
          autoComplete="off"
          spellCheck="false"
          onChange={updateEmail}
          className={`${styles[emailStatus]} observe`}
        />
        <label htmlFor="message" className="observe text">
          Message
        </label>
        <textarea
          id="message"
          placeholder={textareaPlaceholder}
          spellCheck="false"
          onChange={updateMessage}
          className={`${styles[messageStatus]} observe`}
        />
        <button type="submit" className={`${styles[btnStatus]} observe`}>
          <span>Send Message</span>
          <span>{btnHoverMsg}</span>
        </button>
      </form>
    </div>
  );
}
