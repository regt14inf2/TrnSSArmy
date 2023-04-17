const { getColumn, importSoldierList} = require("../model/import");

const getColumnDB = async(req, res) => {
  try {
    const result = await getColumn(req.body);
    if (typeof result === "object") {
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
  } catch (error) {
    return error;
  }
};

const importSoldierListDB = async (req, res) => {
  try {
    const result = await importSoldierList(req.body);
    if (result === true) {
      res.status(200).json({
        status: "success",
        // data: result,
      });
    }else{
      res.status(500).json({
        status: "error",
        data: result,
      });
    }
  }
  catch (error) {
    return error;
  }
};

module.exports = { getColumnDB, importSoldierListDB};