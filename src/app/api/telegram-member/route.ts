import { Api } from 'telegram';
import { telegramClient } from '@/utils/telegram';
import BigNumber from 'big-integer';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chatID = searchParams.get('chatID');
  const isSuperGroup = searchParams.get('isSuperGroup');

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

  let fullChat;
  if (isSuperGroup) {
    fullChat = await telegramClient.invoke(
      new Api.channels.GetFullChannel({
        channel: chatID,
      })
    );
  } else {
    fullChat = await telegramClient.invoke(
      new Api.messages.GetFullChat({
        chatId: BigNumber(chatID),
      })
    );
  }

  console.log(fullChat);
  return Response.json({
    message: 'User list',
    data: (fullChat as any).users.map((user: any) => user.username),
  });
}
