export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userAddress = searchParams.get('userAddress');
  const mintAddress = searchParams.get('mintAddress');

  try {
    if (userAddress) {
      try {
        const options = {
          method: 'GET',
          headers: { accept: 'application/json' },
        };

        const response = await fetch(
          `https://api-mainnet.magiceden.dev/v2/wallets/${userAddress}/tokens?limit=500`,
          options
        );
        const nfts = await response.json();
        const nft = nfts.find((nft: any) => nft.mintAddress === mintAddress);
        const attributes = nft.attributes;
        return Response.json({
          attributes,
        });
      } catch (error) {
        console.log(error);
      }
    }
    return Response.json({
      message: 'GET ENDPOINT WORKS!',
    });
  } catch (error) {
    return Response.json({
      error: error,
    });
  }
}
