const {pool} = require('../db/db')
// const {_columnInsert, _multiInsert} = require('../db/queryString')
//get all columns from the table pg database

const _multiInsert = (arrOfValues) => {
  // removes lastCharacter
  const _remLastChar = (str) => str.slice(0, str.length - 1);

  let foramttedQuery = "";

  arrOfValues.forEach((row) => {
    let newRow = "";
    for (const val of Object.values(row)) {
      let newValue = "";
      if (typeof val === "string") newValue = `'${val}',`;
      else if (val === undefined || val === "") newValue = `NULL,`;
      else newValue = `${val},`;
      newRow = newRow.concat(newValue);
    }

    foramttedQuery = foramttedQuery.concat(`(${_remLastChar(newRow)}),`);
  });

  return _remLastChar(foramttedQuery);
};

const _columnInsert = (arrOfValues) => {
  try {
    const _remLastChar = (str) => str.slice(0, str.length - 1);
  let foramttedQuery = "";
  //object keys to query
  if(Object.keys(arrOfValues[0])){
    for (const key of Object.keys(arrOfValues[0])) {
      foramttedQuery = foramttedQuery.concat(`"${key}",`);
    }
  }else{
    for (const key of Object.keys(arrOfValues)) {
      foramttedQuery = foramttedQuery.concat(`"${key}",`);
    }
  }
  return _remLastChar(foramttedQuery);
  } catch (error) {
    return error
  }
};
const getColumn = async(dat) => {
  try {
    console.log(dat.TABLE_NAME);
    const queryString = `SELECT column_name FROM information_schema.columns WHERE table_name = '${dat.TABLE_NAME}' and table_name IS NOT NULL`
    const {rows} = await pool.query(queryString)
    let list = ["INDEX", "CREATE_DATE", "CREATE_USER", "MODIFY_DATE", "MODIFY_USER"]
    let columns = []
    //check column name remove index, create_date, create_user, modify_date, modify_user
    for (let i = 0; i < rows.length; i++) {
      console.log(rows[i].column_name);
      if (!list.includes(rows[i].column_name)) {
        console.log("--",rows[i]);
        columns.push(rows[i])
      }
    }

    if(columns.length > 0){
      return columns
    }else{
      return false
    }
  } catch (error) {
    return error
  }

}

//fucntion check vlidate status
const _checkStatus = (status) => {
  let statusList = ["R","A","I"]
  if(statusList.includes(status)){
    return true
  }else{
    return false
  }
}

//function validate empty
const _checkEmpty = (data) => {
  let list = ''
  for (let i = 0; i < data.length; i++) {
    if(data[i] === "" || data[i] === undefined){
      list = "เกิดข้อผิดพลาด ข้อมูลไม่ครบ"
    }
  }
  if(list !== null || list != ''){
    return list
  }
}

const importSoldierList = async(dat)=>{
    try {
    const data = dat.DATA.map((item)=>{
      let dept = item.DEPT.split('\r')
      // console.log(dept);
      return({
        DEPT: dept[0],
        FRIST_NAME: item.FRIST_NAME,
        LAST_NAME : item.LAST_NAME,
        PERSOANL_ID: item.PERSOANL_ID,
        RESP_UNIT: item.RESP_UNIT,
        STATUS: item.STATUS,
        CREATE_DATE: new Date().toISOString(),
        CREATE_USER: "import_service", 
        MODIFY_DATE: new Date().toISOString(),
        MODIFY_USER: "import_service",
      })
    })

    //check status
    listError = []
    for (let i = 0; i < data.length; i++) {
      if(!_checkStatus(data[i].STATUS)){
        listError.push("เกิดข้อผิดพลาด สถานะไม่ถูกต้อง")
      }
    }

    //check empty
    let empty = _checkEmpty(data)
    if(empty){
      listError.push(empty)
    }

    //check duplicate personal id form database
    const queryStringCheck = `SELECT "PERSOANL_ID" FROM public."${dat.TABLE_NAME}" WHERE "PERSOANL_ID" IN (${data.map((item)=>{return `'${item.PERSOANL_ID}'`})})`
    console.log(queryStringCheck);
    const resCheck = await pool.query(queryStringCheck)
    if(resCheck.rowCount > 0){
      listError.push("เกิดข้อผิดพลาด มีรายชื่อบางท่านอยู่ในระบบแล้ว")
    }

    // check duplicate personal id from json file
    let duplicate = []
    for (let i = 0; i < data.length; i++) {
      for (let j = i+1; j < data.length; j++) {
        if(data[i].PERSOANL_ID === data[j].PERSOANL_ID){
          duplicate.push(data[i].PERSOANL_ID)
        }
      }
    }
    if(duplicate.length > 0){
      listError.push("เกิดข้อผิดพลาด มีรายชื่อบางท่านซ้ำกันในไฟล์")
    }

    const queryString = `INSERT INTO public."${dat.TABLE_NAME}" (${_columnInsert(data)}) VALUES ${_multiInsert(data)}; `
    
    if(listError.length == 0){
      const sql = await pool.query(queryString)
      if(sql.rowCount == data.length){
        return true
      }
    }else{
      return listError
    }
  } catch (error) {
    return error
  }
}

module.exports = {getColumn, importSoldierList}
