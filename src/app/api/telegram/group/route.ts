import { Api } from 'telegram';
import BigInteger from 'big-integer';
import { telegramClient } from '@/utils/telegram';
import { mongoClient } from '@/utils/mongodb';

export async function POST(request: Request) {
  let {
    creatorUsername,
    creatorTelegramID,
    communityName,
    communityDescription,
    commonCriteria,
    rareCriteria,
    legendaryCriteria,
    ultimateCriteria,
    droplets,
    dropsNumber,
    twitterUrl,
    contractAddress,
    isSuperGroup,
    isChannel,
  } = await request.json();

  if (!creatorUsername) {
    return Response.json({
      message: 'Creator username is required',
    });
  }
  if (!creatorTelegramID) {
    return Response.json({
      message: 'Creator telegram ID is required',
    });
  }
  if (!communityName) {
    return Response.json({
      message: 'Community name is required',
    });
  }
  if (!communityDescription) {
    return Response.json({
      message: 'Community description is required',
    });
  }
  if (!twitterUrl) {
    return Response.json({
      message: 'Twitter URL is required',
    });
  }
  if (!contractAddress) {
    return Response.json({
      message: 'Contract address is required',
    });
  }

  if (!commonCriteria) {
    commonCriteria = -1;
  }
  if (!rareCriteria) {
    rareCriteria = -1;
  }
  if (!legendaryCriteria) {
    legendaryCriteria = -1;
  }
  if (!ultimateCriteria) {
    ultimateCriteria = -1;
  }
  if (!droplets) {
    droplets = -1;
  }
  if (!dropsNumber) {
    dropsNumber = -1;
  }

  const database = mongoClient.db('community_haus');
  const collection = database.collection('creater_groups');

  const alreadyExists = await collection.findOne({ username: creatorUsername });
  if (alreadyExists) {
    return Response.json({
      message: 'Username should be unique',
    });
  }

  await telegramClient.start({
    phoneNumber: '',
    password: async () => '',
    phoneCode: async () => '',
    onError: (err) => console.log(err),
  });
  await mongoClient.connect();

  const chatInfo = {
    users: [creatorTelegramID],
    title: communityName,
  };
  if (isChannel) {
    const channel = await telegramClient.invoke(
      new Api.channels.CreateChannel({
        title: 'forum test channel',
        about: 'some string here',
        broadcast: true,
        forum: true,
      })
    );
    const channelID = (channel as any).updates[1].channelId;
    await telegramClient.invoke(
      new Api.channels.InviteToChannel({
        channel: channelID,
        users: [creatorTelegramID],
      })
    );
    await telegramClient.invoke(
      new Api.channels.EditAdmin({
        channel: channelID,
        userId: creatorTelegramID,
        adminRights: new Api.ChatAdminRights({
          changeInfo: true,
          postMessages: true,
          editMessages: true,
          deleteMessages: true,
          banUsers: true,
          inviteUsers: true,
          pinMessages: true,
          addAdmins: true,
          anonymous: true,
          manageCall: true,
          other: true,
        }),
        rank: 'admin',
      })
    );
    const inviteResponse = await telegramClient.invoke(
      new Api.messages.ExportChatInvite({
        peer: channelID,
        legacyRevokePermanent: true,
        requestNeeded: false,
        title: 'Invite Link',
      })
    );
    const inviteLink = (inviteResponse as any).link;
    await telegramClient.sendMessage(creatorTelegramID, {
      message: inviteLink,
    });
    const creatorChannelInfo = {
      username: creatorUsername,
      telegramID: creatorTelegramID,
      telegramInviteLink: inviteLink,
      communityName,
      communityDescription,
      chatID: `-100${BigInteger(channelID).toString()}`,
      users: [creatorTelegramID],
      criteria: {
        common: parseInt(commonCriteria),
        rate: parseInt(rareCriteria),
        legendary: parseInt(legendaryCriteria),
        ultimate: parseInt(ultimateCriteria),
        droplets: parseInt(droplets),
        dropsNumber: parseInt(dropsNumber),
      },
      twitterUrl,
      contractAddress,
      channel: true,
    };
    await collection.insertOne(creatorChannelInfo);
    return Response.json({
      message: 'Channel created',
      data: creatorChannelInfo,
    });
  } else if (isSuperGroup) {
    const supergroup = await telegramClient.invoke(
      new Api.channels.CreateChannel({
        title: communityName,
        about: communityDescription,
        megagroup: true,
      })
    );
    const channelID = (supergroup as any).updates[1].channelId;
    await telegramClient.invoke(
      new Api.channels.InviteToChannel({
        channel: channelID,
        users: [creatorTelegramID],
      })
    );
    await telegramClient.invoke(
      new Api.channels.EditAdmin({
        channel: channelID,
        userId: creatorTelegramID,
        adminRights: new Api.ChatAdminRights({
          changeInfo: true,
          postMessages: true,
          editMessages: true,
          deleteMessages: true,
          banUsers: true,
          inviteUsers: true,
          pinMessages: true,
          addAdmins: true,
          anonymous: true,
          manageCall: true,
          other: true,
        }),
        rank: 'admin',
      })
    );
    const inviteResponse = await telegramClient.invoke(
      new Api.messages.ExportChatInvite({
        peer: channelID,
        legacyRevokePermanent: true,
        requestNeeded: false,
        title: 'Invite Link',
      })
    );
    const inviteLink = (inviteResponse as any).link;
    await telegramClient.sendMessage(creatorTelegramID, {
      message: inviteLink,
    });
    const creatorChannelInfo = {
      username: creatorUsername,
      telegramID: creatorTelegramID,
      telegramInviteLink: inviteLink,
      communityName,
      communityDescription,
      chatID: `-100${BigInteger(channelID).toString()}`,
      users: [creatorTelegramID],
      criteria: {
        common: parseInt(commonCriteria),
        rate: parseInt(rareCriteria),
        legendary: parseInt(legendaryCriteria),
        ultimate: parseInt(ultimateCriteria),
        droplets: parseInt(droplets),
        dropsNumber: parseInt(dropsNumber),
      },
      twitterUrl,
      contractAddress,
      supergroup: true,
    };
    await collection.insertOne(creatorChannelInfo);
    return Response.json({
      message: 'Supergroup created',
      data: creatorChannelInfo,
    });
  } else {
    const result = <any>(
      await telegramClient.invoke(new Api.messages.CreateChat(chatInfo))
    );

    const chatID = result.chats.find(
      (chat: any) => chat.className === 'Chat'
    ).id;

    await telegramClient.invoke(
      new Api.messages.EditChatAdmin({
        chatId: chatID,
        userId: creatorTelegramID,
        isAdmin: true,
      })
    );

    const inviteResponse = await telegramClient.invoke(
      new Api.messages.ExportChatInvite({
        peer: BigInteger(chatID),
        legacyRevokePermanent: true,
        requestNeeded: false,
        title: 'Invite Link',
      })
    );

    const inviteLink = (inviteResponse as any).link;

    await telegramClient.sendMessage(creatorTelegramID, {
      message: inviteLink,
    });

    const creatorChannelInfo = {
      username: creatorUsername,
      telegramID: creatorTelegramID,
      telegramInviteLink: inviteLink,
      communityName,
      communityDescription,
      chatID: chatID.value.toString(),
      users: [creatorTelegramID],
      criteria: {
        common: parseInt(commonCriteria),
        rate: parseInt(rareCriteria),
        legendary: parseInt(legendaryCriteria),
        ultimate: parseInt(ultimateCriteria),
        droplets: parseInt(droplets),
        dropsNumber: parseInt(dropsNumber),
      },
      twitterUrl,
      contractAddress,
    };

    await collection.insertOne(creatorChannelInfo);

    return Response.json({
      message: 'Group created',
      data: creatorChannelInfo,
    });
  }
}
