const _multiInsert = async(arrOfValues) => {
  // removes lastCharacter
  const _remLastChar = (str) => str.slice(0, str.length - 1);

  let foramttedQuery = "";

  await arrOfValues.forEach((row) => {
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

const _columnInsert = async (arrOfValues) => {
  try {
  
  const _remLastChar = (str) => str.slice(0, str.length - 1);
  let foramttedQuery = "";
  //object keys to query
  if(Object.keys(arrOfValues[0])){
    for (const key of Object.keys(arrOfValues[0])) {
     foramttedQuery = await foramttedQuery.concat(`"${key}",`);
    }
  }else{
    for (const key of Object.keys(arrOfValues)) {
      foramttedQuery = await foramttedQuery.concat(`"${key}",`);
    }
  }
  return _remLastChar(foramttedQuery);
  } catch (error) {
    return error
  }
};

// fuction genarate query update sql
const _updateQuery = async (data, table) => {
  try {
    let query = `UPDATE ${table} SET `;
    // await data.forEach((row) => {
        for (const key in data) {
        if (row.hasOwnProperty(key)) {
          const element = data[key];
          if (typeof element === "string") {
            query = await query.concat(`${key} = '${element}', `);
          } else if (typeof element === "number") {
            query = await query.concat(`${key} = ${element}, `);
          } else {
            query = await query.concat(`${key} = NULL, `);
          }
        }
      }
      query = await query.slice(0, query.length - 2);
      console.log(query);
    return query;
  } catch (error) {
    return error
  }
};

// // fuction genarate query multiple update sql
// const _multiUpdateQuery = async (data, table) => {
//   try {
//     let query = `UPDATE ${table} SET `;
//     for (const key in data) {
//       if (data.hasOwnProperty(key)) {
//         const element = data[key];
//         if (typeof element === "string") {
//           query = query.concat(`${key} = '${element}', `);
//         } else if (typeof element === "number") {
//           query = query.concat(`${key} = ${element}, `);
//         } else {
//           query = query.concat(`${key} = NULL, `);
//         }
//       }
//     }
//     query = query.slice(0, query.length - 2);
//     return query;
//   } catch (error) {
//     return error
//   }
// };



module.exports = {_multiInsert, _columnInsert, _updateQuery}