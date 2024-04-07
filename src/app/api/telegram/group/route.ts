import { Api } from 'telegram';
import { telegramClient } from '@/utils/telegram';

export async function POST(request: Request) {
  const { groupName, creatorTelegramID } = await request.json();

  await telegramClient.start({
    phoneNumber: '',
    password: async () => '',
    phoneCode: async () => '',
    onError: (err) => console.log(err),
  });

  const chatInfo = {
    title: groupName,
    users: [creatorTelegramID],
  };

  const result = <any>(
    await telegramClient.invoke(new Api.messages.CreateChat(chatInfo))
  );

  const chatID = result.chats.find((chat: any) => chat.className === 'Chat').id;

  return Response.json({
    message: 'Group created',
    data: { chatID, ...chatInfo },
  });
}
