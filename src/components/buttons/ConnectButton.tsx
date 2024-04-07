'use client';
import { FC, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

const ConnectButton: FC = () => {
  const { publicKey, select, connect, disconnect, wallets, connected } =
    useWallet();
  const handleConnect = async () => {
    await connect();
  };

  const handleDisconnect = async () => {
    await disconnect();
  };

  useEffect(() => {
    if (!connected) {
      select(wallets[0].adapter.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);

  return (
    <button
      className="btn-secondary mt-5"
      onClick={!connected ? handleConnect : handleDisconnect}
    >
      {!connected ? 'Connect a Wallet' : publicKey?.toBase58()}
    </button>
  );
};

export default ConnectButton;
