import express from "express";
import cors from "cors";

import { PORT } from "./database/config/config.js";
import { corsOptions } from "./database/config/corsOptions.js";
import { connectDB } from "./database/database.js";

import mainRoutes from "./routes/root.js";
import notificationsRoutes from "./routes/notificationsRoutes.js";

const app = express();

app.set("trust proxy", 1);

app.use(express.json({ limit: "5mb" }));
app.use(cors(corsOptions));

app.use("/", mainRoutes);
app.use("/notifications", notificationsRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "404 Not Found" });
});

connectDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
