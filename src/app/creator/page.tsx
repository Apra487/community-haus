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
  return (
    <div className="w-screen">
      <main className="container flex flex-col justify-center">
        <Image
          src="/assets/bgs/creator.svg"
          alt="hero"
          width={1440}
          height={829}
          style={{
            position: 'absolute',
            width: '100vw',
            top: 0,
            left: 0,
          }}
        />
        <header className="absolute top-0 left-0 w-full blurred-header h-28 z-50 flex items-center">
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
        <div className="mt-64 w-3/4">
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
          <h3 className="text-4xl text-accent font-semibold capitalize leading-[65.25px] max-w-[694px] max-md:text-2xl">
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
      <div className="relative capitalize mb-40">
        <h3 className="w-full text-center mt-80 text-5xl">
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
        <section className="container flex justify-between mt-[480px]">
          <div className="flex flex-col p-6 items-center gap-10 bg-primary-dark rounded-[20px] border-[6px] border-accent w-[360px] h-[320px]">
            <Image
              src="/assets/images/handshake.svg"
              alt="icon"
              width={128}
              height={128}
            />
            <p className="text-2xl text-center">
              <span className="text-accent">Engage</span> directly with your
              <br />
              collectors.
            </p>
          </div>
          <div className="flex flex-col p-6 items-center gap-10 bg-primary-dark rounded-[20px] border-[6px] border-accent w-[360px] h-[320px]">
            <Image
              src="/assets/images/crown.svg"
              alt="icon"
              width={128}
              height={128}
            />
            <p className="text-2xl text-center">
              Share exclusive <span className="text-accent">previews </span>
              <br />
              and
              <span className="text-accent"> updates </span>
              on <br />
              upcoming drops.
            </p>
          </div>
          <div className="flex flex-col p-6 items-center gap-10 bg-primary-dark rounded-[20px] border-[6px] border-accent w-[360px] h-[320px]">
            <Image
              src="/assets/images/sale.svg"
              alt="icon"
              width={128}
              height={128}
            />
            <p className="text-2xl text-center">
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
        <section className="container flex justify-between mt-[480px]">
          <div className="flex flex-col p-6 items-center gap-10 bg-primary-dark rounded-[20px] border-[6px] border-accent w-[360px] h-[320px]">
            <Image
              src="/assets/images/group.svg"
              alt="icon"
              width={128}
              height={128}
            />
            <p className="text-2xl text-center">
              Join an <span className="text-accent">exclusive community </span>
              of your favourite artists.
            </p>
          </div>
          <div className="flex flex-col p-6 items-center gap-10 bg-primary-dark rounded-[20px] border-[6px] border-accent w-[360px] h-[320px]">
            <Image
              src="/assets/images/unlock.svg"
              alt="icon"
              width={128}
              height={128}
            />
            <p className="text-2xl text-center">
              Get
              <span className="text-accent"> direct access</span>
              <br />
              to rare drops.
            </p>
          </div>
          <div className="flex flex-col p-6 items-center gap-10 bg-primary-dark rounded-[20px] border-[6px] border-accent w-[360px] h-[320px]">
            <Image
              src="/assets/images/avatar.svg"
              alt="icon"
              width={128}
              height={128}
            />
            <p className="text-2xl text-center">
              <span className="text-accent">Connect</span> with collectors who
              share your passion.
            </p>
          </div>
        </section>
        <p className="text-3xl text-center mt-40">
          Connect with all your collectors in
          <br /> your own
          <span className="text-accent"> dedicated community</span>!
        </p>
        <h1 className="text-7xl text-center mt-24 font-bold leading-[150%]">
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
              left: '-400px',
              top: '-148px',
            }}
          />
        </div>
        <div className=" flex items-center justify-center mt-20">
          <button className="relative btn-primary text-3xl">
            Join The Waitlist
            <Image
              src="/assets/images/arrow.svg"
              alt="icon"
              width={200}
              height={200}
              style={{
                position: 'absolute',
                top: '-140px',
                right: '-208px',
              }}
            />
          </button>
        </div>

        <h1 className="text-5xl text-center mt-40 leading-[150%]">
          Frequently Asked <span className="text-accent">Questions</span>
        </h1>
        <section className="mt-24 container flex flex-col normal-case gap-5">
          {FAQ.map((faq, index) => (
            <Faq key={index} question={faq.question} answer={faq.answer} />
          ))}
        </section>
      </div>
      <Footer />
    </div>
  );
}
