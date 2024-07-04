import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // crate a new user and save it to the database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log(newUser);
    res.status(201).json({ message: 'User created successfully.' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to register.' });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // check if the user exists
    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // create cookie token and send it to the user
    // res.setHeader("Set-Cookie", "test=" + "myValue").json("success");
    const age = 60 * 60 * 24 * 7; // 1 week

    const token = jwt.sign({
      id: user.id,
      isAdmin: false,
    }, process.env.JWT_SECRET_KEY, { expiresIn: age });

    const { password: userPassword, ...userInfo } = user;

    res.cookie('token', token, {
      httpOnly: true,
      // secure: true
      maxAge: age * 1000,
    }).status(200).json(userInfo);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to login.' });
  }
};

export const logout = async (req, res) => {
  res.clearCookie('token').status(200).json({ message: 'User logged out successfully.' });
};