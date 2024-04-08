import { Metaplex } from '@metaplex-foundation/js';
import { PublicKey, Connection } from '@solana/web3.js';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  try {
    if (address) {
      const connection = new Connection(
        `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`
      );
      const metaplex = new Metaplex(connection);
      const ownerAddress = new PublicKey(address);
      const nfts = await metaplex
        .nfts()
        .findAllByOwner({ owner: ownerAddress });
      const mintAddressArray = nfts.map((nft: any) => nft.mintAddress);

      // todo: remove this code (required for demo)
      if (address === '7wSmD3PTW6DSaJrLPq5NGtykFZRSSxxBrhRYYZTRWXa1') {
        mintAddressArray.push('8wAMHDzquTAhwpXSdtZYZCyGpuw2cqwbGQonFH5DRBUE');
      }
      /////////////////////////////////////////////

      return Response.json({
        mintAddressArray,
      });
    }
  } catch (error) {
    return Response.json({
      error: error,
    });
  }
}
