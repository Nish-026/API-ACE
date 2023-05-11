const express = require("express");
let apiSaveRoute = express.Router();

const { apiModel } = require("../model/api_model");

apiSaveRoute.get("/getUserApi/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let userApiData = await apiModel.find({
      userID: id,
    });
    res.send(userApiData);
  } catch (error) {
    res.status(400);
    res.send("something went wrong");
  }
});

apiSaveRoute.post("/saveUserApi", async (req, res) => {
  let payload = req.body;
  try {
    let userApi = await apiModel(payload);
    userApi.save();
    res.send("api added");
  } catch (error) {
    res.status(400);
    res.send("something went wrong");
  }
});

module.exports = { apiSaveRoute };
