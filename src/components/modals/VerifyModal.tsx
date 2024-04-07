import Image from 'next/image';
import Modal from './Modal';

interface SocialLinkProps {
  username: string;
  service: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ username, service }) => {
  return (
    <div className="flex flex-col justify-center mt-5 text-white">
      <div className="flex flex-col justify-center items-start text-base font-bold leading-6">
        <div className="flex flex-col justify-center max-w-full w-[166px]">
          <div className="flex flex-col justify-center py-1">
            <div className="justify-center">Integrate {service}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center px-4 py-4 mt-2 text-sm rounded-2xl border border-black border-solid backdrop-blur-[20px] bg-white bg-opacity-0">
        <div className="flex gap-2">
          {/* <Image
            loading="lazy"
            src={`https://cdn.builder.io/api/v1/image/assets%2F${username}`}
            alt={`${service} logo`}
            className="shrink-0 aspect-[1.37] w-[22px]"
          /> */}
          <div className="flex flex-col grow shrink-0 justify-center basis-0 w-fit">
            <div className="flex flex-col justify-center py-0.5">
              <div className="justify-center">
                Connect your {service} account
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VerifyModal: React.FC = () => {
  console.log('VerifyModal');
  const socialLinks = [
    { username: 'twitter_username', service: 'Twitter' },
    { username: 'instagram_username', service: 'Instagram' },
  ];

  return (
    <Modal>
      <div className="flex flex-col items-center pt-9 pb-5 pl-5 bg-black rounded-xl border border-lime-500 border-solid max-w-[442px]">
        <h1 className="text-2xl font-bold leading-9 text-center text-lime-500 capitalize">
          Verify your socials to <br />
          <span className="text-lime-500">lorem ipsum dolor</span>
        </h1>
        <div className="flex flex-col justify-center self-stretch mt-10">
          <div className="flex flex-col justify-center">
            <div className="flex flex-col justify-center">
              <div className="flex flex-col py-px">
                <h2 className="flex flex-col justify-center py-1.5 max-w-full text-2xl font-bold leading-7 text-white w-[187px]">
                  <div className="justify-center">Social links</div>
                </h2>
                <p className="justify-center mt-4 text-base leading-6 text-white text-opacity-60">
                  Verify your existing social links to lorem ipsum dolor sit
                  amet
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center mt-5">
              <div className="flex flex-col justify-center">
                <label
                  htmlFor="dripUsername"
                  className="flex flex-col justify-center items-start text-base font-bold leading-6 text-white"
                >
                  <div className="flex flex-col justify-center max-w-full w-[126px]">
                    <div className="flex flex-col justify-center py-1.5">
                      <div className="justify-center">DRiP username</div>
                    </div>
                  </div>
                </label>
                <div className="flex flex-col justify-center py-4 mt-2 text-sm whitespace-nowrap rounded-2xl backdrop-blur-[20px] bg-white bg-opacity-0 text-white text-opacity-40">
                  <div className="flex flex-col justify-center px-2">
                    <div className="flex flex-col justify-center">
                      <div className="flex flex-col justify-center items-start py-0.5">
                        <div className="justify-center">
                          <input
                            type="text"
                            id="dripUsername"
                            name="dripUsername"
                            placeholder="@"
                            aria-label="DRiP username"
                            className="bg-transparent focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {socialLinks.map((link) => (
              <SocialLink
                key={link.service}
                username={link.username}
                service={link.service}
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          className="flex flex-col justify-center px-8 py-3.5 mt-5 max-w-full text-base font-bold leading-10 text-center whitespace-nowrap bg-lime-500 rounded-md text-zinc-900 w-[104px]"
        >
          <div className="justify-center">Verify</div>
        </button>
        <p className="mt-4 text-base leading-6 text-white text-opacity-60">
          Not a member on Drip? Join the waitlist
        </p>
      </div>
    </Modal>
  );
};

export default VerifyModal;
