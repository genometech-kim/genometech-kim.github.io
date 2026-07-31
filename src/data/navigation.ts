/**
 * @label 메뉴 이름
 * @href 해당 메뉴에 연결할 페이지 링크
 * @children optional. 서브 메뉴
 */
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Research', href: '/research' },
  {
    label: 'Members',
    href: '/members',
    children: [
      { label: 'Professor', href: '/members/professor' },
      { label: 'Member', href: '/members/member' },
    ],
  },
  { label: 'Publication', href: '/publication' },
  { label: 'News', href: '/news' },
  { label: 'Gallery', href: '/gallery' },
];
