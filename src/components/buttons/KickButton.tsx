import React, { FC, useState, useCallback } from 'react';

interface Props {
  chatID: string;
  telegramUserID: string;
}

const KickButton: FC<Props> = ({ chatID, telegramUserID }) => {
  const [isKicking, setIsKicking] = useState(false);
  const [kicked, setKicked] = useState(false);

  const handleKickUser = useCallback(
    async (chatID: string, telegramUserID: string) => {
      setIsKicking(true);
      const response = await fetch('/api/kick', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatID,
          telegramUserID,
        }),
      });
      const data = await response.json();
      if (data.message === 'Kicked user') {
        setKicked(true);
      }
      setIsKicking(false);
    },
    []
  );

  return (
    <button
      className="text-sm text-accent ml-2"
      onClick={() => handleKickUser(chatID, telegramUserID)}
    >
      {kicked ? 'Kicked' : isKicking ? 'Kicking' : 'Kick'}
    </button>
  );
};

export default KickButton;
