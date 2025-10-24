import express from "express";
import { getCars } from "../controllers/userController.js"; // You already have this function

const carRouter = express.Router();

// ✅ Public route (no authentication)
carRouter.get("/cars", getCars);

export default carRouter;
