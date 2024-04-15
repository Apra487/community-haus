'use client';
import { useCallback, useState } from 'react';
import Modal from './Modal';

interface Props {
  closeAction: () => void;
}

const WaitlistModal: React.FC<Props> = ({ closeAction }) => {
  const [dripUsername, setDripUsername] = useState('');
  const [xUrl, setXUrl] = useState('');
  const [email, setEmail] = useState('');
  
  const addToWaitlist = useCallback(async () => {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dripUsername,
        xUrl,
        email,
      }) || JSON.stringify({}),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log('Add to waitlist');
    closeAction();
  }, [closeAction, dripUsername, xUrl, email]);

  return (
    <Modal>
      <div className="flex flex-col items-center bg-primary-dark rounded-xl p-5 max-w-[442px]">
        <h1 className="text-2xl font-bold leading-9 text-center text-lime-500 capitalize">
          {/* Verify your socials to <br /> */}
          <span className="text-accent">{`Join waitlist!`}</span>
        </h1>
        <div className="flex flex-col justify-center self-stretch mt-8">
          <div className="flex flex-col justify-center">
            <h2 className="flex flex-col justify-center py-1.5 max-w-full text-2xl font-bold leading-7 text-white w-[187px]">
              <div className="justify-center">Information</div>
            </h2>
            <p className="justify-center text-secondary">
              Please provide your DRiP username, email and X url to join the waitlist
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
          <div className="flex flex-col justify-center mt-5">
            <label
              htmlFor="xUrl"
              className="flex flex-col justify-center items-start text-base font-bold leading-6 text-white"
            >
              X url associated with your DRiP account
            </label>
            <input
              type="text"
              id="xUrl"
              name="xUrl"
              placeholder="X URL"
              aria-label="X Url"
              className="bg-tertiary w-full py-2 px-4 rounded-2xl focus:outline-none mt-2"
                value={xUrl}
                onChange={(e) => setXUrl(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-center mt-5">
            <label
              htmlFor="email"
              className="flex flex-col justify-center items-start text-base font-bold leading-6 text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email"
              aria-label="email"
              className="bg-tertiary w-full py-2 px-4 rounded-2xl focus:outline-none mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <button
          type="button"
          className="btn-primary mt-5"
          onClick={addToWaitlist}
        >
          <div>Add to Waitlist!</div>
        </button>
        <p className="mt-4 text-secondary ">Please get in touch with <a className='underline' href="https://twitter.com/arnavgjalan">Arnav</a> in X for more info!</p>
      </div>
    </Modal>
  );
};

export default WaitlistModal;
