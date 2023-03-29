const dotenv = require("dotenv");
// const sg = require("../model/sg");
const globalSettings= require("../model/globalSetting");
const config = process.env;
dotenv.config();

//Search Global Setting
exports.search= (req, res, next) => {
  try {
    console.log(req.body);
    let result = globalSettings.searchsg(req.body);
    result.then((result) => {
      if (typeof result == "object") {
        res.status(201).json({
          status: "success",
          data: result,
        });
      } else {
        res.status(500).json({
          status: "error",
          data: result,
        });
      }
    });
  } catch (error) {
    return error;
  }
}

//Add Global Setting
exports.insert = (req, res, next) => {
  try {
    let result = globalSettings.insert(req.body);
    result.then((result) => {
      if (typeof result == "object") {
        res.status(200).json({
          message: "success",
          // data: result,
        });
      } else {
        res.status(400).json({
          message: result,
        });
      }
    });
  } catch (error) {
    return error;
  }
}

//Edit Global Setting
exports.update = (req, res, next) => {
  try {
    let result = globalSettings.update(req.body);
    result.then((result) => {
      if (typeof result == "object") {
        res.status(200).json({
          message: "success",
          // data: result,
        });
      } else {
        res.status(400).json({
          message: result,
        });
      }
    });
  } catch (error) {
    return error;
  }
}

//Delete Global Setting
exports.deleted = (req, res, next) => {
  try {
    let result = globalSettings.delete(req.body);
    result.then((result) => {
      if (result == true) {
        res.status(200).json({
          message: "success",
          // data: result,
        });
      } else {
        res.status(400).json({
          message: result,
        });
      }
    });
  } catch (error) {
    return error;
  }
}