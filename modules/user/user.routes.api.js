const router = require("express").Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const Controller = require("./user.controller");

const SecureAPI = require("../../utils/secureAPI");
const CheckAPIKey = require("../../utils/checkApiKey");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + new Date().getTime());
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("File type not supported"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.get("/:id", SecureAPI(), CheckAPIKey(), async (req, res, next) => {
  let data = await Controller.getUser(req.params.id);
  res.json(data);
});

// router.get("/friend/:id", async (req, res, next) => {
//   // let data=await Controller.get
// });

// router.get("");

router.put(
  "/update/:id",
  SecureAPI(),
  CheckAPIKey(),
  async (req, res, next) => {
    try {
      let data = await Controller.updateUser(req.body, req.params.id);
      res.json(data);
    } catch (error) {
      console.error(error);
    }
  }
);

router.post("/register", async (req, res, next) => {
  //data :
  //await verification by email
  // email, username, password, picture
  let data = await Controller.saveUser(req.body);
  if (data.email) {
    const token = await jwt.sign(
      {
        email: data.email,
        userId: data.user,
      },
      config.get("app.secret"),
      {
        expiresIn: "48h",
      }
    );
    res.cookie("token", token).status(200).json({
      message: "Login Successfull",
      token: token,
      id: data.id,
      apiKey: data.apiKey,
      username: data.username,
    });
  } else if (!data.email) {
    res.status(401).json(data);
  }
});

router.post("/login", async (req, res, next) => {
  let payload = req.body;
  try {
    let data = await Controller.checkAuth(payload);
    if (data.email) {
      const token = await jwt.sign(
        {
          email: data.email,
          userId: data._id,
        },
        config.get("app.secret"),
        {
          expiresIn: "48h",
        }
      );
      res.cookie("token", token).status(200).json({
        message: "Login Successfull",
        token: token,
        id: data.id,
        apiKey: data.apiKey,
        username: data.username,
      });
    } else if (!data.email) {
      res.status(401).json(data);
    }
  } catch (error) {
    res.json(error);
  }
});

router.post("/forgetpassword", async (req, res) => {});

module.exports = router;
