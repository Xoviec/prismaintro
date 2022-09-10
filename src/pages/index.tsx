import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { signIn, signOut, useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { userAgent } from "next/server";
import { Menu } from '@headlessui/react'
import Dropdown from "../components/shared/Dropdown";
import { AssetOfficialEvents } from "../components/home/AssetOfficialEvents";


export function Form() {

  const addPlaceMutation = trpc.useMutation(["place.add",])

  function addPlace(event){
    event.preventDefault()
    console.log(event.target.name.value)
    const place = {
      name: event.target.name.value,
      rating: +event.target.rating.value,
      address: event.target.address.value,
      description: event.target.description.value
    }
    addPlaceMutation.mutate({...place})
    

  }

  return (
    <form onSubmit={addPlace}>
      <label>Name</label>
      <input type="text" name="name" required />

      <label>Rating</label>
      <input type="text" name="rating" required />

      <label>Address</label>
      <input type="text"  name="address" required />

      <label>Description</label>
      <input type="text" name="description" required />

      <button type="submit">Submit</button>
    </form>
  )
}

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
  const places = trpc.useQuery(["place.getAll"]);
  const cars = trpc.useQuery(["car.getAll"]);
  const {data} = useSession();
  const [page, setPage] = useState('official')


  const handleSignIn = useCallback(() => signIn(), []);
  const handleSignOut = useCallback(() => signOut(), []);

  console.log(places)
  console.log(cars)
  console.log(!!data) //tu jest czy zalogowany

  return (
    <>
    
   
      {/* <Head>
        <title>Create T3 App</title>

        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <header className="fixed flex w-[100%] h-16 bg-gray-200">
        <div className="w-[10%] flex items-center justify-center bg-gray-400">BB4US</div>
        <div className="bg-gray-500 w-[60%] flex items-center justify-around">
          <button>oficjalne</button>
          <button>wasze eventy</button>
        </div>
        <div className="w-[20%] bg-gray-500"> </div>
        <div className="flex items-center justify-center">
          {
            !!data ? 
           
              <Dropdown title={'Witaj ' + data.user?.name+ '!'}>
                <div className="flex flex-col" >
                  <button className="h-8">Ustawienia</button>
                  <button onClick={handleSignOut} className="h-8">Logout</button>

                </div>
              </Dropdown> 
  
            : <button className="inline-flex justify-center w-full px-4 text-sm font-medium text-header-item-color-dark hover:text-header-item-color" onClick={handleSignIn}>Login</button>
          }
        </div>
      </header>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          
        
        {/* <button onClick={handleSignOut}>Logout</button> */}
        </h1>
        
        <div className="flex flex-col items-between w-96">

{/* {places.data?.map((place: any) =>
<div className="flex flex-col justify-around text-body-color m-6 p-8 w-72 min-w-[18rem] h-40 opacity-100 rounded-md snap-center bg-red-800">
  <span >{place.name}</span>
  <span >{place.rating}/10</span>
  <span >{place.address}</span>
  <span >{place.description}</span>
</div>
)} */}

</div>

        <div className="flex flex-row justify-between">

          {
            (page == 'official') ? <AssetOfficialEvents/> : 'eadsa'
          }
          
        </div>

        <div className="flex flex-col items-between w-96">

          {/* {cars.data?.map((car: any) =>
          <div className="flex flex-col justify-around text-body-color m-6 p-8 w-72 min-w-[18rem] h-40 opacity-100 rounded-md snap-center bg-red-800">
            <span >Producent: {car.producent}</span>
            <span >Model: {car.model}</span>
            <span >V-max: {car.vmax}</span>
            <span >{car.description}</span>
          </div>
          )} */}

        </div>

        {/* <span>{places?.data?.[0]?.name}</span> */}
       
        
        {/* <Form/> */}

        {/* <p className="text-2xl text-gray-700">This stack uses:</p>
        <div className="grid gap-3 pt-3 mt-3 text-center md:grid-cols-2 lg:w-2/3">
          <TechnologyCard
            name="NextJS"
            description="The React framework for production"
            documentation="https://nextjs.org/"
          />
          <TechnologyCard
            name="TypeScript"
            description="Strongly typed programming language that builds on JavaScript, giving you better tooling at any scale"
            documentation="https://www.typescriptlang.org/"
          />
          <TechnologyCard
            name="TailwindCSS"
            description="Rapidly build modern websites without ever leaving your HTML"
            documentation="https://tailwindcss.com/"
          />
          <TechnologyCard
            name="tRPC"
            description="End-to-end typesafe APIs made easy"
            documentation="https://trpc.io/"
          />
          <TechnologyCard
            name="Next-Auth"
            description="Authentication for Next.js"
            documentation="https://next-auth.js.org/"
          />
          <TechnologyCard
            name="Prisma"
            description="Build data-driven JavaScript & TypeScript apps in less time"
            documentation="https://www.prisma.io/docs/"
          />
        </div>
        <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full">
          {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
        </div> */}
      </main>
    </>
  );
};

export default Home;

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const TechnologyCard = ({
  name,
  description,
  documentation,
}: TechnologyCardProps) => {
  return (
    <section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <a
        className="mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2"
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </a>
    </section>
  );
};
