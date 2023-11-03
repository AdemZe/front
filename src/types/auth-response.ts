import {IUser} from "./user-type";


export interface AuthResponse{
    access_token: string;
    refreshToken: string;
    user: IUser;
}