const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const userController = require("./Controllers/UserController");
const mosqueController = require("./Controllers/MosqueController");
const fileUploadController = require("./Controllers/FileController");

const {
  USER,
  MOSQUE,
  FILE_UPLOAD,
  FILE_UPLOAD_UPLOAD,
} = require("./Constants/Routes");

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }).then((response)=>{
    console.log("database Connected");
  })
  .catch((err) => console.log(err));
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//HEADERS MIDDLE WARE
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

// ROUTES
app.use(USER, userController.LOGIN);
app.use(USER, userController.SIGNUP);
app.use(USER, userController.CHANGE_PASSWORD);
//VEHICLES
app.use(MOSQUE, mosqueController.GET_ALL_MOSQUE);
app.use(MOSQUE, mosqueController.GET_MOSQUE_BY_ID);
app.use(MOSQUE, mosqueController.FIND_SPECFIC_MOSQUE);
app.use(MOSQUE, mosqueController.CREATE_MOSQUE);
app.use(MOSQUE, mosqueController.UPDATE_MOSQUE);
app.use(MOSQUE, mosqueController.FIND_MOSQUE_BY_ANY);
app.use(MOSQUE, mosqueController.DELETE_MOSQUE);

app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));

// //FILE
app.use(FILE_UPLOAD_UPLOAD, fileUploadController.FILE_UPLOAD_REQUEST);

app.use((req, res, next) => {
  const error = new Error("HELLO TO SERVER");
  error.status = 404;
  next(error);
});

//catches error from anywhere
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    success: {
      message: "WELCOME TO THE MOSQUE API'S",
    },
    error:error.message
  });
});

module.exports = app;
