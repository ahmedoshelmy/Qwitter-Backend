import { User } from '@prisma/client';
import prisma from '../client';
import {
  createEntityMessage,
  createMedia,
  extractEntities,
  getMessageEntities,
} from './entityRepository';

export const searchMember = async (
  query: string,
  skip: number,
  parsedLimit: number,
  conversationId: string,
  requester: User,
) => {
  const words = query.split(' ');
  const users = await prisma.user.findMany({
    where: {
      OR: words.map((word) => ({
        OR: [
          { name: { contains: word, mode: 'insensitive' } },
          { userName: { contains: word, mode: 'insensitive' } },
        ],
      })),
      deletedAt: null,
    },
    select: {
      name: true,
      userName: true,
      profileImageUrl: true,
      follower: { where: { followedId: requester.id } },
      followed: { where: { folowererId: requester.id } },
      UserConversations: { where: { conversationId: conversationId } },
    },
    skip,
    take: parsedLimit,
  });

  const matchCount = users.map((user) => ({
    ...user,
    matchCount: words.reduce(
      (count, word) =>
        count +
        ((user.userName as string).toLowerCase().includes(word.toLowerCase())
          ? 2
          : 0) +
        ((user.name as string).toLowerCase().includes(word.toLowerCase())
          ? 1
          : 0),
      0,
    ),
  }));

  const sortedUsers = matchCount.sort((a, b) => b.matchCount - a.matchCount);
  return sortedUsers.map((el) => {
    const { matchCount, ...rest } = el;
    const user = {
      name: rest.name,
      userName: rest.userName,
      profileImageUrl: rest.profileImageUrl,
      isFollowing: rest.followed && rest.followed.length ? true : false,
      isFollowed: rest.follower && rest.follower.length ? true : false,
      inConversation:
        rest.UserConversations && rest.UserConversations.length ? true : false,
    };
    return user;
  });
};

export const searchMemberForNewConversation = async (
  query: string,
  skip: number,
  parsedLimit: number,
  requester: User,
) => {
  const words = query.split(' ');
  const users = await prisma.user.findMany({
    where: {
      OR: words.map((word) => ({
        OR: [
          { name: { contains: word, mode: 'insensitive' } },
          { userName: { contains: word, mode: 'insensitive' } },
        ],
      })),
      deletedAt: null,
    },
    select: {
      name: true,
      userName: true,
      profileImageUrl: true,
      follower: { where: { followedId: requester.id } },
      followed: { where: { folowererId: requester.id } },
    },
    skip,
    take: parsedLimit,
  });

  const matchCount = users.map((user) => ({
    ...user,
    matchCount: words.reduce(
      (count, word) =>
        count +
        ((user.userName as string).toLowerCase().includes(word.toLowerCase())
          ? 2
          : 0) +
        ((user.name as string).toLowerCase().includes(word.toLowerCase())
          ? 1
          : 0),
      0,
    ),
  }));

  const sortedUsers = matchCount.sort((a, b) => b.matchCount - a.matchCount);
  return sortedUsers.map((el) => {
    const { matchCount, ...rest } = el;
    const user = {
      name: rest.name,
      userName: rest.userName,
      profileImageUrl: rest.profileImageUrl,
      isFollowing: rest.followed && rest.followed.length ? true : false,
      isFollowed: rest.follower && rest.follower.length ? true : false,
    };
    return user;
  });
};
export const createMessage = async (
  text: string,
  userId: string,
  conversationId: string,
  replyId: string | null,
  mediaUrl: string | undefined,
) => {
  const currentDate = new Date();
  const createdMessage = await prisma.message.create({
    data: {
      userId,
      text,
      conversationId,
      date: currentDate,
      replyToMessageId: replyId ? replyId : null,
    },
  });
  //Extract the entities
  const entitiesId: string[] = await extractEntities(text);
  if (mediaUrl) {
    const createdMedia = await createMedia(mediaUrl);
    entitiesId.push(createdMedia.entityId);
  }

  // Linking Entities with Tweets
  for (const id of entitiesId) {
    await createEntityMessage(createdMessage.id, id);
  }
  const entities = await getMessageEntities(createdMessage.id);
  return { ...createdMessage, entities };
};

export const getMessageById = async (id: string) => {
  const entities = await getMessageEntities(id);
  const message = await prisma.message.findUnique({
    where: {
      id,
    },
  });
  return { ...message, ...entities };
};

export const getConvsersationById = async (id: string) => {
  return await prisma.conversation.findUnique({
    where: {
      id,
    },
  });
};

export const userConversationExists = async (
  userId: string,
  conversationId: string,
) => {
  return await prisma.userConversations.findFirst({
    where: {
      conversationId,
      userId,
    },
  });
};

export const validMessageReply = async (
  conversationId: string,
  messageId: string,
) => {
  return await prisma.message.findFirst({
    where: {
      conversationId,
      id: messageId,
    },
  });
};
export const addPeopleToConversation = async (
  conversationId: string,
  users: { id: string }[],
) => {
  const insertedData = users.map((user) => ({
    conversationId: conversationId,
    userId: user.id,
    seen: false,
  }));

  await prisma.userConversations.createMany({
    data: insertedData,
  });
};
export const findConversationPeople = async (conversationId: string) => {
  return await prisma.userConversations.findMany({
    where: { conversationId },
    select: {
      userId: true,
    },
  });
};

export const findConversationById = async (conversationId: string) => {
  return await prisma.conversation.findUnique({
    where: { id: conversationId },
  });
};
