const users = [];

const addUser = (socketID, name, room, userUID) => {
  const user = { socketID, name, room, userUID };
  users.push(user);
  return user;
};

const getUser = (name) => users.find((user) => user.name == name);

const removeUser = (socketID) => {
  const index = users.findIndex((user) => user.socketID == socketID);
  if (index != -1) {
    return users.splice(index, 1)[0];
  }
};

const getUsersInRoom = (room) => {
  const usersInRoom = users.filter((user) => user.room == room);
  return usersInRoom;
};

module.exports = { addUser, getUser, removeUser, getUsersInRoom };
