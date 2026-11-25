import mongoose from "mongoose";

// Un documento por cada notificación recibida: el historial de un UID son todos los documentos con ese uid.
const notificationSchema = mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      index: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
