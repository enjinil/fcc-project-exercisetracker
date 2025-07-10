const User = require("../user/user");

class CreateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  execute(username) {
    if (!username || typeof username !== "string") {
      throw new Error("Username is required and must be a string");
    }
    let user = this.userRepository.findByUsername(username);
    if (user) throw new Error("Username already exists");
    user = new User(username);
    this.userRepository.save(user);
    return {
      username: user.username,
      _id: user._id,
    };
  }
}

module.exports = CreateUser;
