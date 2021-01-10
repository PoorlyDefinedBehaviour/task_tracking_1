const StatusCodes = require("http-status-codes")

const withErrorHandler = handler => async (request, response, next) => {
  try {
    return await handler(request, response, next)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
  }
}

module.exports = withErrorHandler
