import express from "express";
import {
  addRoom,
  createRoomReview,
  deleteRoom,
  getSingle,
  updateRoom,
} from "../controllers/roomController";
import { getAll } from "../controllers/userController";
import { admin, protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.route("/").get(getAll).post(protect, admin, addRoom);

router.route("/:id/reviews").post(protect, createRoomReview);

router
  .route("/:id")
  .get(getSingle)
  .put(protect, updateRoom)
  .delete(protect, admin, deleteRoom);

export default router;
