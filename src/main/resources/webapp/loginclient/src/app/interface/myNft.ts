import { User } from "./user";
import { Image } from "./image";

export interface MyNft{
    name: string;
    owner?: User;
    price: number;
    image: Image;
    isSold: boolean;
}