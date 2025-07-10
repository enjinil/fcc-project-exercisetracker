const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const UserRepository = require("./user/user-repository");
const ExerciseLogRepository = require("./exercise-log/exercise-log-repository");
const CreateUser = require("./use-cases/create-user");
const AddExerciseLog = require("./use-cases/add-exercise-log");

const userRepo = new UserRepository();
const exerciseLogRepo = new ExerciseLogRepository(userRepo);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/users", (req, res) => {
  const createUser = new CreateUser(userRepo);

  try {
    const user = createUser.execute(req.body.username);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/users", (_req, res) => {
  res.json(Array.from(userRepo.users.values()));
});

app.post("/api/users/:_id/exercises", (req, res) => {
  const user = userRepo.findById(req.params._id);

  if (!user) return res.status(404).json({ error: "User not found" });

  const addExerciseLog = new AddExerciseLog(userRepo, exerciseLogRepo);

  try {
    const log = addExerciseLog.execute({
      username: user.username,
      ...req.body,
    });
    res.json({
      ...log,
      ...user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/users/:_id/logs?[from][&to][&limit]
// [ ] = optional
// from, to = dates (yyyy-mm-dd); limit = number
app.get("/api/users/:_id/logs", (req, res) => {
  const user = userRepo.findById(req.params._id);
  if (!user) return res.status(404).json({ error: "User not found" });

  const logs = exerciseLogRepo.getLogsByUsername(user.username, req.query);

  res.json({
    username: user.username,
    count: logs.length,
    _id: user._id,
    log: logs.map(({ _id, ...log }) => ({
      ...log,
    })),
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
