import Link from 'next/link';
export default function Page() {
  return (
    <>
      <div className='w-full h-screen flex justify-center items-center'>
        <Link href="/builder" className="bg-primary text-white text-xl font-semibold p-4 rounded-lg">
          Get Started
        </Link>
      </div>
      <footer className="z-10 fixed bottom-0 w-full h-8 bg-primary bg-opacity-10 p-8">
        <span>@Copyright Surya Surakhman</span>
      </footer>
    </>
  )
}