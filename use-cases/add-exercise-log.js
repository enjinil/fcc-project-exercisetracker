const ExerciseLog = require("../exercise-log/exercise-log");

class AddExerciseLog {
  constructor(userRepository, exerciseLogRepository) {
    this.userRepository = userRepository;
    this.exerciseLogRepository = exerciseLogRepository;
  }

  execute({ username, description, duration, date }) {
    if (!username || typeof username !== "string") {
      throw new Error("Username is required and must be a string");
    }
    if (!description || typeof description !== "string") {
      throw new Error("Description is required and must be a string");
    }
    if (!duration || isNaN(duration) || duration <= 0) {
      throw new Error("Duration must be a positive number");
    }
    const log = new ExerciseLog(username, description, duration, date);
    this.exerciseLogRepository.addLog(log);
    return log.toJSON();
  }
}

module.exports = AddExerciseLog;
