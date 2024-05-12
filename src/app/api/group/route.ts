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
    chatID,
    isSuperGroup,
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

  await mongoClient.connect();

  const database = mongoClient.db('community_haus');
  const collection = database.collection('creater_groups');

  const alreadyExists = await collection.findOne({ username: creatorUsername });
  if (alreadyExists) {
    return Response.json({
      message: 'Username should be unique',
    });
  }

  const creatorChannelInfo = {
    username: creatorUsername,
    telegramID: creatorTelegramID,
    communityName,
    communityDescription,
    chatID,
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
    isSuperGroup,
  };

  await collection.insertOne(creatorChannelInfo);

  return Response.json({
    message: 'Group created',
    data: creatorChannelInfo,
  });
}
