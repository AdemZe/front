import {AxiosResponse} from "axios";
import {AuthResponse} from "../types/auth-response";
import api from "../http/index";
import { IUser } from "../types/user-type";

export default class AuthService{
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return api.post<AuthResponse>('/auth/login', {username: email, password})
    }
    static async registration(firstName: string, lastName: string, email: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return api.post<AuthResponse>('/auth/register', {firstName, lastName, email, password})
    }
    static async logout(): Promise<void>{
        return new Promise(resolve => resolve());
    }

    static async updateProfile(usernmae: string, firstName: string, lastName: string, picture?: any): Promise<AxiosResponse<IUser>>{
        const formData = new FormData()
        formData.append('username', usernmae)
        formData.append('firstName', firstName)
        formData.append('lastName', lastName)
        if(picture){
            formData.append('file', picture)
        }

        return api.put<IUser>('/auth/profile', formData)
    }
}