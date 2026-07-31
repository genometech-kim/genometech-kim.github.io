import { useState } from 'react';

const PHOTO_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

interface GalleryImageProps {
  id: number;
  index: number;
  alt: string;
  className?: string;
  /** true면 목록용 압축 썸네일(`{id}-{index}-thumb.jpg`)을 먼저 시도하고, 없으면 원본으로 대체 */
  thumb?: boolean;
}

export const GalleryImage = ({ id, index, alt, className, thumb }: GalleryImageProps) => {
  const [thumbFailed, setThumbFailed] = useState(false);
  const [extIndex, setExtIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  const useThumb = thumb && !thumbFailed;
  const src = useThumb
    ? `/gallery/${id}-${index}-thumb.jpg`
    : `/gallery/${id}-${index}.${PHOTO_EXTENSIONS[extIndex]}`;

  const handleError = () => {
    if (useThumb) {
      setThumbFailed(true);
      return;
    }
    if (extIndex >= PHOTO_EXTENSIONS.length - 1) {
      setFailed(true);
      return;
    }
    setExtIndex((prev) => prev + 1);
  };

  return <img src={src} alt={alt} className={className} loading="lazy" onError={handleError} />;
};
