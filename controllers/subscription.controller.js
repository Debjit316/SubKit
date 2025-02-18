import { workflowClient } from "../config/upstash.js";
import subsModel from "../models/subscription.model.js";
import { SERVER_URL } from "../config/env.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await subsModel.create({
      ...req.body,
      // the below req.user is not a part of the req body
      // it is a part of the auth Middleware that we put before it
      user: req.user._id,
    });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        "content-type": "application/json",
      },
      retries: 0,
    });

    // console.log(workflowRunId);

    res
      .status(201)
      .json({ success: true, data: { subscription, workflowRunId } });
  } catch (err) {
    next(err);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("Unauthorized to accees the specific account");
      error.statusCode = 401;
      throw error;
    }

    const subs = await subsModel.find({ user: req.params.id });

    res.status(200).json({ success: true, data: subs });
  } catch (err) {
    next(err);
  }
};

export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subs = await subsModel.find();

    res.status(200).json({ success: true, data: subs });
  } catch (err) {
    next(err);
  }
};

export const getSpecificDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    const subs = await subsModel.findById(id);

    res.status(200).json({ success: true, data: subs });
  } catch (err) {
    next(err);
  }
};
