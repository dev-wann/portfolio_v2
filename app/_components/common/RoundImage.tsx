import Image from 'next/image';
import styles from './RoundImage.module.scss';

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export default function RoundImage({
  src,
  alt,
  width,
  height,
  className,
}: Props) {
  return (
    <div className={`${styles.outer} ${className}`} style={{ width, height }}>
      <div className={styles.inner}>
        <Image src={src} alt={alt} width={width} height={height} />
      </div>
    </div>
  );
}
