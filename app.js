import express from "express";
import { PORT } from "./config/env.js";

import ar from "./routes/auth.routes.js";
import sr from "./routes/subscription.routes.js";
import ur from "./routes/user.routes.js";
import morgan from "morgan";
import connectdb from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import arcMiddleware from "./middleware/arcjet.middleware.js";
import wr from "./routes/workflow.routes.js";

const app = express();

//! Extremely important
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcMiddleware);

//* api/v1/auth/{sign-up | sign-in | sign-out}
//~ prepending whatever is passed to /api/v1/{auth | users | subscriptions } , and attaching the additional routes as per the router

app.use("/api/v1/auth", ar);
app.use("/api/v1/users", ur);
app.use("/api/v1/subscriptions", sr);
app.use("/api/v1/workflows", wr);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to SubKit");
});

app.listen(PORT, async () => {
  console.log(`SubKit is running on http://localhost:${PORT}`);

  await connectdb();
});

export default app;
