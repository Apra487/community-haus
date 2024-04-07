'use client';
import { VerifyModal, CreateModal, CriteriaModal } from '@/components/modals';
import { useModal } from '@/hooks';

export default function Creator() {
  const { openModal, closeModal } = useModal();
  return (
    <main className="container flex flex-col justify-center">
      <div className="flex flex-col items-baseline justify-center fixed w-screen h-screen bg-creator top-0 right-0 bg-no-repeat bg-cover -z-50">
        <div className='ml-32'>
          <section className="bg-accent inline text-5xl font-normal text-[rgb(0,0,0)]  max-md:text-4xl max-md:leading-[64px] ">
            <span className="bg-accent inline font-bold text-zinc-900">
              Connect{' '}
            </span>
          </section>
          <span style={{"lineHeight": "75px"}} className="bg-transparent font-bold text-5xl max-md:text-4xl max-md:leading-[64px]">
            With Your<br></br> Collectors Today-
          </span>
        </div>
        {/* <h1 className="text-5xl font-normal text-[rgb(255,255,255)]  max-md:text-4xl max-md:leading-[64px]">With Your Collectors Today-</h1> */}
        <h3 className="text-3xl text-[#00FF00] capitalize leading-[65.25px] max-w-[694px] max-md:text-2xl font-normal">
          Without Any Limitation
        </h3>
        <button
          className='btn-secondary mt-5'
          onClick={() => {
            openModal(
              <VerifyModal
                closeAction={() => {
                  closeModal();
                  openModal(
                    <CreateModal
                      closeActon={() => {
                        closeModal();
                        openModal(
                          <CriteriaModal
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
