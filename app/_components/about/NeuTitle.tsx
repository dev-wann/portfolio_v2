import styles from './NeuTitle.module.scss';

export default function NeuTitle({ text }: { text: string }) {
  return (
    <div>
      <span className={styles.text}>{text}</span>
      <div className={styles.hairline}></div>
    </div>
  );
}
