const users = new Map();

class UserRepository {
  constructor() {}

  save(user) {
    users.set(user._id, user);
    return user;
  }

  findAll() {
    return Array.from(users.values());
  }

  findById(id) {
    return users.get(id) || null;
  }

  findByUsername(username) {
    for (let user of users.values()) {
      if (user.username === username) return user;
    }
    return null;
  }
}

module.exports = UserRepository;
