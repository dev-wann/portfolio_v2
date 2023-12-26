import styles from './NeuTitle.module.scss';

type Props = {
  text: string;
  className?: string;
};

export default function NeuTitle({ text, className }: Props) {
  return (
    <div className={className}>
      <h1 className={styles.text}>{text + '.'}</h1>
      <div className={styles.hairline}></div>
    </div>
  );
}
