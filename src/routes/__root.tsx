import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Footer } from '@/layout/Footer';
import { Header } from '@/layout/Header';
import { NotFound } from '@/components/NotFound';
import { SponsorBanner } from '@/layout/SponsorBanner';

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <SponsorBanner />
      <Footer />
    </div>
  ),
  notFoundComponent: NotFound,
});
