import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { MemberCard } from '@/components/MemberCard';
import { MenuHeader } from '@/components/MenuHeader';
import { PageNav } from '@/components/PageNav';
import { Pagination } from '@/components/Pagination';
import { members } from '@/data/members';
import { navigation } from '@/data/navigation';

export const Route = createFileRoute('/members/member')({
  component: MemberPage,
});

const membersItem = navigation.find((item) => item.label === 'Members');

const PAGE_SIZE = 12;

function MemberPage() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(members.length / PAGE_SIZE);
  const pagedMembers = members.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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
          {pagedMembers.map((member, index) => (
            <MemberCard key={member.email ?? `${member.nameEn ?? member.nameKo}-${index}`} member={member} />
          ))}
        </div>

        {/* 페이지 */}
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
