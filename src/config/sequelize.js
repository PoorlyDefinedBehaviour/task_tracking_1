const env = require("./env")

module.exports = {
  development: {
    database: env.getOrFail("DB_DATABASE"),
    username: env.getOrFail("DB_USERNAME"),
    password: env.getOrFail("DB_PASSWORD"),
    dialect: env.getOrFail("DB_DIALECT"),
    host: env.getOrFail("DB_HOST"),
    port: env.getOrFail("DB_PORT"),
  },
  test: {
    database: env.getOrFail("DB_DATABASE"),
    username: env.getOrFail("DB_USERNAME"),
    password: env.getOrFail("DB_PASSWORD"),
    dialect: env.getOrFail("DB_DIALECT"),
    host: env.getOrFail("DB_HOST"),
    port: env.getOrFail("DB_PORT"),
  },
}
