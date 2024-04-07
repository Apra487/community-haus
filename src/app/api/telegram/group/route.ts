import { Api } from 'telegram';
import { telegramClient } from '@/utils/telegram';
import { mongoClient } from '@/utils/mongodb';

export async function POST(request: Request) {
  let {
    creatorUsername,
    creatorTelegramID,
    communityName,
    communityDescription,
    commonCriteria,
    rareCriteria,
    legendaryCriteria,
    ultimateCriteria,
    droplets,
    dropsNumber,
    twitterURL,
    contractAddress,
  } = await request.json();

  if (!commonCriteria) {
    commonCriteria = "0";
  }
  if (!rareCriteria) {
    rareCriteria = "0";
  }
  if (!legendaryCriteria) {
    legendaryCriteria = "0";
  }
  if (!ultimateCriteria) {
    ultimateCriteria = "0";
  }
  if (!droplets) {
    droplets = "0";
  }
  if (!dropsNumber) {
    dropsNumber = "0";
  }

  await telegramClient.start({
    phoneNumber: '',
    password: async () => '',
    phoneCode: async () => '',
    onError: (err) => console.log(err),
  });
  await mongoClient.connect();

  const chatInfo = {
    users: [creatorTelegramID],
    title: communityName,
  };

  const result = <any>(
    await telegramClient.invoke(new Api.messages.CreateChat(chatInfo))
  );

  const chatID = result.chats.find((chat: any) => chat.className === 'Chat').id;

  const database = mongoClient.db('community_haus');
  const collection = database.collection('creater_groups');

  const creatorChannelInfo = {
    username: creatorUsername,
    telegramID: creatorTelegramID,
    communityName,
    communityDescription,
    chatID: chatID.value.toString(),
    users: [creatorTelegramID],
    criteria: {
      common: commonCriteria,
      rate: rareCriteria,
      legendary: legendaryCriteria,
      ultimate: ultimateCriteria,
      droplets,
      dropsNumber,
    },
    twitterURL,
    contractAddress,
  };

  await collection.insertOne(creatorChannelInfo);

  return Response.json({
    message: 'Group created',
    data: creatorChannelInfo,
  });
}
