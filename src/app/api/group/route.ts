import { mongoClient } from '@/utils/mongodb';

export async function POST(request: Request) {
  console.log(request);

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
    chatID,
  } = await request.json();

  if (!chatID) {
    return Response.json({
      message: 'Chat ID is required',
    });
  }
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
    commonCriteria = '';
  }
  if (!rareCriteria) {
    rareCriteria = '';
  }
  if (!legendaryCriteria) {
    legendaryCriteria = '';
  }
  if (!ultimateCriteria) {
    ultimateCriteria = '';
  }
  if (!droplets) {
    droplets = '';
  }
  if (!dropsNumber) {
    dropsNumber = '';
  }

  await mongoClient.connect();

  const database = mongoClient.db('community_haus');
  const collection = database.collection('creater_groups');

  const creatorChannelInfo = {
    username: creatorUsername,
    telegramID: creatorTelegramID,
    communityName,
    communityDescription,
    chatID,
    users: [creatorTelegramID],
    criteria: {
      common: commonCriteria,
      rate: rareCriteria,
      legendary: legendaryCriteria,
      ultimate: ultimateCriteria,
      droplets,
      dropsNumber,
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
