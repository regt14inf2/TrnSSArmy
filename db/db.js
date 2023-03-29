const { Pool} = require("pg");
const dotenv = require("dotenv")

dotenv.config()

const envConfig = process.env;

const credentials = {
  user: envConfig.PGUSER,
  host: envConfig.PGHOST,
  database: envConfig.PGDATABASE,
  password: envConfig.PGPASSWORD,
  port: 5432,
  ssl:true,
};

const pool = new Pool({credentials});

module.exports = {pool}