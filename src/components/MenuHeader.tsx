import menuHeaderBg from '@/assets/menu_header_bg.jpg';

interface MenuHeaderProps {
  title: string;
  breadcrumbs: string[];
}

export const MenuHeader = ({ title, breadcrumbs }: MenuHeaderProps) => {
  return (
    <div
      className="flex h-[240px] xs:h-[400px] w-full items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${menuHeaderBg})` }}
    >
      <div className="flex flex-col items-center gap-4 text-white">
        <h2 className="text-4xl font-bold">{title}</h2>
        <p className="text-sm">
          {breadcrumbs.map((crumb, index) => (
            <span key={index}>
              {index > 0 && <span className="mx-2">·</span>}
              {crumb}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};
