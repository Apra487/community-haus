import { Api } from 'telegram';
import { telegramClient } from '@/utils/telegram';
import { mongoClient } from '@/utils/mongodb';

export async function POST(request: Request) {
  const { chatID, userID, isSuperGroup } = await request.json();

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

  const inviteInfo = {
    chatId: chatID,
    userId: userID,
    fwdLimit: 43,
  };

  if (isSuperGroup) {
    try {
      await telegramClient.invoke(
        new Api.channels.InviteToChannel({
          channel: chatID,
          users: [userID],
        })
      );
    } catch (error) {
      const getFullChanel = await telegramClient.invoke(
        new Api.channels.GetFullChannel({
          channel: chatID,
        })
      );
      console.log(getFullChanel);
      const inviteLink = (getFullChanel as any).fullChat.exportedInvite.link;
      await telegramClient.sendMessage(userID, {
        message: inviteLink,
      });
    }
  } else {
    await telegramClient.invoke(new Api.messages.AddChatUser(inviteInfo));
  }

  if (document) {
    document.users.push(userID);
    await collection.replaceOne(query, document);
  }

  return Response.json({
    message: 'User invited',
    data: inviteInfo,
  });
}
