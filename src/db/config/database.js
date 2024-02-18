require('dotenv/config')

const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_DIALECT } = process.env

module.exports = {
  dialect: DB_DIALECT,
  host: DB_HOST,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  define: {
    timestamps: true
  }
}