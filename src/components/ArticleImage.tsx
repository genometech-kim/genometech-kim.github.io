import { useState } from 'react';

const PHOTO_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

interface ArticleImageProps {
  slug: string;
  index: number;
  photo?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export const ArticleImage = ({
  slug,
  index,
  photo,
  alt,
  className,
  containerClassName,
}: ArticleImageProps) => {
  const [extIndex, setExtIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  const src = photo ?? `/research/${slug}-${index + 1}.${PHOTO_EXTENSIONS[extIndex]}`;

  const handleError = () => {
    if (photo || extIndex >= PHOTO_EXTENSIONS.length - 1) {
      setFailed(true);
      return;
    }
    setExtIndex((prev) => prev + 1);
  };

  const img = (
    <img src={src} alt={alt} className={className} loading="lazy" onError={handleError} />
  );

  return containerClassName ? <div className={containerClassName}>{img}</div> : img;
};
