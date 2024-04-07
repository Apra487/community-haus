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

    const document = await collection.findOne({
      username: username,
    });

    return Response.json({
      document,
    });
  }
  if (contractAddress) {
    await mongoClient.connect();
    const database = mongoClient.db('community_haus');
    const collection = database.collection('creater_groups');

    const document = await collection.findOne({
      contractAddress: contractAddress,
    });

    return Response.json({
      document,
    });
  }

  return Response.json({
    message: 'GET ENDPOINT WORKS!',
  });
}
