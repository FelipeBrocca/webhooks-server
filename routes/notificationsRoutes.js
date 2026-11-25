import express from "express";
import {
  receiveNotification,
  getNotifications,
  getNotificationHistory,
} from "../controllers/notificationsController.js";

const router = express.Router();

router.post("/", receiveNotification);
router.get("/", getNotifications);
router.get("/:uid", getNotificationHistory);

export default router;
