'use client';
import Image from 'next/image';
import Modal from './Modal';
import { useSession, signIn, signOut } from 'next-auth/react';
import {
  useAcountStore,
  type IAccountStore,
} from '@/stores';

const VerifyModal: React.FC = () => {
  const { data: session, update: updateSession, status } = useSession();

  // set data to store
  useAcountStore.getState().updateName(session?.user?.name ?? '');
  useAcountStore.getState().updateImageUrl(session?.user?.image ?? '');

  console.log(session)

  return (
    <Modal>
      <div className="flex flex-col items-center bg-primary-dark rounded-xl p-5 max-w-[442px]">
        <h1 className="text-2xl font-bold leading-9 text-center text-lime-500 capitalize">
          Verify your socials to <br />
          <span className="text-accent">lorem ipsum dolor</span>
        </h1>
        <div className="flex flex-col justify-center self-stretch mt-8">
          <div className="flex flex-col justify-center">
            <h2 className="flex flex-col justify-center py-1.5 max-w-full text-2xl font-bold leading-7 text-white w-[187px]">
              <div className="justify-center">Social links</div>
            </h2>
            <p className="justify-center text-secondary">
              Verify your existing social links to lorem ipsum dolor sit amet
            </p>
          </div>
          <div className="flex flex-col justify-center mt-5">
            <label
              htmlFor="dripUsername"
              className="flex flex-col justify-center items-start text-base font-bold leading-6 text-white"
            >
              DRiP username
            </label>
            <input
              type="text"
              id="dripUsername"
              name="dripUsername"
              placeholder="@"
              aria-label="DRiP username"
              className="bg-tertiary w-full py-2 px-4 rounded-2xl focus:outline-none mt-2"
            />
          </div>
          <h5 className="mt-5 text-base font-bold">Integrate X (Twitter)</h5>
          <div
            className="w-fit p-[1px] bg-primary rounded-2xl mt-3"
            style={{
              background:
                'linear-gradient(96deg, rgba(255, 255, 255, 0.04) 5.53%, rgba(255, 255, 255, 0.60) 94.22%)',
            }}
          >
            <div className="w-fit bg-primary-dark rounded-2xl">
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="flex items-center w-fit bg-tertiary py-2 px-4 rounded-2xl"
                >
                  <Image
                    src="/assets/logos/x.svg"
                    alt="X"
                    width={16}
                    height={16}
                  />
                  <p>{session.user?.name}</p>
                </button>
              ) : (
                <button
                  onClick={() => signIn('twitter')}
                  className="flex gap-2 items-center w-fit bg-tertiary py-2 px-4 rounded-2xl"
                >
                  <Image
                    src="/assets/logos/x.svg"
                    alt="X"
                    width={16}
                    height={16}
                  />
                  <p>Connect your X account</p>
                </button>
              )}
            </div>
          </div>
        </div>
        <button type="button" className="btn-primary mt-5">
          <div>Verify</div>
        </button>
        <p className="mt-4 text-secondary ">
          Not a member on Drip? Join the waitlist
        </p>
      </div>
    </Modal>
  );
};

export default VerifyModal;
