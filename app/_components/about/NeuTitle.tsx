import styles from './NeuTitle.module.scss';

export default function NeuTitle({ text }: { text: string }) {
  return (
    <div>
      <h1 className={styles.text}>{text + '.'}</h1>
      <div className={styles.hairline}></div>
    </div>
  );
}
