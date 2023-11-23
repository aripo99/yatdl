import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { use } from 'react';
import Providers from "@/components/providers";
import AuthChangeListener from '@/components/auth-change-listener';
import UserSessionProvider from "@/components/user-session-provider";
import loadSession from "@/lib/load-session";
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] })

// this is needed to force dynamic runtime
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Yet Another To Do List',
    description: 'An opinionated gamified to do list',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = use(loadSession());

    return (
        <html lang="en" className="dark">
            <body className={inter.className}>
                <ThemeProvider>
                    <AuthChangeListener session={session}>
                        <UserSessionProvider session={session}>
                            <Providers>{children}</Providers>
                        </UserSessionProvider>
                    </AuthChangeListener>
                </ThemeProvider>
            </body>
        </html>
    )
}
