import { define, } from "typeorm-seeding"
//import { UserEntity } from "../../modules/user/dto/user.entity"
import Faker from 'faker'
import { ShareEntity } from "src/modules/share/dto/share.entity"

// user.factory.ts
define(ShareEntity, (faker: typeof Faker) => {

    const gender = faker.random.number(1)
    const firstName = faker.name.firstName(gender)
    const lastName = faker.name.lastName(gender)

    const share = new ShareEntity()
    const split = firstName.split()
    let arr = []
    for (let i = 0; i < 3; i++) {
        arr.push(split[i]);
    }
    share.symbol = arr.join('');
    share.price = faker.random.number().toFixed(2)
    share.registered = true
    return share
})

