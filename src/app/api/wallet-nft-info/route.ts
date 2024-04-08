import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {
  mplTokenMetadata,
  fetchDigitalAsset,
  fetchMetadata,
  fetchJsonMetadata,
} from '@metaplex-foundation/mpl-token-metadata';
import { publicKey } from '@metaplex-foundation/umi-public-keys';
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');
  const mintAddress = searchParams.get('mintAddress');

  if (!address || !mintAddress) {
    return Response.json({
      error: 'Missing required parameters',
    });
  }

  try {
    const umi = createUmi(
      `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`
    ).use(dasApi());
    const owner = publicKey(address);

    const rpcAssetList = await umi.rpc.getAssetsByOwner({ owner });
    const nfts = rpcAssetList.items;
    const matchedNft = nfts.filter(
      (nft) => nft?.grouping[0]?.group_value === mintAddress
    );
    const totalCount = matchedNft.length;
    const rarityTypes = ['Rarity', 'Drop'];
    const filterRarityBased = matchedNft.filter((nft) => {
      const attributes = nft.content.metadata.attributes;
      if (attributes)
        return attributes.some((attribute) =>
          rarityTypes.includes(attribute.trait_type!)
        );
    });
    let criteriaBasedCount: { [criteria: string]: number } = {};
    filterRarityBased.forEach((nft) => {
      const attributes = nft.content.metadata.attributes;
      if (attributes)
        attributes.forEach((attribute) => {
          if (rarityTypes.includes(attribute.trait_type!)) {
            if (!criteriaBasedCount[attribute.value!]) {
              criteriaBasedCount[attribute.value!] = 1;
            } else {
              criteriaBasedCount[attribute.value!] += 1;
            }
          }
        });
    });

    return Response.json({
      totalCount,
      criteriaBasedCount,
    });
  } catch (error) {
    return Response.json({
      error: error,
    });
  }
}
