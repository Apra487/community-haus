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
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';

const FAQ = [
  {
    question: 'Why Join Community Haus?',
    answer:
      'Simply sign up for the waitlist, and we will guide you through the next steps.',
  },
  {
    question: 'How to Join the Community?',
    answer:
      'Simply sign up for the waitlist, and we will guide you through the next steps.',
  },
  {
    question: 'How to Start Your Community?',
    answer:
      'Simply sign up for the waitlist, and we will guide you through the next steps.',
  },
  {
    question: 'What is the Cost involved?',
    answer:
      'Simply sign up for the waitlist, and we will guide you through the next steps.',
  },
];

export default function Creator() {
  const { openModal, closeModal } = useModal();
  const router = useRouter();
  const isSmallDevice = window.innerWidth < 640;
  return (
    <div className="w-screen">
      <main className="container flex flex-col justify-center">
        <Image
          src={
            isSmallDevice
              ? '/assets/bgs/mobile-creator.svg'
              : '/assets/bgs/creator.svg'
          }
          alt="hero"
          width={isSmallDevice ? 448 : 1440}
          height={isSmallDevice ? 597 : 829}
          style={{
            position: 'absolute',
            width: '100vw',
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        />
        <header className="absolute top-0 left-0 w-full blurred-header h-16 sm:h-28 z-50 flex items-center">
          <div className="container flex justify-between items-center">
            <Image
              src="/assets/logos/logo.svg"
              alt="logo"
              width={isSmallDevice ? 80 : 150}
              height={isSmallDevice ? 22 : 50}
              className="cursor-pointer"
              onClick={() => router.push('/')}
            />
            <p className="justify-center text-accent text-xs sm:text-base">
              DRiP Communities for Creators
            </p>
          </div>
        </header>
        <div className="mt-20 sm:mt-64 sm:w-3/4 self-center sm:self-start">
          <section className="flex flex-col">
            <h1 className="text-3xl sm:text-6xl font-bold sm:leading-[150%]">
              <span className="text-bg bg-accent">Connect </span>
              With Your
              <br />
              Collectors Today-
            </h1>
            <h3 className="text-xl sm:text-4xl text-accent font-semibold capitalize leading-[65.25px] max-w-[694px] max-md:text-2xl">
              Without Any Limitation
            </h3>
          </section>
          <button
            className="btn-secondary mt-72 sm:mt-16"
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
      <div className="relative capitalize mb-20 sm:mb-40">
        <h3 className="w-full text-center mt-5 sm:mt-80 text-2xl sm:text-5xl">
          Why does this
          <span className="text-accent"> make sense</span>?
        </h3>
        <div className="relative">
          <Image
            src="/assets/images/FOR_CREATORS.svg"
            alt="for-creators"
            width={1440}
            height={829}
            style={{
              position: 'absolute',
              width: '100vw',
              top: 0,
              left: 0,
            }}
          />
        </div>
        <section className="container flex flex-col sm:flex-row justify-between items-center gap-10 mt-36 sm:mt-[480px]">
          <div className="flex flex-col p-6 items-center gap-10 bg-primary-dark rounded-[20px] border-[6px] border-accent w-[264px] sm:w-[360px] h-[240px] sm:h-[320px]">
            <Image
              src="/assets/images/handshake.svg"
              alt="icon"
              width={isSmallDevice ? 80 : 128}
              height={isSmallDevice ? 80 : 128}
            />
            <p className="text-lg sm:text-2xl text-center">
              <span className="text-accent">Engage</span> directly with your
              <br />
              collectors.
            </p>
          </div>
          <div className="flex flex-col p-6 items-center gap-10 bg-primary-dark rounded-[20px] border-[6px] border-accent w-[264px] sm:w-[360px] h-[240px] sm:h-[320px]">
            <Image
              src="/assets/images/crown.svg"
              alt="icon"
              width={isSmallDevice ? 80 : 128}
              height={isSmallDevice ? 80 : 128}
            />
            <p className="text-lg sm:text-2xl text-center">
              Share exclusive <span className="text-accent">previews </span>
              and
              <span className="text-accent"> updates </span>
              on upcoming drops.
            </p>
          </div>
          <div className="flex flex-col p-6 items-center gap-10 bg-primary-dark rounded-[20px] border-[6px] border-accent w-[264px] sm:w-[360px] h-[240px] sm:h-[320px]">
            <Image
              src="/assets/images/sale.svg"
              alt="icon"
              width={isSmallDevice ? 80 : 128}
              height={isSmallDevice ? 80 : 128}
            />
            <p className="text-lg sm:text-2xl text-center">
              Offer <span className="text-accent">direct sales</span> of
              <br /> special collections.
            </p>
          </div>
        </section>
        <div className="relative mt-8">
          <Image
            src="/assets/images/FOR_COLLECTORS.svg"
            alt="for-collectors"
            width={1440}
            height={829}
            style={{
              position: 'absolute',
              width: '100vw',
              top: 0,
              left: 0,
            }}
          />
        </div>
        <section className="container flex flex-col sm:flex-row justify-between items-center gap-10 mt-44 sm:mt-[480px]">
          <div className="flex flex-col p-6 items-center gap-10 bg-primary-dark rounded-[20px] border-[6px] border-accent w-[264px] sm:w-[360px] h-[240px] sm:h-[320px]">
            <Image
              src="/assets/images/group.svg"
              alt="icon"
              width={isSmallDevice ? 80 : 128}
              height={isSmallDevice ? 80 : 128}
            />
            <p className="text-lg sm:text-2xl text-center">
              Join an <span className="text-accent">exclusive community </span>
              of your favourite artists.
            </p>
          </div>
          <div className="flex flex-col p-6 items-center gap-10 bg-primary-dark rounded-[20px] border-[6px] border-accent w-[264px] sm:w-[360px] h-[240px] sm:h-[320px]">
            <Image
              src="/assets/images/unlock.svg"
              alt="icon"
              width={isSmallDevice ? 80 : 128}
              height={isSmallDevice ? 80 : 128}
            />
            <p className="text-lg sm:text-2xl text-center">
              Get
              <span className="text-accent"> direct access</span>
              <br />
              to rare drops.
            </p>
          </div>
          <div className="flex flex-col p-6 items-center gap-10 bg-primary-dark rounded-[20px] border-[6px] border-accent w-[264px] sm:w-[360px] h-[240px] sm:h-[320px]">
            <Image
              src="/assets/images/avatar.svg"
              alt="icon"
              width={isSmallDevice ? 80 : 128}
              height={isSmallDevice ? 80 : 128}
            />
            <p className="text-lg sm:text-2xl text-center">
              <span className="text-accent">Connect</span> with collectors who
              share your passion.
            </p>
          </div>
        </section>
        <p className="text-lg sm:text-3xl text-center mt-32 sm:mt-40">
          Connect with all your collectors in
          <br /> your own
          <span className="text-accent"> dedicated community</span>!
        </p>
        <h1 className="text-3xl sm:text-7xl text-center mt-16 sm:mt-24 font-bold leading-[150%] sm:leading-[150%]">
          Bring Your{' '}
          <span className="text-bg bg-accent">
            collector
            <br /> community
          </span>{' '}
          to Life!
        </h1>
        <div className="relative">
          <Image
            src="/assets/animation/globe.gif"
            alt="icon"
            width={800}
            height={800}
            style={{
              position: 'absolute',
              left: isSmallDevice ? '-228px' : '-400px',
              top: isSmallDevice ? '-74px' : '-148px',
            }}
          />
        </div>
        <div className=" flex items-center justify-center mt-20">
          <button className="relative btn-primary text-sm sm:text-3xl">
            Join The Waitlist
            <Image
              src="/assets/images/arrow.svg"
              alt="icon"
              width={isSmallDevice ? 100 : 200}
              height={isSmallDevice ? 100 : 200}
              style={{
                position: 'absolute',
                top: isSmallDevice ? '-80px' : '-140px',
                right: isSmallDevice ? '-80px' : '-208px',
                transform: isSmallDevice ? 'rotate(-25deg)' : 'rotate(0deg)',
              }}
            />
          </button>
        </div>
        <h1 className="text-2xl sm:text-5xl text-center mt-40 leading-[150%]">
          Frequently Asked <span className="text-accent">Questions</span>
        </h1>
        <section className="mt-10 sm:mt-24 container flex flex-col normal-case gap-5">
          {FAQ.map((faq, index) => (
            <Faq key={index} question={faq.question} answer={faq.answer} />
          ))}
        </section>
      </div>
      <Footer />
    </div>
  );
}
