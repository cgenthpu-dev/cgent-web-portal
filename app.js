import app from "./src/utils/express.utils.js";
import connectDB from "./src/database/database.js";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./src/routes/auth.route.js";

dotenv.config({
  path: "./.env",
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN.split(",") || "https://localhost:8000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/v1/auth", authRouter);

connectDB()
  .then(function () {
    app.listen(process.env.PORT, () => {
      console.log(
        `Server started successfully at https://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(`Database connection error : ${error}`);
  });
