// const { Pool } = require('pg');
const {pool} = require('../db/db')

//Search Global Setting
const searchsg = async(dat) => {
  const {
    SG_NAME,
  } = dat
  try {
    console.log(dat);
    let queryString = 
    `SELECT SG."SG_ID", SG."SG_NAME",SG."SG_DESCP", SSG."SSG_ID", SSG."SSG_NAME",SSG."SSG_DESCP"
    FROM public."TRN_SETTING_GOLBAL" AS SG
    LEFT JOIN "TRN_SETTING_SUB_GOLBAL" AS SSG
    ON SSG."SG_ID" = SG."SG_ID"
    WHERE SG."SG_NAME" = '${SG_NAME}'`
    const {rows} = await pool.query(queryString)
    if (rows.length > 0) {
      return rows
    } else {
      return 'ตรวจไม่พบข้อมูล กรุณาตรวจสอบ'
    }
  } catch (error) {
    // console.log(typeof(error))
    return error
  }
}

const insert = async(dat) => {
  const sg = {
    SG_ID: dat.SG_ID,
    SG_NAME: dat.SG_NAME,
    SG_DESCP: dat.SG_DESCP,
    CREATE_USER: dat.CREATE_USER,
    MODIFY_USER: dat.MODIFY_USER,
    CREATE_DATE: new Date().toISOString(),
    MODIFY_DATE: new Date().toISOString(),
  }
  try {
    const queryCheckdup = `SELECT * FROM public."TRN_SETTING_GOLBAL" WHERE "SG_ID" = '${sg.SG_ID}'`
    const {rows: rowC} = await pool.query(queryCheckdup)
    if(rowC.length > 0){
      return 'มีข้อมูลนี้อยู่แล้ว'
    }
    else{
      const query = `INSERT INTO public."TRN_SETTING_GOLBAL"(
        "SG_ID","SG_NAME","SG_DESCP","CREATE_USER","MODIFY_USER","CREATE_DATE","MODIFY_DATE")
        VALUES('${sg.SG_ID}','${sg.SG_NAME}','${sg.SG_DESCP}','${sg.CREATE_USER}','${sg.MODIFY_USER}','${sg.CREATE_DATE}','${sg.MODIFY_DATE}') RETURNING *;`
      const {rows} = await pool.query(query);
      if(rows.length > 0){
        return rows
      }else{
        return false
      }
    }
  } catch (error) {
    return error
  }
}

const update = async(dat) => {
  try {
    const query = `UPDATE public."TRN_SETTING_GOLBAL"
    SET "SG_NAME"='${dat.SG_NAME}', "SG_DESCP"='${dat.SG_DESCP}', "MODIFY_USER"='${dat.MODIFY_USER}', "MODIFY_DATE"='${new Date().toISOString()}'
    WHERE "SG_ID" = '${dat.SG_ID}' RETURNING *;`

    const {rows} = await pool.query(query);
    if(rows.length > 0){
      return rows
    }else{
      return false
    }
  } catch (error) {
    return error
  }
}

const deleted = async(dat) => {
  try {
    const query = `DELETE FROM public."TRN_SETTING_GOLBAL" 
    WHERE "SG_ID" = '${dat.SG_ID}' RETURNING *;`
    const {rows} = await pool.query(query);
    if (rows.length <= 0) {
      return true
    }else {
      return false
    }
  } catch (error) {
    return error
  }
}

module.exports = {searchsg, insert, update, deleted};
