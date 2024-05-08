import { mongoClient } from '@/utils/mongodb';

export async function POST(request: Request) {
  console.log(request);

  let { dripUsername, xUrl, email } = await request.json();

  if (!dripUsername) {
    return Response.json({
      message: 'Drip username is required',
    });
  }
  if (!xUrl) {
    return Response.json({
      message: 'X url is required',
    });
  }
  if (!email) {
    return Response.json({
      message: 'email is required',
    });
  }

  await mongoClient.connect();

  const database = mongoClient.db('community_haus');
  const collection = database.collection('waitlist');

  const alreadyExists = await collection.findOne({ dripUsername });
  if (alreadyExists) {
    return Response.json({
      message: 'You are already on waiting list',
    });
  }

  const waitlistInfo = {
    dripUsername: dripUsername,
    xUrl: xUrl,
    email: email,
  };

  await collection.insertOne(waitlistInfo);

  return Response.json({
    message: 'Added to waitlist successfully!',
    data: waitlistInfo,
  });
}
