import Image from 'next/image';
import { useState } from 'react';
import styles from './ImageWithLoading.module.scss';
import Loading from './Loading';

type Props = {
  src: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
};

export default function ImageWithLoading({
  src,
  width,
  height,
  alt,
  className,
}: Props) {
  const [isLoaded, setLoaded] = useState(false);

  return (
    <>
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        className={`${className} ${
          isLoaded ? styles.imgLoaded : styles.imgLoading
        }`}
        onLoad={() => setLoaded(true)}
      />
      <div className={styles.loadingWrapper}>
        <Loading isLoading={!isLoaded} />
      </div>
    </>
  );
}
