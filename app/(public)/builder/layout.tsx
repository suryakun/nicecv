import { ReactElement } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const PreviewLayout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu className="bg-primary max-w-full max-h-[72px] flex justify-between p-4">
        <div></div>
        <div className="flex gap-4">
          <NavigationMenuItem className="list-none">
            <Link href="/login" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  'bg-primary',
                  'text-primary-foreground',
                )}
              >
                Register
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="list-none">
            <Link href="/login" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  'bg-primary',
                  'text-primary-foreground',
                )}
              >
                Login
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </div>
      </NavigationMenu>
      <main className="flex flex-col flex-grow p-4">{children}</main>
    </div>
  );
};

export default PreviewLayout;
