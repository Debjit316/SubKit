import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controllers.js";

const ar = Router();

//~ Path: api/v1/auth/sign-up (POST)

ar.post("/sign-up", signUp);

ar.post("/sign-in", signIn);

ar.post("/sign-out", signOut);

export default ar;
