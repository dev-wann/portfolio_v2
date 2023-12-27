import NeuTitle from '../_components/common/NeuTitle';
import DirectMessage from '../_components/contact/DirectMessage';
import Links from '../_components/contact/Links';
import styles from './Contact.module.scss';

export default function Contact() {
  return (
    <div className={`${styles.wrapper} container-800`}>
      <NeuTitle text="Get in touch via.." />
      <div className={styles.grid}>
        <Links />
        <Dividor />
        <DirectMessage />
      </div>
    </div>
  );
}

function Dividor() {
  return (
    <div className={styles.divide}>
      <div />
      <span>or</span>
      <div />
    </div>
  );
}
