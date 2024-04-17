import Modal from './Modal';

const WaitlistAckowledgementModal: React.FC = () => {
  return (
    <Modal>
      <div className="flex flex-col items-center bg-primary-dark rounded-xl p-5 max-w-[442px] min-w-[400px]">
        <div className="flex flex-col justify-center self-stretch ">
          <div className="flex flex-col justify-center">
            <h2 className="py-1.5 max-w-full text-3xl font-bold leading-20 text-white ">
              <span>
                Thank you for joining the waitlist, we will get back to you in{' '}
              </span>
              <span className="text-accent">48hours!</span>
            </h2>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default WaitlistAckowledgementModal;
