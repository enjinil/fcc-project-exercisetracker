const generateUUID = require("../utils").generateUUID;

class ExerciseLog {
  constructor(
    username,
    description,
    duration,
    date = new Date(),
    id = generateUUID(),
  ) {
    this._id = id;
    this.username = username;
    this.description = description;
    this.duration = Number(duration);
    this.date = date instanceof Date ? date : new Date(date);
  }

  toJSON() {
    return {
      username: this.username,
      description: this.description,
      duration: this.duration,
      date: this.date.toDateString(),
      _id: this._id,
    };
  }
}

module.exports = ExerciseLog;
