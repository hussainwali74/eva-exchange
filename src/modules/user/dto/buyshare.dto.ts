import { ShareEntity } from "src/modules/share/dto/share.entity";
import { UserEntity } from "./user.entity";

export class BuyShareDto {
    id: number;
    price: number
    user: UserEntity | number;
    share: ShareEntity | number;
}