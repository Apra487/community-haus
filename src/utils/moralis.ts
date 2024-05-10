import Moralis from 'moralis';

let moralisInstance: typeof Moralis;

export const connectMoralis = async () => {
  try {
    if (!Moralis.Core.isStarted) {
      await Moralis.start({
        apiKey: process.env.MORALIS_API_KEY,
      });

      moralisInstance = Moralis;
    }

    return moralisInstance;
  } catch (e) {
    const err = e as Error;
    console.log('Failed to connect moralis');
    console.log(err.message);
    throw new Error(err.message);
  }
};
