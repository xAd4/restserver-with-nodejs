const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      { expiresIn: "2h" },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Dont generate token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = generateJWT;
