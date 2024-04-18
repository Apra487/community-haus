'use client';
import { useCallback, useState } from 'react';
import Image from 'next/image';
import Modal from './Modal';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useAcountStore, useCreateStore, type ICreateStore } from '@/stores';
import { useModal } from '@/hooks';
import { CantVerifyModal } from '@/components/modals';

interface Props {
  closeAction: (requiresGroupCreation?: boolean) => void;
  waitlistAction: () => void;
}

const VerifyModal: React.FC<Props> = ({ closeAction, waitlistAction }) => {
  const { openModal } = useModal();
  const { data: session } = useSession();
  console.log('session', session);
  useAcountStore.getState().updateName(session?.user?.name ?? '');
  useAcountStore.getState().updateImageUrl(session?.user?.image ?? '');

  const { updateTwitterUrl, updateAddress } = useCreateStore(
    (store: ICreateStore) => ({
      updateTwitterUrl: store.updateTwitterUrl,
      updateAddress: store.updateAddress,
    })
  );

  const [dripUsername, setDripUsername] = useState<string>('');
  const [isTelegrapGroupEnabled, setIsTelegrapGroupEnabled] = useState(false);

  const toggleSwitch = () => setIsTelegrapGroupEnabled(!isTelegrapGroupEnabled);

  const handleVerify = useCallback(async () => {
    try {
      if (!session?.user?.name) throw new Error('User not signed in');

      const dripUrl = `https://drip.haus/${dripUsername}`;
      const response = await fetch('/data/dripToTwitterInfoMap.json');
      const data = await response.json();
      const dripTwitterInfo = data[dripUrl];

      if (
        session?.user?.name === dripTwitterInfo?.name ||
        dripTwitterInfo?.name?.includes(session?.user?.name)
      ) {
        const twitterToAddressResponse = await fetch(
          '/data/twitterToAddressMap.json'
        );
        const twitterToAddressData = await twitterToAddressResponse.json();
        const address = twitterToAddressData[dripTwitterInfo.twitterUrl];
        updateTwitterUrl(dripTwitterInfo.twitterUrl);
        updateAddress(address);
        console.log('Verified', address);
        closeAction(!isTelegrapGroupEnabled);
      } else {
        console.log('Not verified');
        closeAction();
        openModal(<CantVerifyModal waitlistAction={waitlistAction} />);
      }
    } catch (error) {
      console.error('Something went wrong while try to verify', error);
    }
  }, [
    session,
    dripUsername,
    updateTwitterUrl,
    updateAddress,
    closeAction,
    isTelegrapGroupEnabled,
  ]);

  const goToWaitlist = useCallback(() => {
    waitlistAction();
  }, [waitlistAction]);

  return (
    <Modal>
      <div className="flex flex-col items-center bg-primary-dark rounded-xl p-5 max-w-[442px]">
        <h1 className="text-2xl font-bold leading-9 text-center text-lime-500 capitalize">
          {/* Verify your socials to <br /> */}
          <span className="text-accent">{`Let's get started!`}</span>
        </h1>
        <div className="flex flex-col justify-center self-stretch mt-8">
          <div className="flex flex-col justify-center">
            <h2 className="flex flex-col justify-center py-1.5 max-w-full text-2xl font-bold leading-7 text-white w-[187px]">
              <div className="justify-center">Social links</div>
            </h2>
            <p className="justify-center text-secondary">
              Verify your socials to start your community
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
              value={dripUsername}
              onChange={(e) => setDripUsername(e.target.value)}
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
                  className="flex gap-2 items-center w-fit bg-tertiary py-2 px-4 rounded-2xl"
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
        <div className="flex w-full mt-5 justify-between items-center space-x-2">
          <label className="text-base font-bold">
            Already have telegram group?
          </label>
          <button
            onClick={toggleSwitch}
            className={`${
              isTelegrapGroupEnabled ? ' bg-accent' : 'bg-secondary'
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}
          >
            <span
              className={`${
                isTelegrapGroupEnabled ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-primary rounded-full transition-transform`}
            />
          </button>
        </div>
        <button
          type="button"
          className="btn-primary mt-5"
          onClick={handleVerify}
        >
          <div>Verify</div>
        </button>
        <p className="mt-4 text-secondary ">Not a member on Community Haus?</p>
        <button type="button" onClick={goToWaitlist}>
          <p className="text-secondary">Join Waitlist</p>
        </button>
      </div>
    </Modal>
  );
};

export default VerifyModal;
