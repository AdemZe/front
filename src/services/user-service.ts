import api from "../http";
import { Page } from "../types/page-type";
import {IUser} from "../types/user-type";
import {AxiosResponse} from "axios";

export default class UserService{

    static async getById(userId: number): Promise<AxiosResponse<IUser>>{
        return api.get<IUser>(`users/${userId}`);
    }

    static async createUser(username: string, firstName: string, lastName: string, email: string, password: string, picture?: any): Promise<AxiosResponse<IUser>>{
        const formData = new FormData()
        formData.append('username', username)
        formData.append('firstName', firstName)
        formData.append('lastName', lastName)
        formData.append('email', email)
        formData.append('password', password)
        if(picture){
            formData.append('file', picture)
        }

        return api.post<IUser>('/users', formData)
    }

    static async updateUser(userId: number, username: string, firstName: string, lastName: string, email: string, password: string, picture?: any): Promise<AxiosResponse<IUser>>{
        const formData = new FormData()
        formData.append('username', username)
        formData.append('firstName', firstName)
        formData.append('lastName', lastName)
        formData.append('email', email)
        formData.append('password', password)
        if(picture){
            formData.append('file', picture)
        }

        return api.put<IUser>(`/users/${userId}`, formData)
    }

    static async listUsers(): Promise<AxiosResponse<Page<IUser>>>{
        return api.get<Page<IUser>>('/users');
    }

    static async deleteUser(userId: number){
        return api.delete(`users/${userId}`);
    }

}