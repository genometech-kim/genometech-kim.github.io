import { createFileRoute } from '@tanstack/react-router';
import { MemberCard } from '@/components/MemberCard';
import { MenuHeader } from '@/components/MenuHeader';
import { PageNav } from '@/components/PageNav';
import { alumni, members } from '@/data/members';
import { navigation } from '@/data/navigation';

export const Route = createFileRoute('/members/member')({
  component: MemberPage,
});

const membersItem = navigation.find((item) => item.label === 'Members');

function MemberPage() {

  return (
    <div>
      <MenuHeader title="Members" breadcrumbs={['HOME', 'Members', 'Member']} />
      <PageNav
        menu={{ label: 'Members', items: navigation }}
        submenu={
          membersItem?.children
            ? { label: 'Member', items: membersItem.children }
            : undefined
        }
      />
      <div className="mx-auto flex max-w-screen-xl flex-col gap-12 px-6 py-16">
        {/* 타이틀 */}
        <h2 className="text-center text-3xl font-bold">Member</h2>

        {/* 멤버 카드 */}
        <div className="grid grid-cols-1 gap-6 cards:grid-cols-2">
          {members.map((member, index) => (
            <MemberCard key={member.email ?? `${member.nameEn ?? member.nameKo}-${index}`} member={member} />
          ))}
        </div>

        {/* Alumni */}
        {alumni.length > 0 && (
          <>
            <h2 className="text-center text-3xl font-bold">Alumni</h2>
            <ul className="flex flex-col gap-2 text-gray-700">
              {alumni.map((entry) => (
                <li key={entry} className="break-words">
                  {entry}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
