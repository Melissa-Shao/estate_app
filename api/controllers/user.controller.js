import prisma from '../lib/prisma.js';
import bcrypt from 'bcrypt';

export const getUsers = async (req, res) => {
  console.log('It works!');
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get users.' });
  }
};


export const getUser = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const user = await prisma.user.findUnique(
      { where: { id } }
    );
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get user.' });
  }
};


export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: 'You are not authorized to update this user.' });
  }

  let updatedPassword = null;

  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });

    const { password: userpassword, ...rest } = updatedUser;
    res.status(200).json(rest);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to update user.' });
  }
};


export const deleteUser = async (req, res) => {

  const id = req.params.id;
  const tokenUserId = req.userId;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: 'You are not authorized to update this user.' });
  }

  try {
    await prisma.user.delete({
      where: { id }
    });
    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to delete user.' });
  }
};


export const savePost = async (req, res) => {

  const postId = req.body.postId;
  const tokenUserId = req.userId;
  // console.log("Request data:", { postId, tokenUserId });

  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: tokenUserId,
          postId: postId
        }
      }
    });
    // console.log("Saved Post found:", savedPost);

    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id
        }
      });
      res.status(200).json({ message: 'Post removed from saved list' });
    }

    else {
      // console.log("No existing saved post found, creating new saved post.");
      await prisma.savedPost.create({
        data: {
          userId: tokenUserId,
          postId: postId
        }
      });
      res.status(200).json({ message: 'Post saved successfully.' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to save post.' });
  }
};


export const profilePosts = async (req, res) => {
  const tokenUserId = req.userId;
  console.log(tokenUserId);
  try {
    const userPosts = await prisma.post.findMany(
      { where: { userId: tokenUserId } }
    );
    const saved = await prisma.savedPost.findMany(
      {
        where: { userId: tokenUserId },
        include: {
          post: true,
        }
      });
    const savedPosts = saved.map(item => item.post);
    res.status(200).json({ userPosts, savedPosts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get profile posts.' });
  }
};


export const getNotificationNumder = async (req, res) => {
  const tokenUserId = req.userId;
  console.log(tokenUserId);
  try {
    const number = await prisma.chat.count({
      where: {
        userIDs: {
          has: tokenUserId
        },
        NOT: {
          seenBy: {
            hasSome: [tokenUserId]
          }
        }
      }
    });

    res.status(200).json(number);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get profile posts.' });
  }
};