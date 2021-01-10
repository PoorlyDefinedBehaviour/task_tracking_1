const faker = require("faker")
const UserEntity = require("../src/domain/entities/user_entity")
const UserModel = require("../src/infra/models/user_model")

const entityFactoryMap = new Map()

entityFactoryMap.set(UserEntity, {
  model: UserModel,
  factory: props => ({
    name: faker.internet.userName(),
    email: faker.internet.email(),
    ...props,
  }),
})

const getEntityBuilder = entity => {
  const entityBuilder = entityFactoryMap.get(entity)
  if (!entityBuilder) {
    throw new Error(`entity ${entity.name} is not registered`)
  }

  return entityBuilder
}

const build = (entity, props) => {
  const entityBuilder = getEntityBuilder(entity)

  return entityBuilder.factory(props)
}

const create = async (entity, props) => {
  const entityBuilder = getEntityBuilder(entity)

  const data = await entityBuilder.factory(props)

  const instance = await entityBuilder.model.create(data)

  return instance
}

module.exports = {
  build,
  create,
}
