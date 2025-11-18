import app from "./src/utils/express.utils.js";
import connectDB from "./src/database/database.js";
import cors from "cors";
import dotenv from "dotenv";

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

app.get("/", (req, res) => {
  res.send("Homepage");
});

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
