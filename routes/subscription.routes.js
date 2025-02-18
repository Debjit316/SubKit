import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import {
  createSubscription,
  getAllSubscriptions,
  getSpecificDetails,
  getUserSubscriptions,
} from "../controllers/subscription.controller.js";

const sr = Router();

sr.get("/", getAllSubscriptions);

//* Route to get details about a specific subscription
sr.get("/:id", getSpecificDetails);

sr.post("/", authorize, createSubscription);

sr.put("/:id", (req, res) => {
  res.send({ title: "Update subscription" });
});

sr.delete("/:id", (req, res) => {
  res.send({ title: "Delete subscription" });
});

//* Route to get all subscriptions for a specific user
sr.get("/user/:id", authorize, getUserSubscriptions);

sr.put("/:id/cancel", (req, res) => {
  res.send({ title: "Cancel subscription" });
});

sr.get("/renewals", (req, res) => {
  res.send({ title: "Get subscription renewals" });
});

export default sr;
