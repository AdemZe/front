import { IActivity } from "./activity-type";
import {IPost} from "./post-type";

export interface IUser{
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: string;
    profilePicture: string;
    posts: IPost[];
    activity: IActivity;
}