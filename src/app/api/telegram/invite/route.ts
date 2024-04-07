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

  // console.log(result);
  // result?.users.push(userID);
  // await result?.save();

  if (document) {
    // Modify the document
    document.users.push(userID);

    // Update the document in the database
    await collection.replaceOne(query, document);

    console.log('Document updated successfully');
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
