import express from "express";
import {
  checkRoomIsAvailble,
  deleteBooking,
  getAll,
  getBookedDates,
  myBookings,
  newBooking,
} from "../controllers/bookingController";
import { admin, protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.route("/").post(protect, newBooking).get(protect, admin, getAll);

router.route("/me").get(protect, myBookings);

router.route("/check").post(checkRoomIsAvailble);

router.route("/dates/:roomId").get(getBookedDates);

router.route("/:id").delete(protect, admin, deleteBooking);

export default router;
