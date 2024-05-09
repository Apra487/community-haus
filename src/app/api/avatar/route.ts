import Moralis from 'moralis';

import { mongoClient } from '@/utils/mongodb';

export const POST = async (req: Request) => {
  const formData = await req.formData();

  const username = formData.get('username') as string;
  if (!username) {
    return Response.json({
      message: 'No username found.',
    });
  }

  const file = formData.get('avatar') as File;
  if (!file) {
    return Response.json({
      message: 'No avatar uploaded.',
    });
  }

  await mongoClient.connect();

  const database = mongoClient.db('community_haus');
  const createrGroupCollection = database.collection('creater_groups');
  const avatarCollection = database.collection('avatar');

  const usernameExits = await createrGroupCollection.findOne({
    username,
  });
  if (!usernameExits) {
    return Response.json({
      message: 'Username not registered',
    });
  }

  const avatarExits = await avatarCollection.findOne({
    username,
  });
  if (avatarExits) {
    return Response.json({
      message: 'Avatar already exits',
    });
  }

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  const uniqueImageName =
    Date.now() + '-' + Math.round(Math.random() * 1e9) + '-' + username;

  const data = (await file.arrayBuffer()) as Buffer;
  const imageData = Buffer.from(data).toString('base64');

  const imageABI = [
    {
      path: `community-haus/${uniqueImageName}`,
      content: imageData,
    },
  ];

  const response = await Moralis.EvmApi.ipfs.uploadFolder({
    abi: imageABI,
  });

  const [uploadData] = response.result;

  const avatarData = {
    username,
    url: uploadData.path,
  };

  await avatarCollection.insertOne(avatarData);

  return Response.json({
    message: 'Avatar uploaded.',
    data: avatarData,
  });
};
