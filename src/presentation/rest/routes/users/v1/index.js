const { Router } = require("express")
const userController = require("../../../controllers/v1/user_controller")
const withErrorHandler = require("../../../utils/with_error_handler")

const router = Router()

router.post("/api/v1/users", withErrorHandler(userController.store))

module.exports = router
