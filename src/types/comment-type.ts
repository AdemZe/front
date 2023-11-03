import {IUser} from "./user-type";
import {IPost} from "./post-type";

export interface IComment{
    idC: number;
    text: string;
    created_at: Date;
    owner: IUser;
    post: IPost;
}