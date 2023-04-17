const { pool } = require("../db/db");
// const _updateQuery = require("../db/queryString");

//function create query update data
const _updateQuery = (table, dat) => {
  let query = `UPDATE ${table} SET `;
  let count = 0;
  for (const key in dat) {
    if (dat.hasOwnProperty(key)) {
      if (count === 0) {
        query += `"${key}" = '${dat[key]}'`;
      } else {
        query += `, "${key}" = '${dat[key]}'`;
      }
      count++;
    }
  }
  // query += ` WHERE "PERSOANL_ID" = '${dat.PERSOANL_ID}' RETURNING *;`;
  return query;
};

const getSoldierlist = async (dat) => {
  try {
    const queryString = `
    SELECT "PERSOANL_ID","FRIST_NAME", "LAST_NAME", "DEPT" 
    FROM public."TRN_PERSOANL_NAME"
    WHERE "RESP_UNIT" = '${dat.RESP_UNIT}' AND "STATUS" = 'A'
    `;
    // console.log(queryString);
    const { rows } = await pool.query(queryString);
    // console.log(rows);
    if (rows.length > 0) {
      return rows;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
};

const getSoldierById = async (dat) => {
  try {
    console.log(dat.PERSOANL_ID);
    const queryString = `
    SELECT personal."PERSOANL_ID",personal."FRIST_NAME", personal."LAST_NAME", personal."DEPT",
    pinfo."RTA_ID",pinfo."TA_ID", pinfo."YEAR",pinfo."BRITH_DATE", pinfo."BLOOD_GRUOP", pinfo."YEAR_ENTRY",
    pinfo."PHONE_NUMBER", pinfo."FACEBOOK", pinfo."TWITTER", pinfo."LIVE_WITH", pinfo."NICKNAME",pinfo."ID_CARD",
    familys."FAMILY_STATUS", familys."NAME_M", familys."LASTNAME_M", familys."AGE_M", 
    familys."CAREER_M", familys."INCOME_M", familys."STATUS_PRESENT_M", familys."NAME_F", 
    familys."LASTNAME_F", familys."AGE_F", familys."CAREER_F", familys."INCOME_F", familys."STATUS_PRESENT_F", 
    familys."STATUS_C", familys."NAME_W", familys."LASTNAME_W", familys."AGE_W", familys."CAREER_W", 
    familys."INCOME_W", familys."HEIR", familys."HEIR_M", familys."HEIR_W", 
    familys."RELATIONSHIP_R", familys."CONTACT_NAME", familys."CONTACT_LASTNAME",
    other."JOB_BEFORE_ENTRY", other."JOB_LOCATION", other."INCOME", other."ENGLISH", 
    "BURMESE", "KAREN", "LOCAL", "PROFESSIONAL", "MUSIC_TALENT", 
    other."SPORTS_TALENT", other."DRIVING_LICENSE", other."REASON", other."REASON_ENTRY", 
    other."LAT_HOME", other."LONG_HOME", other."LAWSUIT", other."DATE_LAWSUIT", other."RESULT_LAWSUIT", 
    other."OTHER",other."DRIVER",educate."GRADLEVEL", educate."GRADFROM",educate."STUDYREQ", 
    educate."ROYALREQ",unifrom."TRAINING_CLOTHES", unifrom."VNECK_SHIRT", unifrom."NIGHTDRESS", 
    unifrom."PANTS", unifrom."COMBAT", unifrom."SNEAKERS", unifrom."EXERCISE_SHOES"
    FROM public."TRN_PERSOANL_NAME" AS personal
    LEFT JOIN public."TRN_PERSOANL_INFO" AS pinfo
    ON personal."PERSOANL_ID" = pinfo."PERSOANL_ID"
    LEFT JOIN public."TRN_FAMILY_INFO" as familys
    ON personal."PERSOANL_ID" = familys."PERSONAL_ID"
    LEFT JOIN public."TRN_OTHER_INFO" as other
    ON personal."PERSOANL_ID" = other."PERSONAL_ID"
    LEFT JOIN public."TRN_EDUCATION" as educate
    ON personal."PERSOANL_ID" = educate."PERSONAL_ID"
    LEFT JOIN public."TRN_UNIFORM" as unifrom
    ON personal."PERSOANL_ID" = unifrom."PERSONAL_ID"
    WHERE personal."PERSOANL_ID" = '${dat.PERSOANL_ID}'
    `;
    // console.log(queryString);
    const addressQueryString = `
    SELECT "TYPEADDRESS", "ADDRESS1", "ADDRESS2", "ADDRESS3", "ADDRESS4", "PROVINCE", "DISTRICT", "SUBDISTRICT", "ZIPCODE"
	  FROM public."TRN_ADDRESS_INFO"
    WHERE "PERSONAL_ID" = '${dat.PERSOANL_ID}'
    `
    const hireInfo =`
    SELECT "HEIR_NAME"
	  FROM public."TRN_HEIR_NAME"
    WHERE "PERSONAL_ID" = '${dat.PERSOANL_ID}'
    `

    const result = []
    const info = await pool.query(queryString);
    const address = await pool.query(addressQueryString);
    const heir = await pool.query(hireInfo);

    result.push(info.rows)
    result.push(address.rows)
    if(heir.rows.length > 0){
      result.push(heir.rows)
    }
    if (result) {
      return result;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
};

const updateSoldierByid = async (dat) => {
    const personalId = '57875757';
    const personal_info = [
      {
        // PERSOANL_ID: personalId,
        RTA_ID: dat.rta_id,
        // TA_ID:"",
        // POSITION:"",
        BLOOD_GRUOP: dat.blood,
        YEAR: "1/66",
        NICKNAME: dat.nickname,
        BRITH_DATE: dat.brithday,
        YEAR_ENTRY: dat.rta_year,
        PHONE_NUMBER: dat.mobile,
        FACEBOOK: dat.fecebook,
        TWITTER: dat.twitter,
        LIVE_WITH: dat.live_with,
        ID_CARD: dat.idcard ? dat.idcard : dat.idCard,
        // PHONE_NUMBER_P:,
        MODIFY_USER: dat.modify_user,
        MODIFY_DATE: new Date().toISOString(),
      }
    ];
  
    const family_info = [
      {
        // PERSONAL_ID: personalId,
        FAMILY_STATUS: dat.family,
        NAME_M: dat.M_firstname,
        LASTNAME_M: dat.M_lastname,
        AGE_M: dat.M_age,
        CAREER_M: dat.M_career,
        INCOME_M: dat.M_income,
        STATUS_PRESENT_M: dat.M_status,
        NAME_F: dat.F_firstname,
        LASTNAME_F: dat.F_lastname,
        AGE_F: dat.F_age,
        CAREER_F: dat.F_career,
        INCOME_F: dat.F_income,
        STATUS_PRESENT_F: dat.F_status,
        STATUS_C: dat.army_status,
        NAME_W: dat.W_firstname,
        LASTNAME_W: dat.W_lastname,
        AGE_W: dat.W_age,
        CAREER_W: dat.W_career,
        INCOME_W: dat.W_income,
        HEIR: dat.W_child,
        HEIR_M: dat.W_son,
        HEIR_W: dat.W_daughter,
        RELATIONSHIP_R: dat.R_relationship,
        CONTACT_NAME: dat.R_firstname,
        CONTACT_LASTNAME: dat.R_lastname,
        MODIFY_USER: dat.modify_user,
        MODIFY_DATE: new Date().toISOString(),
      }
    ];
  
    const education_info = [
      {
        // PERSONAL_ID: personalId,
        GRADLEVEL: dat.educationLevel,
        GRADFROM: dat.S_name,
        STUDYREQ: dat.educationGenaral,
        ROYALREQ: dat.educationArmy,
        MODIFY_USER: dat.modify_user,
        MODIFY_DATE: new Date().toISOString(),
      }
    ];
    
    const address_info = [
      {
        // PERSONAL_ID: personalId,
        TYPEADDRESS: "P",
        ADDRESS1: dat.P_address,
        ADDRESS2: dat.P_moo,
        ADDRESS3: dat.P_soi,
        ADDRESS4: dat.P_road,
        PROVINCE: dat.P_province,
        DISTRICT: dat.P_district,
        SUBDISTRICT: dat.P_subDistrict,
        ZIPCODE: dat.P_zipcode,
        MODIFY_USER: dat.modify_user,
        MODIFY_DATE: new Date().toISOString(),
      },
      {
        // PERSONAL_ID: personalId,
        TYPEADDRESS: "O",
        ADDRESS1: dat.O_address,
        ADDRESS2: dat.O_moo,
        ADDRESS3: dat.O_soi,
        ADDRESS4: dat.O_road,
        PROVINCE: dat.O_province,
        DISTRICT: dat.O_district,
        SUBDISTRICT: dat.O_subDistrict,
        ZIPCODE: dat.O_zipcode,
        MODIFY_USER: dat.modify_user,
        MODIFY_DATE: new Date().toISOString(),
      },
      {
        // PERSONAL_ID: personalId,
        TYPEADDRESS: "F",
        ADDRESS1: dat.F_address,
        ADDRESS2: dat.F_moo,
        ADDRESS3: dat.F_soi,
        ADDRESS4: dat.F_road,
        PROVINCE: dat.F_province,
        DISTRICT: dat.F_district,
        SUBDISTRICT: dat.F_subDistrict,
        ZIPCODE: dat.F_zipcode,
        MODIFY_USER: dat.modify_user,
        MODIFY_DATE: new Date().toISOString(),
      },
      {
        // PERSONAL_ID: personalId,
        TYPEADDRESS: "M",
        ADDRESS1: dat.M_address,
        ADDRESS2: dat.M_moo,
        ADDRESS3: dat.M_soi,
        ADDRESS4: dat.M_road,
        PROVINCE: dat.M_province,
        DISTRICT: dat.M_district,
        SUBDISTRICT: dat.M_subDistrict,
        ZIPCODE: dat.M_zipcode,
        MODIFY_USER: dat.modify_user,
        MODIFY_DATE: new Date().toISOString(),
      },
      {
        // PERSONAL_ID: personalId,
        TYPEADDRESS: "W",
        ADDRESS1: dat.W_address,
        ADDRESS2: dat.W_moo,
        ADDRESS3: dat.W_soi,
        ADDRESS4: dat.W_road,
        PROVINCE: dat.W_province,
        DISTRICT: dat.W_district,
        SUBDISTRICT: dat.W_subDistrict,
        ZIPCODE: dat.W_zipcode,
        MODIFY_USER: dat.modify_user,
        MODIFY_DATE: new Date().toISOString(),
      },
      {
        // PERSONAL_ID: personalId,
        TYPEADDRESS: "R",
        ADDRESS1: dat.R_address,
        ADDRESS2: dat.R_moo,
        ADDRESS3: dat.R_soi,
        ADDRESS4: dat.R_road,
        PROVINCE: dat.R_province,
        DISTRICT: dat.R_district,
        SUBDISTRICT: dat.R_subDistrict,
        ZIPCODE: dat.R_zipcode,
        MODIFY_USER: dat.modify_user,
        MODIFY_DATE: new Date().toISOString(),
      },{
        // PERSONAL_ID: personalId,
        TYPEADDRESS: "S",
        ADDRESS1: dat.S_address,
        ADDRESS2: dat.S_moo,
        ADDRESS3: dat.S_soi,
        ADDRESS4: dat.S_road,
        PROVINCE: dat.S_province,
        DISTRICT: dat.S_district,
        SUBDISTRICT: dat.S_subDistrict,
        ZIPCODE: dat.S_zipcode,
        MODIFY_USER: dat.modify_user,
        MODIFY_DATE: new Date().toISOString(),
      }
    ];
    
    const uniform_info = [
      {
        // PERSONAL_ID: personalId,
        TRAINING_CLOTHES: dat.clothesSize1,
        VNECK_SHIRT: dat.clothesSize2,
        NIGHTDRESS: dat.clothesSize3,
        PANTS: dat.clothesSize4,
        COMBAT: dat.clothesSize5,
        SNEAKERS: dat.clothesSize6,
        EXERCISE_SHOES: dat.clothesSize7,
        MODIFY_USER: dat.modify_user,
        MODIFY_DATE: new Date().toISOString(),
      }
    ];
  
    const other_info = [
      {
        // PERSONAL_ID: personalId,
        JOB_BEFORE_ENTRY: dat.occupation,
        JOB_LOCATION: dat.workplace,
        INCOME: dat.income,
        ENGLISH: dat.englishLanguageAbility,
        BURMESE: dat.MyanmarLanguageAbility,
        KAREN: dat.karanLanguageAbility,
        LOCAL: dat.other_language,
        PROFESSIONAL: dat.jobAbility,
        // MUSIC_TALENT: dat.MusicAbility,
        SPORTS_TALENT: dat.SportAbility,
        DRIVER: dat.DriverAbility,
        DRIVING_LICENSE: dat.DriverLicense,
        REASON: dat.reasonForEnlistment,
        REASON_ENTRY: dat.reasonForEnlistment,
        // LAT_HOME:dat.,
        // LONG_HOME:dat.,
        LAWSUIT: dat.arrested,
        DATE_LAWSUIT: dat.dateArrested,
        RESULT_LAWSUIT: dat.resultArrested,
        OTHER: dat.note,
        MODIFY_USER: dat.modify_user,
        MODIFY_DATE: new Date().toISOString(),
      }
    ]

    const query_personal = `${_updateQuery(`public."TRN_PERSOANL_INFO"`,personal_info[0])} WHERE "PERSOANL_ID" = '${personalId}';`;
   
    // const query_address ='';
    // for (let i = 0; i < address_info.length; i++) {
    //   query_address += `${_updateQuery(`pulic."TRN_ADDRESS_INFO"`,address_info[i])} WHERE PERSONAL_ID = '${personalId}' AND TYPEADDRESS = '${address_info[i].TYPEADDRESS}';`;
    // }
    //loop array address_info concat to string from _updateQuery
    const query_address = address_info.map((item) => {
      return `${_updateQuery(`public."TRN_ADDRESS_INFO"`,item)} WHERE "PERSONAL_ID" = '${personalId}' AND "TYPEADDRESS" = '${item.TYPEADDRESS}';`;
    }).join('');


    const query_uniform = `${_updateQuery(`public."TRN_UNIFORM_INFO"`,uniform_info[0])} WHERE "PERSONAL_ID"= '${personalId}';`;
    const query_other = `${_updateQuery(`public."TRN_OTHER_INFO"`,other_info[0])} WHERE "PERSONAL_ID" = '${personalId}';`;
  
    try {
      const query = `${query_personal} ${query_address} ${query_uniform} ${query_other}`;
      console.log(query);
      const {rows} = await pool.query(query);

      // console.log(rows);
      if (rows) {
        return true;
      }else{
        return "เกิดข้อผิดพลาด ในการบันทึกข้อมูล";
      }
    } catch (error) {
      return error;
    }
  };
module.exports = { getSoldierlist, getSoldierById, updateSoldierByid};
