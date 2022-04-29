import { User } from "./user";
import { Image } from "./image";

export interface MyNft{
    name: string;
    owner?: User;   //no owner?
    price: number;
    image: Image;
}