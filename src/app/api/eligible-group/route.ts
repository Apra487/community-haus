import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { publicKey } from '@metaplex-foundation/umi-public-keys';
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api';

import { mongoClient } from '@/utils/mongodb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return Response.json({
      error: 'Missing required address',
    });
  }

  const umi = createUmi(
    `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`
  ).use(dasApi());
  const owner = publicKey(address);

  const rpcAssetList = await umi.rpc.getAssetsByOwner({ owner });
  const nfts = rpcAssetList.items;

  const nftMintAddresses = nfts.map((nft) => nft?.grouping[0]?.group_value);

  await mongoClient.connect();

  const database = mongoClient.db('community_haus');
  const createrGroupsCollection = database.collection('creater_groups');

  const allGroups = await createrGroupsCollection.find().toArray();

  const eligibleGroups = [];

  for (const group of allGroups) {
    if (
      nftMintAddresses.find(
        (address) =>
          address.toLowerCase() === group.contractAddress.toLowerCase()
      )
    ) {
      eligibleGroups.push(group);
    }
  }

  return Response.json({
    message: 'Found eligible groups',
    eligibleGroups,
  });
}
