import { mongoClient } from '@/utils/mongodb';

export async function GET(request: Request) {
  // get request params
  const { searchParams } = new URL(request.url);
  const contractAdress = searchParams.get('contractAdress');

  await mongoClient.connect();
  const database = mongoClient.db('community_haus');
  const collection = database.collection('creater_groups');

  const document = await collection.findOne({
    contractAddress: contractAdress,
  });

  return Response.json({
    document,
  });
}
