import {IComment} from "./comment-type";
import {IUser} from "./user-type";
import {ILike} from "./like-type";
import { IMedia } from "./media-type";

export interface IPost{
    idA: number;
    title: string;
    text: string;
    created_at: Date;
    medias: IMedia[];
    comments: IComment[];
    reactions: ILike[];
    views: number;
    user: IUser;
}
