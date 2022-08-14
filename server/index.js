import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AuthRouter from "./routes/authRouter.js";
import BlogRouter from "./routes/blogRouter.js";
// import connection from "./model/db.config.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api/user", AuthRouter);
app.use("/api/blog", BlogRouter);
// connection;
app.listen(port, () => {
  console.log(`Server is connected at ${port}`);
});
