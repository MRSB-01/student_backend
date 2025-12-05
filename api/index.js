import express from "express";
import serverless from "@vendia/serverless-express";
import studentRoutes from "../src/routes/studentRoutes.js";

const app = express();
app.use(express.json());

// Routes
app.use("/students", studentRoutes);

export const handler = serverless({ app });
export default app;
