const logs = new Map();

class ExerciseLogRepository {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  addLog(log) {
    const user = this.userRepository.findByUsername(log.username);
    if (!user) throw new Error("User not found");
    logs.set(log._id, log);
    return log;
  }

  // filter: from, to = dates (yyyy-mm-dd); limit = number
  getLogsByUsername(username, filter) {
    const user = this.userRepository.findByUsername(username);
    if (!user) throw new Error("User not found");

    const filteredLogs = Array.from(logs.values())
      .filter(
        (log) =>
          log.username === username &&
          (!filter.from || log.date >= new Date(filter.from)) &&
          (!filter.to || log.date <= new Date(filter.to)),
      )
      .slice(0, filter.limit || Infinity);

    return filteredLogs.map((log) => log.toJSON());
  }
}

module.exports = ExerciseLogRepository;
