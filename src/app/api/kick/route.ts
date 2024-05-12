import { Api } from 'telegram';
import { telegramClient } from '@/utils/telegram';
import BigNumber from 'big-integer';

export async function POST(request: Request) {
  let { chatID, telegramUserID, isSuperGroup } = await request.json();

  await telegramClient.start({
    phoneNumber: '',
    password: async () => '',
    phoneCode: async () => '',
    onError: (err) => console.log(err),
  });

  if (isSuperGroup) {
    await telegramClient.invoke(
      new Api.channels.EditBanned({
        channel: chatID,
        participant: telegramUserID,
        bannedRights: new Api.ChatBannedRights({
          untilDate: 43,
          viewMessages: true,
          sendMessages: true,
          sendMedia: true,
          sendStickers: true,
          sendGifs: true,
          sendGames: true,
          sendInline: true,
          sendPolls: true,
          changeInfo: true,
          inviteUsers: true,
          pinMessages: true,
        }),
      })
    );
  } else {
    await telegramClient.invoke(
      new Api.messages.DeleteChatUser({
        chatId: BigNumber(chatID),
        userId: telegramUserID,
        revokeHistory: true,
      })
    );
  }

  return Response.json({
    message: 'Kicked user',
    data: {
      chatID,
      telegramUserID,
    },
  });
}
