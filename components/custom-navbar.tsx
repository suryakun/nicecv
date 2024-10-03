'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { signIn, useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from './ui/menubar';
import { LogOut } from 'lucide-react';

export const CustomNavbar = () => {
  const { status, data: session } = useSession();
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const isLoggedIn = status === 'authenticated';
  const isAuthPending = status === 'loading';

  return (
    <NavigationMenu className="bg-primary max-w-full max-h-[72px] flex justify-between p-4">
      <NavigationMenuList>
        <Link href="/" passHref>
          <Image
            src={'/newlogo.svg'}
            width={200}
            height={80}
            alt={''}
            priority
          />
        </Link>
      </NavigationMenuList>
      <NavigationMenuList>
        {isAuthPending ? (
          <NavigationMenuItem className="list-none">
            <span className="text-white">Authenticating...</span>
          </NavigationMenuItem>
        ) : (
          <>
            {isLoggedIn ? (
              <NavigationMenuItem className="list-none relative">
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger className="bg-primary text-white border-0 outline-none">
                      Hi, {session.user?.name}
                    </MenubarTrigger>
                    <MenubarContent className="flex p-4 justify-center gap-4 items-center">
                      <LogOut size={16} />
                      <button onClick={() => signOut()}>
                        <span className="text-black">Logout</span>
                      </button>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </NavigationMenuItem>
            ) : null}
            {!isLoggedIn ? (
              <NavigationMenuItem className="list-none">
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'bg-primary',
                    'text-primary-foreground',
                  )}
                >
                  <button
                    onClick={() =>
                      signIn('keycloak', { callbackUrl: currentUrl })
                    }
                  >
                    Login
                  </button>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ) : null}
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
