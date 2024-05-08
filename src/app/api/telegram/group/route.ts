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
    twitterUrl,
    contractAddress,
  } = await request.json();

  if (!creatorUsername) {
    return Response.json({
      message: 'Creator username is required',
    });
  }
  if (!creatorTelegramID) {
    return Response.json({
      message: 'Creator telegram ID is required',
    });
  }
  if (!communityName) {
    return Response.json({
      message: 'Community name is required',
    });
  }
  if (!communityDescription) {
    return Response.json({
      message: 'Community description is required',
    });
  }
  if (!twitterUrl) {
    return Response.json({
      message: 'Twitter URL is required',
    });
  }
  if (!contractAddress) {
    return Response.json({
      message: 'Contract address is required',
    });
  }

  if (!commonCriteria) {
    commonCriteria = -1;
  }
  if (!rareCriteria) {
    rareCriteria = -1;
  }
  if (!legendaryCriteria) {
    legendaryCriteria = -1;
  }
  if (!ultimateCriteria) {
    ultimateCriteria = -1;
  }
  if (!droplets) {
    droplets = -1;
  }
  if (!dropsNumber) {
    dropsNumber = -1;
  }

  const database = mongoClient.db('community_haus');
  const collection = database.collection('creater_groups');

  const alreadyExists = await collection.findOne({ username: creatorUsername });
  if (alreadyExists) {
    return Response.json({
      message: 'Username should be unique',
    });
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

  const chatID = result.updates.chats.find(
    (chat: any) => chat.className === 'Chat'
  ).id;

  const creatorChannelInfo = {
    username: creatorUsername,
    telegramID: creatorTelegramID,
    communityName,
    communityDescription,
    chatID: chatID.value.toString(),
    users: [creatorTelegramID],
    criteria: {
      common: parseInt(commonCriteria),
      rate: parseInt(rareCriteria),
      legendary: parseInt(legendaryCriteria),
      ultimate: parseInt(ultimateCriteria),
      droplets: parseInt(droplets),
      dropsNumber: parseInt(dropsNumber),
    },
    twitterUrl,
    contractAddress,
  };

  await collection.insertOne(creatorChannelInfo);

  return Response.json({
    message: 'Group created',
    data: creatorChannelInfo,
  });
}
