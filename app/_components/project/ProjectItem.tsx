import NeuTitle from '../common/NeuTitle';
import styles from './ProjectItem.module.scss';

type Props = {
  data: {
    idx: number;
  };
};

export default function ProjectItem({ data }: Props) {
  return (
    <section className={styles.section}>
      <NeuTitle text={String(data.idx)} />
    </section>
  );
}
