import { NextPage } from 'next';
import { SuperJoinCard } from '@/components/cards';
import { redirect } from 'next/navigation';

async function getCommunitiesByUserame(superusername: string) {
  const res = await fetch(
    `http://localhost:3000/api/communities?superUsername=${superusername}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await res.json();
  if (data.document === null) {
    redirect('/collector');
  }
  return data;
}
interface Props {
  params: {
    superusername: string;
  };
}

const Username: NextPage<Props> = async ({ params }) => {
  const superusername = params.superusername;
  const data = await getCommunitiesByUserame(superusername);

  return (
    <main className="container flex flex-col justify-center items-center mt-10">
      <div className="fixed w-screen h-screen bg-[#0d0d0d] top-0 right-0 bg-no-repeat bg-cover -z-50" />
      <SuperJoinCard
        superUsername={superusername}
        communities={data.documents}
      />
    </main>
  );
};

export default Username;
