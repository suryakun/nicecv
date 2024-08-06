import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col relative bg-slate-300">
          <NavigationMenu className="flex min-w-full max-h-[100px] bg-white justify-start p-8 ">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Image src="/resumme-high-resolution-logo-black-transparent.png" alt="avatar" width={200} height={100}/>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="h-full">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
