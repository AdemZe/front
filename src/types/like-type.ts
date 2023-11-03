import {IUser} from "./user-type";
import {IPost} from "./post-type";

export interface ILike{
    idR: number;
    type: number;
    owner: IUser;
    post: IPost;
}