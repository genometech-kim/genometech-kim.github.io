import { createFileRoute } from '@tanstack/react-router';
import { MenuHeader } from '@/components/MenuHeader';
import { PageNav } from '@/components/PageNav';
import { ProfileSection } from '@/components/ProfileSection';
import { YearContentList } from '@/components/YearContentList';
import { career } from '@/data/career';
import { navigation } from '@/data/navigation';

export const Route = createFileRoute('/members/professor')({
  component: ProfessorPage,
});

const membersItem = navigation.find((item) => item.label === 'Members');

function ProfessorPage() {
  return (
    <div>
      <MenuHeader title="Members" breadcrumbs={['HOME', 'Members', 'Professor']} />
      <PageNav
        menu={{ label: 'Members', items: navigation }}
        submenu={
          membersItem?.children ? { label: 'Professor', items: membersItem.children } : undefined
        }
      />
      <div className="mx-auto max-w-screen-xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold">Professor</h2>
        <div className="mt-12 flex flex-col gap-10 md:flex-row">
          {/* 왼쪽: 사진 */}
          <div className="mx-auto flex-shrink-0 md:mx-0">
            <img
              src="/members/professor.jpg"
              alt="Professor"
              className="w-full xs:w-64 object-cover"
            />
          </div>
          {/* 오른쪽: 텍스트 */}
          <div className="flex-1">
            {/* 이름 */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">김헌석</span>
              <span className="text-base text-gray-400">Heon Seok Kim, Ph.D.</span>
            </div>
            {/* 구분선 */}
            <div className="mt-3 flex h-0.5">
              <div className="w-20 bg-primary" />
              <div className="flex-1 bg-gray-200" />
            </div>

            {/* 소속 및 주소 */}
            <div className="mt-6 text-lg text-primary">
              <p>Department of Life science</p>
              <p className="mt-4">Building of natural sciences, Room 521 (Lab) 720 (Office)</p>
              <p>222 Wangsimni-ro, Seongdong-gu, Seoul, South Korea</p>
            </div>

            <ProfileSection title="Career" className="mt-16">
              <YearContentList items={career} />
            </ProfileSection>

            <ProfileSection title="Title" className="mt-12">
              <p>
                My expertise lies in genome engineering, single-cell CRISPR screens, and
                pioneering multi-omics sequencing methods. My researches, such as employing
                nanopore sequencing for CRISPR engineering and developing innovative approaches to
                cancer mutation analysis, reflects my unwavering commitment to advancing molecular
                biology and pushing the boundaries of genome technologies.
              </p>
            </ProfileSection>
          </div>
        </div>
      </div>
    </div>
  );
}
