import { redirect } from 'next/navigation';

async function redirectToCreator() {
  redirect('/creator');
}

export default async function Home() {
  await redirectToCreator();
  return (
    <main className="container flex flex-col justify-center">
      <div className="flex flex-col items-baseline justify-center fixed w-screen h-screen bg-creator top-0 right-0 bg-no-repeat bg-cover -z-50">
        {/* <div className="ml-32">
          <span
            style={{ lineHeight: '75px' }}
            className="bg-transparent font-bold text-5xl max-md:text-4xl max-md:leading-[64px]"
          >
            Check Your{' '}
          </span>
          <section className="bg-accent inline text-5xl font-normal text-[rgb(0,0,0)]  max-md:text-4xl max-md:leading-[64px] ">
            <span className="bg-accent inline font-bold text-zinc-900">
              Eligibility{' '}
            </span>
          </section>
          <br></br>
          <span
            style={{ lineHeight: '75px' }}
            className="bg-transparent font-bold text-5xl max-md:text-4xl max-md:leading-[64px]"
          >
            To Join X Person<br></br> Community
          </span>
        </div>
        <ConnectButton /> */}
      </div>
    </main>
  );
}
