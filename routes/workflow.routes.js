import { Router } from "express";
import { sendReminders } from "../controllers/workflow.controller.js";

const wr = Router();

wr.post("/subscription/reminder", sendReminders);

export default wr;
