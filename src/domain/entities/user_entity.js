const Either = require("fp-ts/Either")
const yup = require("yup")
const formatYupError = require("../../utils/format_yup_error")

const schema = yup.object().shape({
  name: yup
    .string()
    .nullable()
    .required({ message: "O nome do usuário deve ser informado" })
    .min(3, {
      message: "O nome do usuário deve conter no mínimo 3 caracteres",
    })
    .max(254, {
      message: "O nome do usuário pode conter no máximo 254 caracteres",
    }),
  email: yup
    .string()
    .nullable()
    .required({ message: "O email do usuário deve ser informado" })
    .email({ message: "O email deve ser válido" })
    .max(254, {
      message: "O email do usuário pode conter no máximo 254 caracteres",
    }),
})

class User {
  static async create(props) {
    try {
      await schema.validate(props, { abortEarly: false })

      const user = new User()

      return Either.right(Object.assign(user, props))
    } catch (error) {
      return Either.left(formatYupError(error))
    }
  }
}

module.exports = User
