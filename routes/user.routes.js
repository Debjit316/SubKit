import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const ur = Router();

// * Route to get all users
ur.get("/", getUsers);

// * Route to get specific user, the request can only be performed by the user who is currently logged in
//* This is done by using the authorize middleware
ur.get("/:id", authorize, getUser);

// * Route to create new user
ur.post("/", (req, res) => {
  res.send({ title: "Create new user" });
});

// * Route to update user
ur.put("/:id", (req, res) => {
  res.send({ title: "Update user" });
});

// * Route to delete user
ur.delete("/:id", (req, res) => {
  res.send({ title: "Delete user" });
});

export default ur;
