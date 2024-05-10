import { mongoClient } from '@/utils/mongodb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return Response.json({
      message: 'Please provide username as query parameter.',
    });
  }

  if (username) {
    await mongoClient.connect();

    const database = mongoClient.db('community_haus');
    const collection = database.collection('creater_groups');

    const alreadyExists = await collection.findOne({ username: username });
    if (alreadyExists) {
      return Response.json({
        message: 'Username should be unique',
        alredyExists: true,
      });
    }

    return Response.json({
      message: 'Username is unique',
      alredyExists: false,
    });
  }
}
