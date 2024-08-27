import { Server } from "socket.io";

const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

const io = new Server({
  cors: {
    origin: clientUrl
  }
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExits = onlineUser.find(user => user.userId === userId);
  if (!userExits) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
}

io.on("connection", (socket) => {
  // console.log(socket.id);
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    console.log(onlineUser);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    io.to(receiver.socketId).emit("getMessage", data);
    // console.log(data);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen(4000, () => {
  console.log('Server is listening on port 4000');
});