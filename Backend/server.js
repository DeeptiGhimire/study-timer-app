import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import createUserTable from "./model/userModel.js";
import createTimerTable from "./model/timerModel.js";
import createTaskTable from "./model/taskModel.js";
import createGoalTable from "./model/goalModel.js";
import userRoute from "./Route/userRoute.js";
import timerRoute from "./Route/timerRoute.js";
import taskRoute from "./Route/taskRoute.js";
import goalRoute from "./Route/goalRoute.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/timer", timerRoute);
app.use("/api/tasks", taskRoute);
app.use("/api/goals", goalRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await createUserTable();
  await createTimerTable();
  await createTaskTable();
  await createGoalTable();
}); 