const { Sequelize } = require("sequelize")
const env = require("../../config/env")

const configs = require("../../config/sequelize")

const config = configs[env.getOrFail("NODE_ENV")]

const sequelize = new Sequelize(config)

module.exports = sequelize
