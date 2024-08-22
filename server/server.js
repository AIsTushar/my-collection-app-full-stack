import express from "express";
import dotenv from "dotenv";
import { userRoute } from "./routes/userRoutes.js";
import { collectionRoute } from "./routes/collectionRoutes.js";
import { authRoute } from "./routes/authRoutes.js";
import cors from "cors";
import { itemRoute } from "./routes/itemRoutes.js";
import { categoryRoute } from "./routes/categoryRoutes.js";
import { tagRoute } from "./routes/tagRoute.js";
dotenv.config();

const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "https://my-collection-app-full-stack-iota.vercel.app",
    credentials: true,
  })
);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user", userRoute);
app.use("/api/collections", collectionRoute);
app.use("/api/items", itemRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/tags", tagRoute);
app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
