import prisma from '../lib/prisma.js';

export const getPosts = async (req, res) => {
  const query = req.query;
  // console.log(query);
  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || 0,
          lte: parseInt(query.maxPrice) || 10000000
        }
      }
    });

    console.log(posts);
    console.log({
      city: query.city,
      type: query.type,
      property: query.property,
      bedroom: parseInt(query.bedroom),
      minPrice: parseInt(query.minPrice),
      maxPrice: parseInt(query.maxPrice)
    });

    setTimeout(() => {
      res.status(200).json(posts);
    }, 1000);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get posts!' });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique(
      {
        where: { id },
        include: {
          PostDetail: true,
          user: {
            select: {
              username: true,
              avatar: true,
            },
          },
        }
      }
    );
    res.status(200).json(post);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get post!' });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;
  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        PostDetail: {
          create: body.postDetail,
        }
      }
    });
    res.status(200).json(newPost);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to add post!' });
  }
};

export const updatePost = async (req, res) => {
  try {
    res.status(200).json();

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update post!' });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId

  console.log(tokenUserId);

  try {
    const post = await prisma.post.findUnique(
      { where: { id } }
    );

    console.log(post);
    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: 'You are not allowed to delete this post!' });
    }

    await prisma.postDetail.deleteMany({
      where: { postId: id }
    });

    await prisma.post.delete({
      where: { id }
    });

    res.status(200).json({ message: 'Post deleted successfully!' });

  } catch (error) {
    // console.error(error);
    console.error('Error details:', error);
    res.status(500).json({ message: 'Failed to delete post!' });
  }
};