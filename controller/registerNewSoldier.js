const dotenv = require("dotenv");
// const UserModel = require("../model/userModel");
const register = require("../model/register");

const config = process.env;
dotenv.config();

exports.registerNewSoldier = (req, res, next) => {
  try {
    let result = register.registerSoldier(req.body);
    result.then((result) => {
      if (typeof result == "object") {
        res.status(200).json({
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
};

exports.submitRegNewSoldier = (req, res, next) => {
  try {
    let result = register.submitSoldier(req.body);
    result.then((result) => {
      if (result == true) {
        res.status(200).json({
          status: "success",
          // data: result,
        });
      } else {
        res.status(400).json({
          status: "error",
          data: result,
        });
      }
    });
  } catch (error) {
    return error;
  }
};

exports.updateSoldier = (req, res, next) => {
  try {
    let result = register.updateSoldier(req.body);
    result.then((result) => {
      if (result == true) {
        res.status(200).json({
          status: "success",
          // data: result,
        });
      } else {
        res.status(400).json({
          status: "error",
          data: result,
        });
      }
    });
  } catch (error) {
    return error;
  }
};
