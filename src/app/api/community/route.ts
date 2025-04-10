import { mongoClient } from '@/utils/mongodb';

export async function GET(request: Request) {
  // get request params
  const { searchParams } = new URL(request.url);
  const contractAddress = searchParams.get('contractAddress');
  const username = searchParams.get('username');

  // if nothing is provided, return say provide username or contract address
  if (!username && !contractAddress) {
    return Response.json({
      message:
        'Please provide a username or contractAddress as query parameter.',
    });
  }

  if (username) {
    await mongoClient.connect();
    const database = mongoClient.db('community_haus');
    const collection = database.collection('creater_groups');
    const avatarCollection = database.collection('avatar');

    const document = await collection.findOne({
      username: username,
    });

    const avatarData = await avatarCollection.findOne({
      username: username,
    });

    if (document && avatarData) {
      document.avatar = avatarData.url;
    }

    return Response.json({
      document,
    });
  }
  if (contractAddress) {
    await mongoClient.connect();
    const database = mongoClient.db('community_haus');
    const collection = database.collection('creater_groups');

    const documents = await collection
      .find({ contractAddress: contractAddress })
      .toArray();

    return Response.json({
      documents,
    });
  }

  return Response.json({
    message: 'GET ENDPOINT WORKS!',
  });
}
