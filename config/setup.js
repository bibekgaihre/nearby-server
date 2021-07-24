const faker = require("faker");
const randomLocation = require("random-location");
const mongoose = require("mongoose");
const userController = require("../modules/user/user.controller");

mongoose.connect("mongodb://localhost:27017/nearbychat", {
  useNewUrlParser: true,
});

const setup = {
  initialize: async () => {
    for (let i = 0; i < 50; i++) {
      const point = {
        latitude: 50.555809,
        longitude: 9.680845,
      };
      const R = 1000;
      const randomPoint = randomLocation.randomCirclePoint(point, R);

      let data = {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: "test",
        image:
          "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/1-a-bomb.jpg",
        lat: randomPoint.latitude,
        lng: randomPoint.longitude,
      };
      await userController.saveUser(data);
    }
    console.log("users created");
  },
};

setup.initialize();
