import { Api } from 'telegram';
import { telegramClient } from '@/utils/telegram';
import { mongoClient } from '@/utils/mongodb';

export async function POST(request: Request) {
  const { chatID, userID } = await request.json();

  await telegramClient.start({
    phoneNumber: '',
    password: async () => '',
    phoneCode: async () => '',
    onError: (err) => console.log(err),
  });

  await mongoClient.connect();

  const database = mongoClient.db('community_haus');
  const collection = database.collection('creater_groups');

  const query = { chatID };
  const document = await collection.findOne(query);

  if (document) {
    document.users.push(userID);
    await collection.replaceOne(query, document);
  }

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
