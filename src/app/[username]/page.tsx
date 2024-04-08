import { NextPage } from 'next';

async function getCommunityByUserame(username: string) {
  const res = await fetch(`https://community-haus-two.vercel.app/api/community?username=${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
}
interface Props {
  params: {
    username: string;
  };
}

const Username: NextPage<Props> = async ({ params }) => {
  const username = params.username;
  const data = await getCommunityByUserame(username);
  console.log(data);

  return (
    <main className="container flex flex-col justify-center mt-10">
      <div className="fixed w-screen h-screen bg-creator top-0 right-0 bg-no-repeat bg-cover -z-50"></div>
      <h1>hola</h1>
    </main>
  );
};

export default Username;
