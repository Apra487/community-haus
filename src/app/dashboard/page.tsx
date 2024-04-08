'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IDashboardStore, useDashboardStore } from '@/stores';
import Image from 'next/image';

export default function Dashboard() {
  const router = useRouter();
  const { communityData } = useDashboardStore((store: IDashboardStore) => ({
    communityData: store.communityData,
  }));

  // @ts-ignore
  const userName = communityData ? communityData?.data?.username : '';

  useEffect(() => {
    if (!communityData) {
      router.push('/creator');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="container flex flex-col justify-center items-center">
      <div className="fixed w-screen h-screen bg-[#0d0d0d] top-0 right-0 bg-no-repeat bg-cover -z-50" />
      {communityData && (
        <div className="w-[716px] h-[354px] bg-header mt-32 py-11 px-14">
          <h1 className="text-primary text-[54px] font-bold">
            Your community has been{' '}
            <span className="text-accent">successfully created!</span>
          </h1>
          <h5 className="text-2xl font-bold mt-24">
            You have been <span className="text-accent">directly added</span> to
            the group.
          </h5>
          <p className="mt-10">
            Here is the link you can share with your collectors.
          </p>
          <div className="px-5 py-3 mt-3 w-11/12 bg-tertiary rounded-2xl flex justify-between">
            <div>{`community.haus/community/${userName}`}</div>
            <Image
              src="/assets/icons/copy.svg"
              alt="copy"
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(
                  `community.haus/community/${userName}`
                );
              }}
            />
          </div>
        </div>
      )}
    </main>
  );
}
