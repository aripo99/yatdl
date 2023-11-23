import type { Metadata } from 'next'
import { SidebarNav } from '@/components/sidebar-nav'
import { Separator } from '@/components/ui/separator'
import AppHeader from '@/components/app-header'
import { redirect } from 'next/navigation';
import loadSession from '@/lib/load-session';
import Goals from '@/components/goals';

export const metadata: Metadata = {
  title: 'Yet Another To Do List',
  description: 'An opinionated to do list',
}

const sidebarNavItems = [
  {
    title: "Today",
    href: "/today",
  },
  {
    title: "Backlog",
    href: "/backlog",
  }
]

interface AppLayoutProps {
  children: React.ReactNode
}

async function AppLayout({ children }: AppLayoutProps) {
  const session = await loadSession();

  if (!session) {
    redirect('/auth/sign-in');
  }

  return (
    <>
      <div className="space-y-6 p-10 pb-16 md:block">
        <AppHeader />
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 space-y-5 mx-auto">
            <Goals />
            <div className="lg:max-w-2xl">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AppLayout;