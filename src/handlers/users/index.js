const express = require("express");
const add = require("./add");
const del = require("./delete");
const list = require("./list");
const show = require("./show");
const update = require("./update");

const usersRouting = express.Router();

add(usersRouting);
del(usersRouting);
list(usersRouting);
show(usersRouting);
update(usersRouting);

const usersAPI = express.Router();
usersAPI.use("/users", usersRouting);

module.exports = usersAPI;
