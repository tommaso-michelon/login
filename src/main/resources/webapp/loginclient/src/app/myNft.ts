import { User } from "./user";

export interface MyNft{
    name: string;
    owner?: User;   //no owner?
    price: number;
    image: string;
}