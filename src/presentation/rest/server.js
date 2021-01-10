const express = require("express")
const cors = require("cors")
const userRouter = require("./routes/users/v1")
const { env } = require("../../config/env")

const app = express().use(express.json()).use(cors()).use(userRouter)

const startServer = () => new Promise(resolve => app.listen(env.PORT, resolve))

module.exports = {
  app,
  startServer,
}
