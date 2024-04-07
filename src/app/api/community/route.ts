import { mongoClient } from '@/utils/mongodb';

export async function GET(request: Request) {

  // get request params
  const {searchParams} = new URL(request.url);
  const contractAdress = searchParams.get("contractAdress");
  console.log(contractAdress);



  await mongoClient.connect();
  const database = mongoClient.db('community_haus');
  const collection = database.collection('creater_groups');

  const query = { contractAddress: contractAdress };
  const document = await collection.findOne({ contractAddress: contractAdress });
  console.log(document);


  return Response.json({
    document
  });
}
