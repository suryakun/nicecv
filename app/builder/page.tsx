import { CVOptions } from "@/components/cv-options";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        <CVOptions />
      </div>
      <footer className="z-10 fixed bottom-0 w-full h-8 bg-primary bg-opacity-10 p-8">
        @Copyright Surya Surakhman
      </footer>
    </>
  );
}
