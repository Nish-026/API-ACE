const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();
let userRoute = express.Router();
require("dotenv").config();
const { userModel } = require("../model/user.model");
const passport = require("../config/google_oauth");

userRoute.post("/user/signup", async (req, res) => {
  const { name, email, password } = req.body;
  let userData = await userModel.find({ email });
  if (userData.length > 0) {
    res.status(400);
    res.send("user already exists");
  } else {
    bcrypt.hash(password, +process.env.saltRounds, async function (err, hash) {
      if (err) {
        console.log(err);
        res.status(400);
        res.send("something went wrong");
      } else {
        let userRegisterData = userModel({
          name,
          email,
          password: hash,
        });
        await userRegisterData.save();
        res.send("user registered");
      }
    });
  }
});

userRoute.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  let userData = await userModel.find({ email });
  if (userData.length > 0) {
    bcrypt.compare(password, userData[0].password, function (err, result) {
      if (result) {
        //   normal token
        var token = jwt.sign(
          { name: userData[0].name, userID: userData[0]._id },
          process.env.secret
        );

        // //   refresh token
        // var refreshToken = jwt.sign(
        //   { name: userData[0].name, userID: userData[0]._id },
        //   process.env.refreshSecret,
        //   { expiresIn: process.env.refreshTokenLife }
        // );
        // res.cookie("refreshToken", refreshToken, {
        //   maxAge: 1000 * 60 * 10,
        //   httpOnly: true,
        // });
        res.send({
          msg: "login successful",
          token: token,
          username: userData[0].name,
          userID: userData[0]._id,
        });
      } else {
        res.status(400);
        res.send({ msg: "wrong credentials" });
      }
    });
  } else {
    res.status(404);
    res.send({ msg: "wrong credentials" });
  }
});


userRoute.post("/user/logout", async (req, res) => {
  const token = req.headers.authorization;
  const blackListData = JSON.parse(
    fs.readFileSync("blacklist.token.json", "utf-8")
  );
  blackListData.push(token);
  fs.writeFileSync("blacklist.token.json", JSON.stringify(blackListData));
  res.send("logout successful");
});

userRoute.post("/otp", async (req, res) => {
  const email = req.body.email;
  try {
    const userData = await userModel.find({ email });
    if (userData.length > 0) {
      let otp = Math.floor(Math.random() * 9000 + 1000);
      // let sub = `OTP for resetting the API ACE Password`;
      // let body = `This is Your OTP - ${otp} for resetting the API ACE password, Keep it confedential.`;
      // sendMail(sub, body, email);
      res.send({
        ok: true,
        message: otp,
      });
    } else {
      res.send({
        message: "Incorrect E-Mail",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send("something went wrong while sending otp");
  }
});

userRoute.patch("/reset", async (req, res) => {
  try {
    const payload = req.body;

    const email = payload.email;
    const password = payload.password;

    const userData = await userModel.find({ email });

    if (userData.length > 0) {
      const ID = userData[0]._id;
      bcrypt.hash(password, 3, async function (err, hashed) {
        const edited = { password: hashed };
        await userModel.findByIdAndUpdate({ _id: ID }, edited);
        res.status(200).send({
          ok: true,
          message: "Password Re-Set Successfully",
        });
      });
    } else {
      res.send({ message: "Incorrect Email" });
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send("something went wrong while resetting password");
  }
});

// userRoute.get("/auth/github", async (req, res) => {
//   const { code } = req.query;
//   const accessToken = await fetch(
//     "https://github.com/login/oauth/access_token",
//     {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "content-type": "application/json",
//       },
//       body: JSON.stringify({
//         client_id: process.env.client_id,
//         client_secret: process.env.client_secret,
//         code,
//       }),
//     }
//   ).then((res) => res.json());
//   console.log(accessToken);
//   const access_token = accessToken.access_token;
//   const userDetails = await fetch("https://api.github.com/user", {
//     headers: {
//       Authorization: `Bearer ${access_token}`,
//     },
//   }).then((res) => res.json());
//   const name = userDetails.name;
//   const email = userDetails.email;
//   const user_data = {
//     name,
//     email,
//   }
//   const user = new userModel(user_data);
//   console.log(user);
//   await user.save();
//   res.send("welcome"); ///// redirect url
// });

// userRoute.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// userRoute.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/login",
//     session: false,
//   }),
//   // Successful authentication, redirect home.
//   async function (req, res) {
//     // Successful authentication, redirect home.
//     console.log(req.user);
//     let udata = await userModel.findOne({ email });
//     if (udata) {
//         return cb(null, udata);
//     }
//     const name = req.user.name;
//     const email = req.user.email;
//     const user_data = {
//       name,
//       email,
//     };
//     res.send("welcome"); /// redirect URL
//   }
// );

module.exports = { userRoute };
