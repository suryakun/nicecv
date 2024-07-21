import Image from "next/image";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { CVOptions } from "@/components/CVOptions";


export default function Home() {

  return (
    <main className="flex flex-col relative bg-slate-300">
      <NavigationMenu className="flex min-w-full max-h-[100px] bg-white justify-start p-8 fixed">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Image src="/resumme-high-resolution-logo-black-transparent.png" alt="avatar" width={200} height={100}/>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex flex-col relative bg-gray-100 aspect-video justify-center mt-[100px] bg-[url('/bg.jpg')] bg-no-repeat bg-cover">
        <div className="z-10 absolute flex flex-col justify-center gap-8 top-48 w-full items-center p-4">
          <h1 className="z-10 text-center w-full text-white text-6xl font-extrabold bg-black bg-opacity-50">Transforming your CV into a masterpiece that leaves everyone convinced of your brilliance</h1>
          <h4 className="z-10 text-center text-primary text-xl font-semibold bg-white bg-opacity-40 p-4 rounded-lg">Your career, elevated. Every detail, perfected</h4>
        </div>
        <CVOptions />
      </div>
      <footer className="z-10 fixed bottom-0 w-full h-8 bg-primary bg-opacity-10 p-8">
        @Copyright Surya Surakhman
      </footer>
    </main>
  );
}