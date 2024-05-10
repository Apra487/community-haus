'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardBlockCard } from '@/components/cards';
import { IDashboardStore, useDashboardStore } from '@/stores';
import Image from 'next/image';

export default function Dashboard() {
  const router = useRouter();
  const { superUsername, communityData } = useDashboardStore(
    (store: IDashboardStore) => ({
      superUsername: store.superUsername,
      communityData: store.communityData,
    })
  );

  useEffect(() => {
    if (!superUsername) {
      router.push('/creator');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [superUsername]);

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
              <div className="w-12 h-12 rounded-full bg-primary">
                <img
                  src={
                    communityData && communityData[0].avatar
                      ? communityData[0].avatar
                      : '/assets/icons/profile.svg'
                  }
                  alt="profile"
                  className="w-full h-full rounded-full"
                />
              </div>
            </div>
          </div>
          <div className="flex mt-12 flex-col items-center sm:flex-row sm:items-start">
            <div className="basis-3/5 flex justify-center align-center px-10 mb-16">
              <div />
              {superUsername && (
                <div className="w-[716px] h-[354px] flex flex-col justify-between bg-header py-11 px-14">
                  <h1 className="text-primary text-5xl font-bold">
                    Your community has been{' '}
                    <span className="text-accent">successfully created!</span>
                  </h1>
                  <h5 className="text-2xl font-bold mt-24">
                    You have been{' '}
                    <span className="text-accent">directly added</span> to the
                    group.
                  </h5>
                  <div className="flex flex-col px-14 mt-5">
                    <p className="mt-10">
                      Here is the link you can share with your collectors.
                    </p>
                    <div className="px-5 py-3 mt-3 w-full bg-tertiary rounded-2xl flex justify-between">
                      <div>{`community.haus/communities/${superUsername}`}</div>
                      <Image
                        src="/assets/icons/copy.svg"
                        alt="copy"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `community.haus/communities/${superUsername}`
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="basis-2/5 mt-20">
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
}
