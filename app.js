const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("config");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const conversationController = require("./modules/conversation/conversation.controller");
const connectionController = require("./modules/connection/connection.controller");

const createError = require("http-errors");
const path = require("path");
const http = require("http");
// const io = require("socket.io").listen(5000).sockets;
// const { io } = require("./utils/socket");

const indexRouter = require("./routes/index");
const exphbs = require("express-handlebars");
// const { Socket } = require("dgram");

const app = express();

mongoose.connect(
  config.get("db.url"),
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  (err, db) => {
    if (err) {
      throw err;
    }
    console.log("Database connected");
  }
);

app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
let server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: `http://localhost:${config.get("app.frontendport")}`,
    methods: ["GET", "POST"],
    credentials: true,
    transports: ["websocket", "polling"],
  },
  allowEIO3: true,
});
io.on("connection", (socket) => {
  /* … */
  socket.on("findmessage", async (data) => {
    let message = await conversationController.getMessage(data);
    socket.emit("output", message);
  });
  socket.on("sendmessage", async function (data) {
    let message = await conversationController.createMessage(data);
    io.emit("output", [message]);
  });
});

server.listen(3000, () => console.log(` server is running on port 3000`));
