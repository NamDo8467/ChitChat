const users = [];

const addUser = (id, name, room) => {
  const user = { id, name, room };
  users.push(user);
  return user;
};

const getUser = (name) => users.find((user) => user.name == name);

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id == id);
  if (index != -1) {
    return users.splice(index, 1)[0];
  }
};

const getUsersInRoom = (room) => {
  const usersInRoom = users.filter(user => user.room == room)
  return usersInRoom
}

module.exports = { addUser, getUser, removeUser, getUsersInRoom };
