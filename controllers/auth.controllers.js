import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

export const signUp = async (req, res, next) => {
  // Session of a mongoose transaction
  const session = await mongoose.startSession();
  // We want to perform atomic updates
  session.startTransaction();

  try {
    // Logic to create a new user
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const err = new Error("User already Exists");
      err.statusCode = 409;
      throw err;
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create([{ name, email, password: hPassword }], {
      session,
    });

    const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user: newUser[0],
        token,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
    // In case of unfinished transactions, abort the transaction -> end the session -> and move to the next transaction with the error
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }

    const isPassValid = await bcrypt.compare(password, existingUser.password);

    if (!isPassValid) {
      const err = new Error("Incorrect Password");
      err.statusCode = 401;
      throw err;
    }

    const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      data: {
        token,
        // existingUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {};
