let id = 2;
const DB = [{ id: 1, name: "Juan", age: 30 }];

module.exports = {
  id,
  DB,
  add(user) {
    id++;
    user.id = id;

    DB.push(user);
  },
};
