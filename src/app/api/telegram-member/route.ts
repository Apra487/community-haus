import { Api } from 'telegram';
import { telegramClient } from '@/utils/telegram';
import BigNumber from 'big-integer';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chatID = searchParams.get('chatID');

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

  const fullChat = await telegramClient.invoke(
    new Api.messages.GetFullChat({
      chatId: BigNumber(chatID),
    })
  );

  return Response.json({
    message: 'User list',
    data: fullChat.users.map((user) => (user as any).username),
  });
}
