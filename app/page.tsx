import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="bg-white h-screen">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl">Gymbeam case study</h1>
              <h2 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl">React developer</h2>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">A simple to-do list web application with basic CRUD
              operations using Next.js, Tailwind and Typescript.</p>
              <Link href='/lists' className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                Show me the app
                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </Link>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <Image src='/gym.png' alt='logo of man and woman exercising' width={1200} height={969} />
          </div>                
      </div>
  </section>
  );
}
