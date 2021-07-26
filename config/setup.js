const faker = require("faker");
const randomLocation = require("random-location");
const mongoose = require("mongoose");
const userController = require("../modules/user/user.controller");
const adminController = require("../modules/admin/admin.controller");
const axios = require("axios");

mongoose.connect("mongodb://localhost:27017/nearbychat", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const setup = {
  initialize: async () => {
    let avatar = await axios.get(
      "https://akabab.github.io/superhero-api/api/all.json"
    );
    avatar = avatar.data;
    for (let i = 0; i < 100; i++) {
      const point = {
        latitude: 50.555809,
        longitude: 9.680845,
      };
      let randomAvatar = avatar[Math.floor(Math.random() * avatar.length)];
      let randomAvatarName = randomAvatar.name;
      let randomAvatarImage = randomAvatar.images.lg;
      const R = 1000;
      const randomPoint = randomLocation.randomCirclePoint(point, R);

      let data = {
        email: faker.internet.email(),
        username:
          randomAvatarName +
          Math.random().toString(20).substr(2, 6).toUpperCase(),
        password: "test",
        image: randomAvatarImage,
        lat: randomPoint.latitude,
        lng: randomPoint.longitude,
      };
      await userController.saveUser(data);
    }

    console.log("users created");
  },
  createAdmin: async () => {
    await mongoose.connection.dropDatabase();

    let admin = await adminController.onCreate({
      email: "admin@admin.com",
      password: "admin",
    });
    console.log("admin created");

    return admin;
  },
};

setup.initialize();
setup.createAdmin();
