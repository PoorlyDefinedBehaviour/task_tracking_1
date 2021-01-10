const request = require("supertest")
const StatusCodes = require("http-status-codes")
const faker = require("faker")
const { app } = require("../../server")
const User = require("../../../../domain/entities/user_entity")
const factory = require("../../../../../test/factory")

describe("user controller test suite", () => {
  describe("POST /api/v1/users", () => {
    test("when name is invalid, should return an error", async () => {
      const testCases = [
        {
          input: undefined,
          expected: [
            {
              type: "validation",
              field: "name",
              message: "O nome do usuário deve ser informado",
            },
          ],
        },
        {
          input: null,
          expected: [
            {
              type: "validation",
              field: "name",
              message: "O nome do usuário deve ser informado",
            },
          ],
        },
        {
          input: "",
          expected: [
            {
              type: "validation",
              field: "name",
              message: "O nome do usuário deve ser informado",
            },
            {
              type: "validation",
              field: "name",
              message: "O nome do usuário deve conter no mínimo 3 caracteres",
            },
          ],
        },
        {
          input: faker.random.alphaNumeric(2),
          expected: [
            {
              type: "validation",
              field: "name",
              message: "O nome do usuário deve conter no mínimo 3 caracteres",
            },
          ],
        },
        {
          input: faker.random.alphaNumeric(255),
          expected: [
            {
              type: "validation",
              field: "name",
              message: "O nome do usuário pode conter no máximo 254 caracteres",
            },
          ],
        },
      ]

      for (const { input, expected } of testCases) {
        const user = await factory.build(User, { name: input })

        const response = await request(app)
          .post("/api/v1/users")
          .send(user)
          .expect(StatusCodes.BAD_REQUEST)

        expect(response.body).toEqual(expected)
      }
    })

    test("when email is invalid, should return an error", async () => {
      const testCases = [
        {
          input: undefined,
          expected: [
            {
              type: "validation",
              field: "email",
              message: "O email do usuário deve ser informado",
            },
          ],
        },
        {
          input: null,
          expected: [
            {
              type: "validation",
              field: "email",
              message: "O email do usuário deve ser informado",
            },
          ],
        },
        {
          input: "",
          expected: [
            {
              type: "validation",
              field: "email",
              message: "O email do usuário deve ser informado",
            },
          ],
        },
        {
          input: `${faker.random.alphaNumeric(254)}@email.com`,
          expected: [
            {
              type: "validation",
              field: "email",
              message:
                "O email do usuário pode conter no máximo 254 caracteres",
            },
          ],
        },
      ]

      for (const { input, expected } of testCases) {
        const user = await factory.build(User, { email: input })

        const response = await request(app)
          .post("/api/v1/users")
          .send(user)
          .expect(StatusCodes.BAD_REQUEST)

        expect(response.body).toEqual(expected)
      }
    })

    test("when email is already in use, should return an error", async () => {
      const { email } = await factory.create(User)

      const user = await factory.build(User, { email })

      const response = await request(app)
        .post("/api/v1/users")
        .send(user)
        .expect(StatusCodes.BAD_REQUEST)

      expect(response.body).toEqual([
        {
          type: "validation",
          field: "email",
          message: "Esse email já está em uso",
        },
      ])
    })

    test("when all validation passes, should create an user", async () => {
      const user = await factory.build(User)

      const response = await request(app)
        .post("/api/v1/users")
        .send(user)
        .expect(StatusCodes.CREATED)

      expect(response.body).toMatchObject({ data: user })
    })
  })
})
