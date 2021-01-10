const Either = require("fp-ts/Either")
const User = require("../../entities/user_entity")

const userRepository = require("../../../infra/repositories/user_repository")

const createUser = async data => {
  const result = await User.create(data)

  if (Either.isLeft(result)) {
    return result
  }

  if (await userRepository.exists({ email: data.email })) {
    return Either.left([
      {
        type: "validation",
        field: "email",
        message: "Esse email já está em uso",
      },
    ])
  }

  return userRepository.save(result.right)
}

module.exports = createUser
