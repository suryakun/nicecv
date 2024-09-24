'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { signIn, useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

export const CustomNavbar = () => {
  const { status } = useSession();
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
      <Link href="/" passHref>
        <Image src={'/newlogo.svg'} width={200} height={80} alt={''} priority />
      </Link>
      <div></div>
      <div className="flex gap-4">
        {isAuthPending ? (
          <NavigationMenuItem className="list-none">
            <span className="text-white">Authenticating...</span>
          </NavigationMenuItem>
        ) : (
          <>
            {isLoggedIn ? (
              <NavigationMenuItem className="list-none">
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'bg-primary',
                    'text-primary-foreground',
                  )}
                >
                  <button onClick={() => signOut()}>Logout</button>
                </NavigationMenuLink>
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
      </div>
    </NavigationMenu>
  );
};
