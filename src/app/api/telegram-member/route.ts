import { Api } from 'telegram';
import { telegramClient } from '@/utils/telegram';
import BigNumber from 'big-integer';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chatID = searchParams.get('chatID');
  const isSuperGroup = searchParams.get('isSuperGroup');
  const isChannel = searchParams.get('isChannel');

  if (!chatID) {
    return Response.json({
      message: 'Chat id not found',
    });
  }

  await telegramClient.start({
    phoneNumber: '',
    password: async () => '',
    phoneCode: async () => '',
    onError: (err) => console.log(err),
  });

  if (isSuperGroup === 'true' || isChannel === 'true') {
    const channelParticipants = await telegramClient.invoke(
      new Api.channels.GetParticipants({
        channel: chatID,
        filter: new Api.ChannelParticipantsRecent(),
        offset: 0,
        limit: 1000,
        hash: BigNumber('-7429031120535214903'),
      })
    );

    const participantsArray = [];
    for (const participant of (channelParticipants as any).participants) {
      const userObj = await telegramClient.getEntity(participant.userId);
      participantsArray.push((userObj as any).username);
    }
    return Response.json({
      message: 'User list',
      data: participantsArray,
    });
  }

  const fullChat = await telegramClient.invoke(
    new Api.messages.GetFullChat({
      chatId: BigNumber(chatID),
    })
  );
  return Response.json({
    message: 'User list',
    data: (fullChat as any).users.map((user: any) => user.username),
  });
}
