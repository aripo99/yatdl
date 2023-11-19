import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarNav } from '@/components/sidebar-nav'
import { Separator } from '@/components/ui/separator'

const inter = Inter({ subsets: ['latin'] })

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
    title: "Plan",
    href: "/plan",
  },
  {
    title: "Backlog",
    href: "/backlog",
  }
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="space-y-6 p-10 pb-16 md:block">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">YATDL</h2>
            <p className="text-muted-foreground">
              Yet Another To Do List
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                {children}
              </ThemeProvider>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}