import { User } from '@prisma/client';
import prisma from '../client';
import { io } from '../socketServer';
import { EVENTS } from './socket';
import { incrementNotification } from '../controllers/notificationController';

export const sendNotification = (user: User, notification: object): void => {
  io.to(user.userName).emit(EVENTS.SERVER.NOTIFICATION, notification);
  io.to(user.userName).emit(
    EVENTS.SERVER.NOTIFICATION_COUNT,
    user.notificationCount ? user.notificationCount + 1 : 1,
  );
  incrementNotification(user.userName);
};

// This is for the blue icon on the home page in Twitter
export const newTweetNotification = (): void => {
  io.to('ALL').emit(EVENTS.SERVER.FEED, {
    message: 'newTweet',
  });
};
export const sendUnseenConversationCount = (
  userName: string,
  newCount: number,
): void => {
  io.to(userName).emit(EVENTS.SERVER.UNREAD_CONVERSATIONS, newCount);
};

// Sends update to all the people in the conversation in the page of the conversations
export const sendConversationUpdate = async (
  userName: string,
  lastMessage: any,
  conversationId: string,
) => {
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
    },
    include: {
      UserConversations: {
        select: {
          User: {
            select: {
              userName: true,
              name: true,
              profileImageUrl: true,
            },
          },
          dateJoined: true,
        },
      },
    },
  });
  let users = conversation?.UserConversations.map((el) => {
    return el.User;
  });
  users = users?.filter((user) => user.userName !== userName);
  const usersCount = users ? users.length : 0;
  let newName, newFullName;

  if (conversation?.name) {
    newName = conversation.name;
    newFullName = conversation.name;
  } else {
    newName =
      users
        ?.slice(0, 3)
        .map((user: any) => user.name)
        .join(', ') +
      `${usersCount - 3 > 0 ? ` and ${usersCount - 3} and more` : ''}`;
    newFullName = users?.map((user) => user.name).join(', ');
  }
  const formattedConversationDetails = {
    id: conversation?.id,
    name: newName,
    fullName: newFullName,
    isGroup: conversation?.isGroup,
    photo: conversation?.photo,
    users: users,
    dateJoined: conversation?.isGroup
      ? conversation?.UserConversations.find((u) => u.User.userName == userName)
          ?.dateJoined
      : '',
    seen: true,
  };
  if (conversation) {
    for (const user of conversation.UserConversations) {
      const currentUsername = user.User.userName;
      io.to(currentUsername).emit(EVENTS.SERVER.CONVERSATION, {
        ...formattedConversationDetails,
        lastMessage,
      });
    }
  }
};
