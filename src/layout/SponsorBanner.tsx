import ciSamsung from '@/assets/ci_samsung.png';
import ciNrf from '@/assets/ci_nrf.png';
import ciKbsi from '@/assets/ci_kbsi.png';
import ciBk21 from '@/assets/ci_bk21.png';
import ciSrc from '@/assets/ci_src.png';

const sponsors = [
  { src: ciSamsung, alt: 'Samsung CI' },
  { src: ciNrf, alt: 'NRF CI' },
  { src: ciKbsi, alt: 'KBSI CI' },
  { src: ciBk21, alt: 'BK21 CI' },
  { src: ciSrc, alt: 'SRC CI' },
];

/**
 * @로고추가 : assets 폴더에 이미지를 추가하고, import 및 sponsors 항목에도 추가합니다.
 * @로고수정 : assets 폴더의 이미지 파일을 교체합니다. 파일명은 동일하게 유지합니다.
 * @로고삭제 : 이 파일에서 삭제할 로고에 해당하는 import, sponsors 항목을 삭제하고, assets 폴더에서도 삭제합니다.
 */
export const SponsorBanner = () => {
  return (
    <div className="w-full bg-white py-6">
      <p className="mb-4 text-center text-sm font-medium text-neutral-400">We are supported by</p>

      <div className="relative overflow-hidden">
        {/* 그라데이션 효과 */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />

        {/* 실제 로고 이미지 배치 */}
        <div className="flex w-max animate-marquee">
          {[0, 1].map((copyIndex) => (
            <div
              key={copyIndex}
              className="flex shrink-0 items-center"
              aria-hidden={copyIndex === 1}
            >
              {sponsors.map((sponsor) => (
                <div
                  key={`${copyIndex}-${sponsor.alt}`}
                  className="flex shrink-0 items-center px-12"
                >
                  <img
                    src={sponsor.src}
                    alt={copyIndex === 0 ? sponsor.alt : ''}
                    className="h-10 object-contain"
                    style={{ width: 'auto' }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
