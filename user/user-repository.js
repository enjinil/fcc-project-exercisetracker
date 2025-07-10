class UserRepository {
  constructor() {
    this.users = new Map();
  }

  save(user) {
    this.users.set(user._id, user);
    return user;
  }

  findById(id) {
    return this.users.get(id) || null;
  }

  findByUsername(username) {
    for (let user of this.users.values()) {
      if (user.username === username) return user;
    }
    return null;
  }
}

module.exports = UserRepository;
