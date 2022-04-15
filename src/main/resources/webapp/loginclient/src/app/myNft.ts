import { User } from "./user";

export interface MyNft{
    name: string;
    id: number;
    owner?: User;   //no owner?
    price: number;
    image: string;
}