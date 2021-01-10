const Either = require("fp-ts/Either")
const UserModel = require("../models/user_model")

const exists = condition =>
  UserModel.findOne({ attributes: ["id"], where: condition }).then(Boolean)

const save = async userEntity => {
  try {
    const user = await UserModel.create(userEntity)

    return Either.right(user)
  } catch (error) {
    return Either.left(error)
  }
}

module.exports = {
  save,
  exists,
}
