import { Api } from 'telegram';
import { telegramClient } from '@/utils/telegram';

export async function POST(request: Request) {
  let { chatID, topicName } = await request.json();

  if (!chatID) {
    return Response.json({
      message: 'Chat ID is required',
    });
  }
  if (!topicName) {
    return Response.json({
      message: 'Topic name is required',
    });
  }

  await telegramClient.start({
    phoneNumber: '',
    password: async () => '',
    phoneCode: async () => '',
    onError: (err) => console.log(err),
  });

  const createTopic = await telegramClient.invoke(
    new Api.channels.CreateForumTopic({
      channel: chatID,
      title: topicName,
    })
  );

  return Response.json({
    message: 'Topic Created',
    createTopic,
  });
}
