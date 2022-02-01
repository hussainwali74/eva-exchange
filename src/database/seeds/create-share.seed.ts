import { ShareEntity } from "src/modules/share/dto/share.entity"
import { Connection } from "typeorm"
import { Factory, Seeder } from "typeorm-seeding"

export default class CreateShares implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(ShareEntity)().createMany(1)
    }
}

