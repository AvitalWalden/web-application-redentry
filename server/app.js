const connectToDb = require("./src/utils/connectTodb.js");
const express = require("express");
const cookieParser = require("cookie-parser");
const config = require('./src/config/config')
const usersRouter = require("./src/routes/users.router.js");

const cors = require("cors");

const app = express();
app.use(
  cors({
    credentials: true,
    origin: config.CORS_ORIGIN,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/users", usersRouter);

app.listen(3000,() => {
    console.log("server is running on port 3000")
    connectToDb();
});
