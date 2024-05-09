import { Api } from 'telegram';
import { telegramClient } from '@/utils/telegram';
import BigNumber from 'big-integer';

export async function POST(request: Request) {
  let { chatID, telegramUserID } = await request.json();

  await telegramClient.start({
    phoneNumber: '',
    password: async () => '',
    phoneCode: async () => '',
    onError: (err) => console.log(err),
  });

  await telegramClient.invoke(
    new Api.messages.DeleteChatUser({
      chatId: BigNumber(chatID),
      userId: telegramUserID,
      revokeHistory: true,
    })
  );

  return Response.json({
    message: 'Kicked user',
    data: {
      chatID,
      telegramUserID,
    },
  });
}
