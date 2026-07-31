import { useState } from 'react';
import { Mail, User } from 'lucide-react';
import type { Member } from '@/data/members';

const PHOTO_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

interface MemberCardProps {
  member: Member;
}

export const MemberCard = ({ member }: MemberCardProps) => {
  const [extIndex, setExtIndex] = useState(0);
  const [photoFailed, setPhotoFailed] = useState(false);

  if (!member.nameKo && !member.nameEn) {
    return null;
  }

  const photoId = member.email?.split('@')[0];
  const photoSrc = member.photo ?? (photoId && `/members/${photoId}.${PHOTO_EXTENSIONS[extIndex]}`);

  const handlePhotoError = () => {
    if (member.photo || extIndex >= PHOTO_EXTENSIONS.length - 1) {
      setPhotoFailed(true);
      return;
    }
    setExtIndex((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col gap-8 border border-gray-200 px-[40px] py-[30px] sm:h-[350px] sm:flex-row">
      <div className="mx-auto flex aspect-[240/350] w-full max-w-[140px] flex-shrink-0 items-center justify-center bg-gray-100 sm:mx-0 sm:aspect-auto sm:h-full sm:w-[240px] sm:max-w-none">
        {photoSrc && !photoFailed ? (
          <img
            src={photoSrc}
            alt={member.nameEn ?? member.nameKo}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={handlePhotoError}
          />
        ) : (
          <User className="text-gray-300" size={64} />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="break-words text-2xl font-bold">{member.nameKo ?? member.nameEn}</span>
          {member.nameKo && member.nameEn && (
            <span className="break-words text-gray-700">{member.nameEn}</span>
          )}
        </div>
        <div className="mt-2 flex h-0.5">
          <div className="w-20 bg-primary" />
          <div className="flex-1 bg-gray-200" />
        </div>
        <p className="mt-2 break-words text-gray-700 font-medium">{member.position}</p>
        {member.email && (
          <div className="mt-2 flex min-w-0 items-center gap-1 text-gray-500">
            <Mail size={14} className="flex-shrink-0" />
            <span className="break-words">{member.email}</span>
          </div>
        )}
      </div>
    </div>
  );
};
