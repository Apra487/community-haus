import { Api } from 'telegram';
import { telegramClient } from '@/utils/telegram';

export async function POST(request: Request) {
  const { chatID, userID } = await request.json();

  await telegramClient.start({
    phoneNumber: '',
    password: async () => '',
    phoneCode: async () => '',
    onError: (err) => console.log(err),
  });

  const inviteInfo = {
    chatId: chatID,
    userId: userID,
    fwdLimit: 43,
  };

  await telegramClient.invoke(new Api.messages.AddChatUser(inviteInfo));

  return Response.json({
    message: 'User invited',
    data: inviteInfo,
  });
}
