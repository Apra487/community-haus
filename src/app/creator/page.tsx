'use client';
import { VerifyModal, CreateModal, CriteriaModal } from '@/components/modals';
import { useModal } from '@/hooks';

export default function Creator() {
  const { openModal } = useModal();
  return (
    <main className="container flex flex-col justify-center">
      <div className="fixed w-screen h-screen bg-creator top-0 right-0 bg-no-repeat bg-cover -z-50"></div>
      <button
        onClick={() => {
          openModal(<VerifyModal />);
        }}
      >
        Connect your Socials
      </button>
      <button
        onClick={() => {
          openModal(<CreateModal />);
        }}
      >
        Create your community
      </button>
      <button
        onClick={() => {
          openModal(<CriteriaModal />);
        }}
      >
        Crieteria modal
      </button>
    </main>
  );
}
