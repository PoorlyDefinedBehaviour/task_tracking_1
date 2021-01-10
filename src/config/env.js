const dotenv = require("dotenv")

const allowedNodeEnvs = ["test", "development", "production"]

const readEnvVariables = () => {
  const nodeEnv = process.env.NODE_ENV

  if (!nodeEnv || !allowedNodeEnvs.includes(nodeEnv)) {
    throw new Error(`NODE_ENV must at least be one of: ${allowedNodeEnvs}`)
  }

  if (nodeEnv === "test") {
    dotenv.config({ path: ".env.testing" })
    return
  }
  if (nodeEnv === "development") {
    dotenv.config({ path: ".env" })
  }
}

readEnvVariables()

const get = key => process.env[key]

const getOrFail = key => {
  const value = get(key)
  if (!value) {
    throw new Error(`env variable: ${key} is not set`)
  }

  return value
}

module.exports = { get, getOrFail }
