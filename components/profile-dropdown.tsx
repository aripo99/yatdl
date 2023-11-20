'use client';

import { useMemo } from 'react';
import { Session } from '@supabase/supabase-js';
import { LogOut, UserIcon } from 'lucide-react';

import { Avatar, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

import useUserSession from '../lib/hooks/use-user-session';
import useSignOut from '../lib/hooks/use-sign-out';

function ProfileDropdown() {
    const session = useUserSession();
    const signOut = useSignOut();
    const displayName = useDisplayName(session);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarFallback>
                        {displayName}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ProfileDropdown;

function useDisplayName(session: Session | undefined) {
    return useMemo(() => {
        if (!session?.user) {
            return null;
        }

        const { email, user_metadata } = session.user;

        if (user_metadata?.full_name) {
            return user_metadata.full_name.substring(0, 2).toUpperCase();
        }

        if (email) {
            return email.substring(0, 2).toUpperCase();
        }

        return <UserIcon className='h-4' />
    }, [session]);
}