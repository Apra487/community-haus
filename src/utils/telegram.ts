import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';

export const STRING_SESSION = new StringSession(process.env.STRING_SESSION);
export const API_ID = +`${process.env.API_ID}`;
export const API_HASH = `${process.env.API_HASH}`;

export const telegramClient = new TelegramClient(
  STRING_SESSION,
  API_ID,
  API_HASH,
  {
    connectionRetries: 5,
  }
);
