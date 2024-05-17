'use client';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { SuperJoinCard, DashboardBlockCard } from '@/components/cards';
import { useEffect, useState } from 'react';

interface Props {
  params: {
    superusername: string;
  };
}

const Username: NextPage<Props> = ({ params }) => {
  const superusername = params.superusername;
  const router = useRouter();
  const [data, setData] = useState<any | undefined>(undefined);

  useEffect(() => {
    async function getCommunitiesByUserame(superusername: string) {
      const res = await fetch(
        `/api/communities?superUsername=${superusername}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await res.json();

      if (data.document === null) {
        router.push('/collector');
      }
      setData(data);
    }
    getCommunitiesByUserame(superusername);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="container flex flex-col justify-center items-center">
      <div className="w-screen h-screen flex">
        <div className="basis-1/5 bg-[#253411] p-10 hidden lg:block">
          <img src="/assets/logos/company.svg" alt="logo" />
          <div className="flex flex-col items-start py-10">
            <button className="flex pt-5 font-semibold text-lg text-[#8EFF01]">
              <img src="/assets/icons/dashboard.svg" alt="dashboard" />
              <span className="ml-4">Dashboard</span>
            </button>
            <button className="flex pt-5 font-semibold text-lg text-[#48F4FF]">
              <img src="/assets/icons/marketplace.svg" alt="marketplace" />
              <span className="ml-4">Coming Soon</span>
            </button>
            <button className="flex pt-5 font-semibold text-lg text-[#48F4FF]">
              <img src="/assets/icons/hammer.svg" alt="hammer" />
              <span className="ml-4">Coming Soon</span>
            </button>
          </div>
          <div className="flex flex-col items-start py-10">
            <p className="text-xs font-bold tracking-widest text-[#8EFF01]">
              PROFILE
            </p>
            <button className="flex pt-5 font-semibold text-lg text-[#48F4FF]">
              <img src="/assets/icons/profile-1.svg" alt="profile-1" />
              <span className="ml-4">Coming Soon</span>
            </button>
            <button className="flex pt-5 font-semibold text-lg text-[#48F4FF]">
              <img src="/assets/icons/profile-2.svg" alt="profile-2" />
              <span className="ml-4">Coming Soon</span>
            </button>
            <button className="flex pt-5 font-semibold text-lg text-[#48F4FF]">
              <img src="/assets/icons/profile-3.svg" alt="profile-3" />
              <span className="ml-4">Coming Soon</span>
            </button>
            <button className="flex pt-5 font-semibold text-lg text-[#48F4FF]">
              <img src="/assets/icons/profile-4.svg" alt="profile-4" />
              <span className="ml-4">Coming Soon</span>
            </button>
            <button className="flex pt-5 font-semibold text-lg">
              <img src="/assets/icons/profile-5.svg" alt="profile-5" />
              <span className="ml-4">Settings</span>
            </button>
          </div>
          <div className="flex flex-col items-start py-10">
            <p className="text-xs font-bold tracking-widest text-[#8EFF01]">
              OTHER
            </p>
            <button className="flex pt-5 font-semibold text-lg">
              <img src="/assets/icons/moon.svg" alt="moon" />
              <span className="ml-4">Light Mode</span>
            </button>
          </div>
        </div>
        {/* Right Component */}
        <div className="basis-4/5 bg-[#0d0d0d]">
          <div className="flex justify-between p-7">
            <input
              type="text"
              className="bg-[#0C1600] py-3 px-10 w-1/3 rounded-3xl border border-brand-green outline-none"
              placeholder="Search Item, Collection and Account.."
            />
            <div className="flex items-center">
              <button className="bg-[#0C1600] p-3 rounded-3xl mr-4 px-6">
                Collaborator
              </button>
              <div className="w-12 h-12 rounded-full border border-brand-green bg-[#000000] flex justify-center align-center mr-4">
                <img
                  className="w-1/2"
                  src="/assets/icons/notification.svg"
                  alt="notification"
                />
              </div>
              <div className="w-12 h-12 rounded-full">
                <img
                  src={
                    data
                      ? data.documents[0].avatar
                      : '/assets/icons/profile.svg'
                  }
                  alt="profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex mt-12 flex-col items-center sm:flex-row sm:items-start">
            <div className="basis-3/5 flex justify-center align-center px-10 mb-16">
              {data ? (
                <SuperJoinCard
                  superUsername={superusername}
                  communities={data.documents}
                />
              ) : (
                <div className="w-[716px] h-[354px] flex flex-col justify-between items-center bg-header py-11 px-14">
                  <div
                    role="status"
                    className="w-full h-full flex justify-center items-center"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#5f5c5c"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#8EFF01"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
            </div>
            <div className="basis-2/5">
              <div className="grid grid-cols-2 gap-10		">
                <DashboardBlockCard />
                <DashboardBlockCard />
                <DashboardBlockCard />
                <DashboardBlockCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Username;
