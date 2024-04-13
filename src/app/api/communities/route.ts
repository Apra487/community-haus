import { mongoClient } from '@/utils/mongodb';

export async function GET(request: Request) {
  // get request params
  const { searchParams } = new URL(request.url);
  const superUsername = searchParams.get('superUsername');

  if (!superUsername) {
    return Response.json({
      message: 'Please provide super username as query parameter.',
    });
  }

  if (superUsername) {
    await mongoClient.connect();
    const database = mongoClient.db('community_haus');
    const collection = database.collection('creater_groups');
    console.log(collection);
    const usernameTags = [
      'Common',
      'Rare',
      'Legendary',
      'Ultimate',
      'Droplets',
      'General',
    ];

    const documents = [];
    for (const tag of usernameTags) {
      const document = await collection.findOne({
        username: `${superUsername}-${tag}`,
      });
      if (document) documents.push(document);
    }
    return Response.json({
      documents,
    });
  }

  return Response.json({
    message: 'GET ENDPOINT WORKS!',
  });
}
