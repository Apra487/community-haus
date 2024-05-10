import { mongoClient } from '@/utils/mongodb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const superUsername = searchParams.get('superUsername');

  if (!superUsername) {
    return Response.json({
      message: 'Please provide username as query parameter.',
    });
  }

  if (superUsername) {
    await mongoClient.connect();

    const database = mongoClient.db('community_haus');
    const collection = database.collection('creater_groups');

    const usernameTags = [
      'Common',
      'Rare',
      'Legendary',
      'Ultimate',
      'Droplets',
      'General',
    ];

    for (const tag of usernameTags) {
      const alreadyExists = (await collection.findOne({
        username: `${superUsername}-${tag}`,
      })) as any;
      if (alreadyExists) {
        return Response.json({
          message: 'Super username should be unique',
          alredyExists: true,
        });
      }
    }

    return Response.json({
      message: 'Super username is unique',
      alredyExists: false,
    });
  }
}
