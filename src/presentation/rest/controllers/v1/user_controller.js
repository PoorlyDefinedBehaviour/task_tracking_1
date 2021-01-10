const Either = require("fp-ts/Either")
const { StatusCodes } = require("http-status-codes")
const createUser = require("../../../../domain/usecases/users/create_user")

const store = (request, response) =>
  createUser(request.body).then(
    Either.fold(
      errors => response.status(StatusCodes.BAD_REQUEST).json(errors),
      user => response.status(StatusCodes.CREATED).json({ data: user })
    )
  )

module.exports = {
  store,
}
