'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  VerifyModal,
  CreateModal,
  CriteriaModal,
  WaitlistModal,
} from '@/components/modals';
import { useModal } from '@/hooks';

export default function Creator() {
  const { openModal, closeModal } = useModal();
  const router = useRouter();
  return (
    <main className="container flex flex-col justify-center">
      <div className="flex flex-col items-baseline justify-center fixed w-screen h-screen bg-creator top-0 right-0 bg-no-repeat bg-cover -z-50">
        <header className="absolute top-0 w-screen blurred-header h-28 z-50 flex items-center">
          <div className="container flex justify-between items-center">
            <Image
              src="/assets/logos/logo.svg"
              alt="logo"
              width={150}
              height={50}
              className="cursor-pointer"
              onClick={() => router.push('/')}
            />
            <p className="justify-center text-[#8EFF01]">
              DRiP Communities for Creators
            </p>
          </div>
        </header>
        <div className="ml-32">
          <section className="bg-accent inline text-6xl font-normal text-[rgb(0,0,0)]  max-md:text-4xl max-md:leading-[64px] ">
            <span className="bg-accent inline font-bold text-zinc-900">
              Connect{' '}
            </span>
          </section>
          <span
            style={{ lineHeight: '75px' }}
            className="bg-transparent font-bold text-6xl max-md:text-4xl max-md:leading-[64px]"
          >
            With Your<br></br> Collectors Today-
          </span>
        </div>
        {/* <h1 className="text-5xl font-normal text-[rgb(255,255,255)]  max-md:text-4xl max-md:leading-[64px]">With Your Collectors Today-</h1> */}
        <h3 className="text-4xl text-[#00FF00] font-semibold capitalize leading-[65.25px] max-w-[694px] max-md:text-2xl">
          Without Any Limitation
        </h3>
        <button
          className="btn-secondary mt-5"
          onClick={() => {
            openModal(
              <VerifyModal
                waitlistAction={() => {
                  closeModal();
                  openModal(
                    <WaitlistModal
                      closeAction={() => {
                        closeModal();
                      }}
                    />
                  );
                }}
                closeAction={(requiresGroupCreation = true) => {
                  closeModal();
                  openModal(
                    <CreateModal
                      requiresGroupCreation={requiresGroupCreation}
                      closeActon={() => {
                        closeModal();
                        openModal(
                          <CriteriaModal
                            requiresGroupCreation={requiresGroupCreation}
                            closeActon={() => {
                              closeModal();
                            }}
                          />
                        );
                      }}
                    />
                  );
                }}
              />
            );
          }}
        >
          Connect your Socials
        </button>
      </div>
    </main>
  );
}
