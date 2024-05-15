'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardBlockCard } from '@/components/cards';
import { KickButton } from '@/components/buttons';
import { IDashboardStore, useDashboardStore } from '@/stores';
import Image from 'next/image';

export default function Dashboard() {
  const router = useRouter();
  const { superUsername } = useDashboardStore((store: IDashboardStore) => ({
    superUsername: store.superUsername,
  }));

  const [avatar, setAvatar] = useState<string>('');
  const [users, setUsers] = useState<{
    [tag: string]: string[];
  }>({});
  const [telegramMembers, setTelegramMembers] = useState<{
    [tag: string]: string[];
  }>({});
  const [chatIDs, setChatIDs] = useState<{
    [tag: string]: string;
  }>({});
  const [creatorTelegramId, setCreatorTelegramId] = useState<{
    [tag: string]: string;
  }>({});
  const [isSuperGroup, setIsSuperGroup] = useState<{
    [tag: string]: boolean;
  }>({});
  const [isChannel, setIsChannel] = useState<{
    [tag: string]: boolean;
  }>({});
  const [kickedAll, setKickedAll] = useState<boolean>(false);
  const [isKickingAll, setIsKickingAll] = useState<boolean>(false);

  useEffect(() => {
    if (!superUsername) {
      router.push('/creator');
    }
    async function fetchCommunityData() {
      const response = await fetch(
        `/api/communities?superUsername=${superUsername}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      const communitiesData = data.documents;
      setAvatar(communitiesData[0].avatar);
      console.log(communitiesData);

      const usersData: {
        [tag: string]: string[];
      } = {};
      const chatIDsData: {
        [tag: string]: string;
      } = {};
      const creatorTelegramIdData: {
        [tag: string]: string;
      } = {};
      const telegramMembersData: {
        [tag: string]: string[];
      } = {};
      const isSuperGroupData: {
        [tag: string]: boolean;
      } = {};
      const isChannelData: {
        [tag: string]: boolean;
      } = {};
      for (let i = 0; i < communitiesData.length; i++) {
        const community = communitiesData[i];
        const tag = community.username.split('-')[1] as string;
        usersData[tag] = community.users as string[];
        chatIDsData[tag] = community.chatID;
        creatorTelegramIdData[tag] = community.telegramID;
        isSuperGroupData[tag] = community.supergroup ? true : false;
        isChannelData[tag] = community.channel ? true : false;

        const telegramMemberResponse = await fetch(
          `/api/telegram-member?chatID=${community.chatID}&isSuperGroup=${isSuperGroupData[tag]}&isChannel=${isChannelData[tag]}`,
          {
            method: 'GET',
          }
        );
        const telegramData = await telegramMemberResponse.json();
        console.log(telegramData);
        const memberList = telegramData.data as string[];
        telegramMembersData[tag] = memberList;
      }
      setUsers(usersData);
      setChatIDs(chatIDsData);
      setCreatorTelegramId(creatorTelegramIdData);
      setTelegramMembers(telegramMembersData);
      setIsSuperGroup(isSuperGroupData);
      setIsChannel(isChannelData);
    }
    fetchCommunityData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [superUsername]);

  // console.log(users);

  return (
    <main className="container flex flex-col justify-center items-center">
      <div className="w-screen h-screen flex">
        <div className="basis-1/5 bg-[#253411] p-10 hidden lg:block">
          <img src="/assets/logos/company.svg" alt="logo" />
          <div className="flex flex-col items-start py-10">
            <button className="flex pt-5 font-semibold text-lg text-[#8EFF01]">
              <img src="/assets/icons/dashboard.svg" alt="dashboard" />
              <span className="ml-4">Dashboard</span>
            </button>
            <button className="flex pt-5 font-semibold text-lg text-[#48F4FF]">
              <img src="/assets/icons/marketplace.svg" alt="marketplace" />
              <span className="ml-4">Coming Soon</span>
            </button>
            <button className="flex pt-5 font-semibold text-lg text-[#48F4FF]">
              <img src="/assets/icons/hammer.svg" alt="hammer" />
              <span className="ml-4">Coming Soon</span>
            </button>
          </div>
          <div className="flex flex-col items-start py-10">
            <p className="text-xs font-bold tracking-widest text-[#8EFF01]">
              PROFILE
            </p>
            <button className="flex pt-5 font-semibold text-lg text-[#48F4FF]">
              <img src="/assets/icons/profile-1.svg" alt="profile-1" />
              <span className="ml-4">Coming Soon</span>
            </button>
            <button className="flex pt-5 font-semibold text-lg text-[#48F4FF]">
              <img src="/assets/icons/profile-2.svg" alt="profile-2" />
              <span className="ml-4">Coming Soon</span>
            </button>
            <button className="flex pt-5 font-semibold text-lg text-[#48F4FF]">
              <img src="/assets/icons/profile-3.svg" alt="profile-3" />
              <span className="ml-4">Coming Soon</span>
            </button>
            <button className="flex pt-5 font-semibold text-lg text-[#48F4FF]">
              <img src="/assets/icons/profile-4.svg" alt="profile-4" />
              <span className="ml-4">Coming Soon</span>
            </button>
            <button className="flex pt-5 font-semibold text-lg">
              <img src="/assets/icons/profile-5.svg" alt="profile-5" />
              <span className="ml-4">Settings</span>
            </button>
          </div>
          <div className="flex flex-col items-start py-10">
            <p className="text-xs font-bold tracking-widest text-[#8EFF01]">
              OTHER
            </p>
            <button className="flex pt-5 font-semibold text-lg">
              <img src="/assets/icons/moon.svg" alt="moon" />
              <span className="ml-4">Light Mode</span>
            </button>
          </div>
        </div>
        {/* Right Component */}
        <div className="basis-4/5 bg-[#0d0d0d]">
          <div className="flex justify-between p-7">
            <input
              type="text"
              className="bg-[#0C1600] py-3 px-10 w-1/3 rounded-3xl border border-brand-green outline-none"
              placeholder="Search Item, Collection and Account.."
            />
            <div className="flex items-center">
              <button className="bg-[#0C1600] p-3 rounded-3xl mr-4 px-6">
                Collaborator
              </button>
              <div className="w-12 h-12 rounded-full border border-brand-green bg-[#000000] flex justify-center align-center mr-4">
                <img
                  className="w-1/2"
                  src="/assets/icons/notification.svg"
                  alt="notification"
                />
              </div>
              <div className="w-12 h-12 rounded-full bg-primary">
                <img
                  src={avatar ? avatar : '/assets/icons/profile.svg'}
                  alt="profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex mt-12 flex-col items-center sm:flex-row sm:items-start">
            <div className="flex flex-col px-10 gap-20">
              <div className="basis-3/5 flex justify-center align-center mb-16">
                {superUsername && (
                  <div className="w-[716px] h-[354px] flex flex-col justify-between bg-header py-11 px-14">
                    <h1 className="text-primary text-5xl font-bold">
                      Your community has been{' '}
                      <span className="text-accent">successfully created!</span>
                    </h1>
                    <h5 className="text-2xl font-bold mt-20">
                      You have been{' '}
                      <span className="text-accent">directly added</span> to the
                      group. If not check DM form{' '}
                      <span className="text-accent">community_haus</span>.
                    </h5>
                    <div className="flex flex-col px-14 mt-5">
                      <p className="mt-10">
                        Here is the link you can share with your collectors.
                      </p>
                      <div className="px-5 py-3 mt-3 w-full bg-tertiary rounded-2xl flex justify-between">
                        <div>{`community.haus/communities/${superUsername}`}</div>
                        <Image
                          src="/assets/icons/copy.svg"
                          alt="copy"
                          width={20}
                          height={20}
                          className="cursor-pointer"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `community.haus/communities/${superUsername}`
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col p-5 bg-tertiary rounded-2xl">
                <h4 className="text-base font-semibold leading-6 text-white">
                  Members List
                </h4>
                {Object.keys(users).map((key) => {
                  return (
                    <div key={key} className="pt-4">
                      <div className="flex flex-row w-full items-center justify-between">
                        <h5 className="text-sm font-semibold leading-6 text-white">
                          {' '}
                          {key}
                        </h5>
                        <button
                          className="text-sm text-accent ml-2"
                          onClick={async () => {
                            setIsKickingAll(true);
                            const members = telegramMembers[key];
                            const ineligibleMembers = members.filter(
                              (member) => !users[key].includes(member)
                            );
                            try {
                              for (
                                let i = 0;
                                i < ineligibleMembers.length;
                                i++
                              ) {
                                if (ineligibleMembers[i] === 'community_haus')
                                  continue;
                                await fetch('/api/kick', {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json',
                                  },
                                  body: JSON.stringify({
                                    chatID: chatIDs[key],
                                    telegramUserID: ineligibleMembers[i],
                                    isSuperGroup: isSuperGroup[key],
                                    isChannel: isChannel[key],
                                  }),
                                });
                                await new Promise((resolve) =>
                                  setTimeout(resolve, 100)
                                );
                              }
                            } catch (error) {
                              console.log(error);
                            }
                            setIsKickingAll(false);
                            setKickedAll(true);
                          }}
                        >
                          {kickedAll
                            ? 'Kicked All'
                            : isKickingAll
                              ? 'Kicking All'
                              : 'Kick All'}
                        </button>
                      </div>
                      {telegramMembers[key].map((member) => {
                        if (member === 'community_haus') return null;
                        const isEligible = users[key].includes(member);
                        return (
                          <div
                            key={member}
                            className="flex flex-row w-full items-center justify-between"
                          >
                            <div className="flex items-center">
                              <p className="text-sm text-white ">
                                {`${member}`}
                              </p>
                              {isEligible ? (
                                <p className="text-xs text-accent ml-2">
                                  {`(Eligible)`}
                                </p>
                              ) : (
                                <p className="text-xs text-secondary ml-2">
                                  {`(Not Eligible)`}
                                </p>
                              )}
                            </div>
                            {member !== creatorTelegramId[key] && (
                              <div>
                                <KickButton
                                  chatID={chatIDs[key]}
                                  telegramUserID={member}
                                  isSuperGroup={isSuperGroup[key]}
                                  isChannel={isChannel[key]}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="basis-2/5">
              <div className="grid grid-cols-2 gap-10		">
                <DashboardBlockCard />
                <DashboardBlockCard />
                <DashboardBlockCard />
                <DashboardBlockCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
