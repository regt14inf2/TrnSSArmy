const { pool } = require("../db/db");
const ShortUniqueId = require("short-unique-id");

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

//Search Soldier
const registerSoldier = async (dat) => {
  const { PERSONAL_ID } = dat;
  try {
    let queryString = `SELECT * FROM public."TRN_PERSOANL_NAME" WHERE "PERSOANL_ID" = '${PERSONAL_ID}'`;
    const { rows } = await pool.query(queryString);
    if (rows.length > 0) {
      console.log(typeof rows);
      return rows;
    } else {
      return "ตรวจไม่พบข้อมูล กรุณาตรวจสอบ";
    }
  } catch (error) {
    // console.log(typeof(error))
    return error;
  }
};

//Submit Soldier
const submitSoldier = async (dat) => {
  const uid = new ShortUniqueId({ length: 10 });
  const personalId = uid();
  const personal_info = [
    {
      PERSOANL_ID: personalId,
      // RTA_ID:"",
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
      // PHONE_NUMBER_P:,
      CREATE_USER: dat.create_user,
      MODIFY_USER: dat.create_user,
      CREATE_DATE: new Date().toISOString(),
      MODIFY_DATE: new Date().toISOString(),
    }
  ]
  const family_info = [
    {
      PERSONAL_ID: personalId,
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
      CREATE_USER: dat.create_user,
      MODIFY_USER: dat.create_user,
      CREATE_DATE: new Date().toISOString(),
      MODIFY_DATE: new Date().toISOString(),
    }
  ]
  const education_info = [
    {
      PERSONAL_ID: personalId,
      GRADLEVEL: dat.educationLevel,
      GRADFROM: dat.S_name,
      STUDYREQ: dat.educationGenaral,
      ROYALREQ: dat.educationArmy,
      CREATE_USER: dat.create_user,
      MODIFY_USER: dat.create_user,
      CREATE_DATE: new Date().toISOString(),
      MODIFY_DATE: new Date().toISOString(),
    }
  ]

  const medical_info = [
    {
      PERSONAL_ID: personalId,
      DISEASE: dat.disease,
      TREATED: dat.hospitalHistory,
      D_ALLERGY: dat.drugAllergy,
      F_ALLERGY: dat.foodAllergy,
      WEIGHT: dat.weight,
      HEIGHT: dat.height,
      BMI: dat.bmi,
      RESULT: dat.bmiResult,
      RISK: dat.risk,
      DRUG: dat.drugUsed,
      DRUG_TYPE: dat.drugType,
      DRUGADDICT: dat.drugVUsed,
      YEAR_USED: dat.drugVUsedTime,
      REASON_U: dat.reasonUse,
      ALSOUSED: dat.drugVDisuse,
      DRUGVTYPE: dat.drugVType,
      // YEAR_STOPED:dat.,
      REASON_S: dat.reasonDisuse,
      CREATE_USER: dat.create_user,
      MODIFY_USER: dat.create_user,
      CREATE_DATE: new Date().toISOString(),
      MODIFY_DATE: new Date().toISOString(),
    }
  ]
  const hire_info = [];

  if (dat.familyForm.length > 0) {
    dat.familyForm.forEach((element) => {
      hire_info.push({
        PERSOANL_ID: personalId,
        HEIR_NAME: dat.C_firstname + " " + dat.C_lastname,
        CREATE_USER: dat.create_user,
        MODIFY_USER: dat.create_user,
        CREATE_DATE: new Date().toISOString(),
        MODIFY_DATE: new Date().toISOString(),
      });
    });
  }
  const address_info = [
    {
      PERSONAL_ID: personalId,
      TYPEADDRESS: "P",
      ADDRESS1: dat.P_address,
      ADDRESS2: dat.P_moo,
      ADDRESS3: dat.P_soi,
      ADDRESS4: dat.P_road,
      PROVINCE: dat.P_province,
      DISTRICT: dat.P_disrict,
      SUBDISTRICT: dat.P_subDistrict,
      ZIPCODE: dat.P_zipcode,
      CREATE_USER: dat.create_user,
      MODIFY_USER: dat.create_user,
      CREATE_DATE: new Date().toISOString(),
      MODIFY_DATE: new Date().toISOString(),
    },
    {
      PERSONAL_ID: personalId,
      TYPEADDRESS: "O",
      ADDRESS1: dat.O_address,
      ADDRESS2: dat.O_moo,
      ADDRESS3: dat.O_soi,
      ADDRESS4: dat.O_road,
      PROVINCE: dat.O_province,
      DISTRICT: dat.O_disrict,
      SUBDISTRICT: dat.O_subDistrict,
      ZIPCODE: dat.O_zipcode,
      CREATE_USER: dat.create_user,
      MODIFY_USER: dat.create_user,
      CREATE_DATE: new Date().toISOString(),
      MODIFY_DATE: new Date().toISOString(),
    },
    {
      PERSONAL_ID: personalId,
      TYPEADDRESS: "F",
      ADDRESS1: dat.F_address,
      ADDRESS2: dat.F_moo,
      ADDRESS3: dat.F_soi,
      ADDRESS4: dat.F_road,
      PROVINCE: dat.F_province,
      DISTRICT: dat.F_disrict,
      SUBDISTRICT: dat.F_subDistrict,
      ZIPCODE: dat.F_zipcode,
      CREATE_USER: dat.create_user,
      MODIFY_USER: dat.create_user,
      CREATE_DATE: new Date().toISOString(),
      MODIFY_DATE: new Date().toISOString(),
    },
    {
      PERSONAL_ID: personalId,
      TYPEADDRESS: "M",
      ADDRESS1: dat.M_address,
      ADDRESS2: dat.M_moo,
      ADDRESS3: dat.M_soi,
      ADDRESS4: dat.M_road,
      PROVINCE: dat.M_province,
      DISTRICT: dat.M_disrict,
      SUBDISTRICT: dat.M_subDistrict,
      ZIPCODE: dat.M_zipcode,
      CREATE_USER: dat.create_user,
      MODIFY_USER: dat.create_user,
      CREATE_DATE: new Date().toISOString(),
      MODIFY_DATE: new Date().toISOString(),
    },
    {
      PERSONAL_ID: personalId,
      TYPEADDRESS: "W",
      ADDRESS1: dat.W_address,
      ADDRESS2: dat.W_moo,
      ADDRESS3: dat.W_soi,
      ADDRESS4: dat.W_road,
      PROVINCE: dat.W_province,
      DISTRICT: dat.W_disrict,
      SUBDISTRICT: dat.W_subDistrict,
      ZIPCODE: dat.W_zipcode,
      CREATE_USER: dat.create_user,
      MODIFY_USER: dat.create_user,
      CREATE_DATE: new Date().toISOString(),
      MODIFY_DATE: new Date().toISOString(),
    },
    {
      PERSONAL_ID: personalId,
      TYPEADDRESS: "R",
      ADDRESS1: dat.R_address,
      ADDRESS2: dat.R_moo,
      ADDRESS3: dat.R_soi,
      ADDRESS4: dat.R_road,
      PROVINCE: dat.R_province,
      DISTRICT: dat.R_disrict,
      SUBDISTRICT: dat.R_subDistrict,
      ZIPCODE: dat.R_zipcode,
      CREATE_USER: dat.create_user,
      MODIFY_USER: dat.create_user,
      CREATE_DATE: new Date().toISOString(),
      MODIFY_DATE: new Date().toISOString(),
    },
  ];
  const uniform_info = [
    {
      PERSONAL_ID: personalId,
      TRAINING_CLOTHES: dat.clothesSize1,
      VNECK_SHIRT: dat.clothesSize2,
      NIGHTDRESS: dat.clothesSize3,
      PANTS: dat.clothesSize4,
      COMBAT: dat.clothesSize5,
      SNEAKERS: dat.clothesSize6,
      EXERCISE_SHOES: dat.clothesSize7,
      CREATE_USER: dat.create_user,
      MODIFY_USER: dat.create_user,
      CREATE_DATE: new Date().toISOString(),
      MODIFY_DATE: new Date().toISOString(),
    }
  ]
  let time = [];
  let res = dat.timeline[0];

  time.push(
    res.time.map((item, index) => {
      if (item) {
        return {
          PERSONAL_ID: personalId,
          TIME_TIMELINE: item.toString(),
          PRACTICS: res.practice[index],
          NOTE: res.note[index],
          DATE_TIMELINE: res.date[index],
          LOCATION: res.location[index],
          ITEM_TIMELINE: index,
          CREATE_USER: dat.create_user,
          MODIFY_USER: dat.create_user,
          CREATE_DATE: new Date().toISOString(),
          MODIFY_DATE: new Date().toISOString(),
        };
      }
    })
  );
  const timeline_info = time[0].filter((item, index) => {
    if (item) return item;
  });

  const covidServey_info = [
    {
      PERSONAL_ID: personalId,
      WHERE_DISTICE: dat.whereDistice,
      WHERE_PROVINCE: dat.whereProvince,
      Q1: dat.q1,
      Q2: dat.q2,
      Q3: dat.q3,
      Q4: dat.q4,
      Q5: dat.q5,
      Q6: dat.q6,
      Q7: dat.q7,
      OVERALL: dat.overall,
      CREATE_USER: dat.create_user,
      MODIFY_USER: dat.create_user,
      CREATE_DATE: new Date().toISOString(),
      MODIFY_DATE: new Date().toISOString(),
    }
  ]

  const other_info = [
    {
      PERSONAL_ID: personalId,
      JOB_BEFORE_ENTRY: dat.occupation,
      JOB_LOCATION: dat.workplace,
      INCOME: dat.income,
      ENGLISH: dat.englishLanguageAbility,
      BURMESE: dat.MyanmarLanguageAbility,
      KAREN: dat.karanLanguageAbility,
      LOCAL: dat.other_language,
      PROFESSIONAL: dat.jobAbility,
      MUSIC_TALENT: dat.MusicAbility,
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
      CREATE_USER: dat.create_user,
      MODIFY_USER: dat.create_user,
      CREATE_DATE: new Date().toISOString(),
      MODIFY_DATE: new Date().toISOString(),
    }
  ]

  const query_address = `INSERT INTO public."TRN_ADDRESS_INFO" (${_columnInsert(
    address_info
  )}) VALUES ${_multiInsert(address_info)}`;
  const query_timeline = `INSERT INTO public."TRN_TIMELINE"(${_columnInsert(
    timeline_info
  )}) VALUES ${_multiInsert(
    timeline_info
  )}`;
  const query_uniform = `INSERT INTO public."TRN_UNIFORM" (${_columnInsert(
    uniform_info
  )}) VALUES ${_multiInsert(uniform_info)}`;
  const query_covidServey = `INSERT INTO public."TRN_SERVEY_COVID" (${_columnInsert(
    covidServey_info
  )}) VALUES ${_multiInsert(covidServey_info)}`;
  const query_other = `INSERT INTO public."TRN_OTHER_INFO" (${_columnInsert(
    other_info
  )}) VALUES ${_multiInsert(other_info)}`;
  const query_education = `INSERT INTO public."TRN_EDUCATION" (${_columnInsert(
    education_info
  )}) VALUES ${_multiInsert(education_info)}`;
  const query_family = `INSERT INTO public."TRN_FAMILY_INFO" (${_columnInsert(
    family_info
  )}) VALUES ${_multiInsert(family_info)}`;
  const query_medical = `INSERT INTO public."TRN_MEDICAL" (${_columnInsert(
    medical_info
  )}) VALUES ${_multiInsert(medical_info)}`;
  const query_personal = `INSERT INTO public."TRN_PERSOANL_INFO" (${_columnInsert(
    personal_info
  )}) VALUES ${_multiInsert(personal_info)}`;

  const query = `BEGIN; 
      ${query_personal}; 
      ${query_address}; 
      ${query_uniform}; 
      ${query_timeline}; 
      ${query_covidServey}; 
      ${query_other}; 
      ${query_education}; 
      ${query_family}; 
      ${query_medical}; 
      COMMIT;`;
  
  try {
    const {rows} = await pool.query(query);
    if (rows) {
      return true;
    }else{
      return true;
    }
  } catch (error) {
    return error;
  }
};

module.exports = { registerSoldier, submitSoldier };
