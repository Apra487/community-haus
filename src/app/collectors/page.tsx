import { ConnectButton } from '@/components/buttons';
import { Metaplex } from '@metaplex-foundation/js';
import { useEffect } from 'react';
import { PublicKey, Connection } from '@solana/web3.js';

import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {
  mplTokenMetadata,
  fetchDigitalAsset,
  fetchMetadata,
  fetchJsonMetadata,
} from '@metaplex-foundation/mpl-token-metadata';
import { publicKey } from '@metaplex-foundation/umi-public-keys';

const getNftData = async () => {
  const connection = new Connection(
    `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`
  );
  const umi = createUmi(
    `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`
  ).use(mplTokenMetadata());
  const metaplex = new Metaplex(connection);

  // const mintAddress = new PublicKey(
  //   '8GqDCawh25igLzRF8o77sevix3VLnqBvWxhcJWh6E2bX'
  // );
  // metaplex
  //   .nfts()
  //   .findByMint({ mintAddress: mintAddress })
  //   .then((nfts) => {
  //     console.log(nfts);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // const umiPublicKey = publicKey(
  //   '8GqDCawh25igLzRF8o77sevix3VLnqBvWxhcJWh6E2bX'
  // );
  // fetchDigitalAsset(umi, umiPublicKey).then((digitalAsset) => {
  //   console.log(digitalAsset);
  // });
  // const metadataPublicKey = publicKey(
  //   '3ouMw4NcDDSHq4tmApJnC5YL8aDR3mSqvvok6ekwZEvp'
  // );
  // fetchMetadata(umi, metadataPublicKey).then((metadata) => {
  //   console.log(metadata);
  // });
  // fetchJsonMetadata(
  //   umi,
  //   'https://arweave.net/YZv_34JAzpmLiV9CEy2-MlF_xFYiNXSHsUp1DedQxCA'
  // ).then((jsonMetadata) => {
  //   console.log(jsonMetadata);
  // });
};

export default async function Home() {
  await getNftData();
  // useEffect(() => {
  // const mintAddress = new PublicKey(
  //   '8GqDCawh25igLzRF8o77sevix3VLnqBvWxhcJWh6E2bX'
  // );
  // metaplex
  //   .nfts()
  //   .findByMint({ mintAddress: mintAddress })
  //   .then((nfts) => {
  //     console.log(nfts);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // const umiPublicKey = publicKey(
  //   '8GqDCawh25igLzRF8o77sevix3VLnqBvWxhcJWh6E2bX'
  // );
  // fetchDigitalAsset(umi, umiPublicKey).then((digitalAsset) => {
  //   console.log(digitalAsset);
  // });
  // const metadataPublicKey = publicKey(
  //   '3ouMw4NcDDSHq4tmApJnC5YL8aDR3mSqvvok6ekwZEvp'
  // );
  // fetchMetadata(umi, metadataPublicKey).then((metadata) => {
  //   console.log(metadata);
  // });
  // fetchJsonMetadata(
  //   umi,
  //   'https://arweave.net/YZv_34JAzpmLiV9CEy2-MlF_xFYiNXSHsUp1DedQxCA'
  // ).then((jsonMetadata) => {
  //   console.log(jsonMetadata);
  // });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <main className="flex flex-col justify-center mt-10">
      <h1>check your eligibility to join x person community</h1>
      <ConnectButton />
    </main>
  );
}
