const {getSoldierlist, getSoldierById, updateSoldierByid} = require('../model/soldierlist')

const getSoldierlistDB = async(req, res) => {
  try {
    const result = await getSoldierlist(req.body)
    if(typeof result === 'object'){
      res.status(200).json({
        status: 'success',
        data: result,
      })
    }else{
      res.status(500).json({
        status: 'error',
        data: result,
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      data: error,
    })
  }
}

const getSoldierByIdDB = async(req, res) => {
  try {
    const result = await getSoldierById(req.body)
    if(typeof result === 'object'){
      res.status(200).json({
        status: 'success',
        data: result,
      })
    }else{
      res.status(500).json({
        status: 'error',
        data: result,
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      data: error,
    })
  }
}

const updateSoldierByIdDB = async(req, res) => {
  try {
    const result = await updateSoldierByid(req.body)
    if(typeof result === 'object'){
      res.status(200).json({
        status: 'success',
        data: result,
      })
    }else{
      res.status(500).json({
        status: 'error',
        data: result,
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      data: error,
    })
  }
}


module.exports = {getSoldierlistDB, getSoldierByIdDB, updateSoldierByIdDB}