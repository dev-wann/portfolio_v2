import Image from 'next/image';
import styles from './RoundImage.module.scss';

type Props = {
  src: string;
  alt: string;
  size: number;
  className?: string;
};

export default function RoundImage({ src, alt, size, className }: Props) {
  return (
    <div
      className={`${styles.outer} ${className}`}
      style={{ width: size, height: size }}
    >
      <div className={styles.inner}>
        <Image src={src} alt={alt} width={size} height={size} />
      </div>
    </div>
  );
}
