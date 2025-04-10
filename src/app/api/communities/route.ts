import { mongoClient } from '@/utils/mongodb';

export const maxDuration = 60;

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
    const avatarCollection = database.collection('avatar');

    const usernameTags = [
      'Common',
      'Rare',
      'Legendary',
      'Ultimate',
      'Droplets',
      'General',
      'CommonRare',
      'CommonLegendary',
      'CommonUltimate',
      'RareLegendary',
      'RareUltimate',
      'RareCommon',
      'LegendaryUltimate',
      'LegendaryCommon',
      'LegendaryRare',
      'UltimateCommon',
      'UltimateRare',
      'UltimateLegendary',
      'CommonRareLegendary',
      'CommonRareUltimate',
      'CommonLegendaryUltimate',
      'CommonLegendaryRare',
      'CommonUltimateRare',
      'CommonUltimateLegendary',
      'RareLegendaryUltimate',
      'RareLegendaryCommon',
      'RareUltimateCommon',
      'RareUltimateLegendary',
      'RareCommonLegendary',
      'RareCommonUltimate',
      'LegendaryUltimateCommon',
      'LegendaryUltimateRare',
      'LegendaryCommonRare',
      'LegendaryCommonUltimate',
      'LegendaryRareUltimate',
      'LegendaryRareCommon',
      'UltimateCommonRare',
      'UltimateCommonLegendary',
      'UltimateRareLegendary',
      'UltimateRareCommon',
      'UltimateLegendaryCommon',
      'UltimateLegendaryRare',
    ];

    const documents = [];
    for (const tag of usernameTags) {
      const document = (await collection.findOne({
        username: `${superUsername}-${tag}`,
      })) as any;

      const avatarData = await avatarCollection.findOne({
        username: `${superUsername}-${tag}`,
      });

      if (document && avatarData) {
        document.avatar = avatarData.url;
      }

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
