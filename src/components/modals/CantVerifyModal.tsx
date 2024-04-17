'use client';
import { useCallback } from 'react';
import Modal from './Modal';

interface Props {
    waitlistAction: () => void;
  }

const CantVerifyModal: React.FC<Props> = ({ waitlistAction }) => {
    const goToWaitlist = useCallback(() => {
        waitlistAction();
      }, [waitlistAction]);
    
  return (
    <Modal>
      <div className="flex flex-col items-center bg-primary-dark rounded-xl p-5 max-w-[442px] min-w-[300px]">
        <div className="flex flex-col justify-center self-stretch ">
          <div className="flex flex-col justify-center">
            <h2 className="py-1.5 max-w-full text-3xl font-bold leading-20 text-white">
              <span >Sorry your profile </span>
              <span className="text-accent">
                was not verified
              </span>
            </h2>
          </div>
          <button
            type="button"
            className="btn-secondary mt-5"
            onClick={goToWaitlist}
          >
            <div>Join Waitlist</div>
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default CantVerifyModal;
