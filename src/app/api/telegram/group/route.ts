import { Api } from 'telegram';
import { telegramClient } from '@/utils/telegram';
import { mongoClient } from '@/utils/mongodb';

export async function POST(request: Request) {
  const { groupName, creatorTelegramID } = await request.json();

  await telegramClient.start({
    phoneNumber: '',
    password: async () => '',
    phoneCode: async () => '',
    onError: (err) => console.log(err),
  });

  await mongoClient.connect();
  

  const chatInfo = {
    title: groupName,
    users: [creatorTelegramID],
  };

  const result = <any>(
    await telegramClient.invoke(new Api.messages.CreateChat(chatInfo))
  );

  const chatID = result.chats.find((chat: any) => chat.className === 'Chat').id;

  const database = mongoClient.db('community_haus');
  const collection = database.collection('creater_groups');
  await collection.insertOne({
    chatID: chatID.value.toString(),
    title: groupName,
    users: [creatorTelegramID],
  });

  return Response.json({
    message: 'Group created',
    data: { chatID, ...chatInfo },
  });
}
