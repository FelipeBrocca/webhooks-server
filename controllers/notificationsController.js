import Notification from "../database/models/Notification.js";

// Cada webhook recibido se guarda como un registro nuevo para conservar el historial del uid.
export const receiveNotification = async (req, res) => {
  try {
    const { uid, status } = req.body || {};

    if (!uid || !status) {
      return res.status(400).json({ message: "uid and status are required" });
    }

    await Notification.create({ uid, status });

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Listado por UID: estado actual, cantidad de cambios y fechas.
export const getNotifications = async (req, res) => {
  try {
    const uids = await Notification.aggregate([
      { $sort: { createdAt: 1 } },
      {
        $group: {
          _id: "$uid",
          currentStatus: { $last: "$status" },
          changes: { $sum: 1 },
          firstReceivedAt: { $first: "$createdAt" },
          lastReceivedAt: { $last: "$createdAt" },
        },
      },
      { $project: { _id: 0, uid: "$_id", currentStatus: 1, changes: 1, firstReceivedAt: 1, lastReceivedAt: 1 } },
      { $sort: { lastReceivedAt: -1 } },
    ]);
    return res.status(200).json(uids);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Historial completo de un UID, del primer al último estado.
export const getNotificationHistory = async (req, res) => {
  try {
    const history = await Notification.find({ uid: req.params.uid })
      .sort({ createdAt: 1 })
      .select("uid status createdAt")
      .lean();

    if (history.length === 0) {
      return res.status(404).json({ message: "UID not found" });
    }

    return res.status(200).json(history);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
