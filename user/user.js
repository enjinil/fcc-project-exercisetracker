const generateUUID = require("../utils").generateUUID;

class User {
  constructor(username, id = generateUUID()) {
    this._id = id;
    this.username = username;
  }
}

module.exports = User;
