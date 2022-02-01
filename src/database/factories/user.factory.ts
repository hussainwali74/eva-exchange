import { define, } from "typeorm-seeding"
//import { UserEntity } from "../../modules/user/dto/user.entity"
import Faker from 'faker'
import { UserEntity } from "src/modules/user/dto/user.entity"

// user.factory.ts
define(UserEntity, (faker: typeof Faker) => {

    const gender = faker.random.number(1)
    const firstName = faker.name.firstName(gender)
    const lastName = faker.name.lastName(gender)

    const user = new UserEntity()
    user.name = `${firstName} ${lastName}`
    user.email = faker.internet.email();
    user.password = faker.random.word()
    return user
})

