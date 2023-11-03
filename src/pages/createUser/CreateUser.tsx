import {FC, useEffect, useState} from 'react';
import './createuser.scss'
import FormGroup from "../../components/common/formGroup/FormGroup";
import FileUpload from "../../components/fileUpload/FileUpload";
import Button from "../../components/common/button/Button";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import {useAppSelector, useAuth, useTitle} from "../../hooks";
import NotFound from "../404/NotFound";
import UserService from '../../services/user-service';
import { IUser } from '../../types/user-type';
import { API_URL } from '../../http';


const CreateUser: FC = () => {
    const {role} = useAuth()
    const {userId} = useParams()
    const [file, setFile] = useState<any>(null)
    const {user, isAuth} = useAppSelector(state => state.auth)
    const [currentUser, setCurrentUser] = useState<IUser>({} as IUser)
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [error, setError] = useState('')
    const [notFound, setNotFound] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    useTitle(userId ? 'Edit user' : 'Create user')

    useEffect(() => {
        if(userId){            
            UserService.getById(Number(userId))
                .then(response => {
                    if(isAuth && role !== "admin"){
                        setNotFound(true)
                        return
                    }
                    setCurrentUser(response.data)                    
                })
                .catch((err) => {
                    console.log(err);
                    
                    setNotFound(true)
                })
        }
    }, [userId, user, isAuth])


    const onSubmit = async (data: any) => {
        let response
        setIsLoading(true)
        
        try{
            if(userId){
                response = await UserService.updateUser(
                    Number(userId),
                    data["Username"] === '' ? currentUser.username : data["Username"],
                    data["First Name"] === '' ? currentUser.firstName : data["First Name"],
                    data["Last Name"] === '' ? currentUser.lastName : data["Last Name"],
                    data["Email"] === '' ? currentUser.email : data["Email"],
                    data["Password"],
                    file
                )
            }else{
                response = await UserService.createUser(data["Username"], data["First Name"], data["Last Name"], data["Email"], data["Password"], file);
            }
            navigate(`/users`);
        }catch(e: any){
            const response = e.response?.data.message
            if(Array.isArray(response))setError(response[0])
            else setError(response)
        }finally {
            setIsLoading(false)
        }

    }

    if(notFound){
        return <NotFound/>
    }

    return (
        <div className={'createPost'}>
            <div className={'postInner'}>
                <h2>{userId ? 'Edit user' : 'Create new user'}</h2>
                    <FileUpload
                        defaultImageURL={Object.keys(currentUser).length > 0 ? API_URL + '/' + currentUser.profilePicture : null}
                        displayImage={true}
                        handleFile={(file: File | undefined) => setFile(file)}
                    />
                    <FormGroup
                        fieldName={'Username'}
                        register={register}
                        errors={errors}
                        placeholder={'Enter username...'}
                        isRequired={!userId}
                        defaultValue={Object.keys(currentUser).length > 0 ? currentUser.username : null}
                    />

                    <FormGroup
                        fieldName={'First Name'}
                        register={register}
                        errors={errors}
                        placeholder={'Enter firstname...'}
                        isRequired={!userId}
                        defaultValue={Object.keys(currentUser).length > 0 ? currentUser.firstName : null}
                    />

                    <FormGroup
                        fieldName={'Last Name'}
                        register={register}
                        errors={errors}
                        placeholder={'Enter lastname...'}
                        isRequired={!userId}
                        defaultValue={Object.keys(currentUser).length > 0 ? currentUser.lastName : null}
                    />

                    <FormGroup
                        fieldName={'Email'}
                        register={register}
                        errors={errors}
                        placeholder={'Enter email...'}
                        isRequired={!userId}
                        defaultValue={Object.keys(currentUser).length > 0 ? currentUser.email : null}
                    />
                    <FormGroup
                        fieldName={'Password'}
                        register={register}
                        errors={errors}
                        type={'password'}
                        placeholder={'Enter password...'}
                        isRequired={!userId}
                        defaultValue={null}
                    />
                    
                {!userId}
                    <div className={'createBottom'}>
                        <div className={'createButton'}>
                            <Button
                                handleClick={handleSubmit(onSubmit)}
                                text={userId ? 'Save' : 'Create'}
                                progress={isLoading && <CircularProgress style={{color: 'white'}} size={20}/>}
                            />
                        </div>
                        {error && <div className={'alert danger'}>{error}</div>}
                    </div>
            </div>
        </div>
    );
};

export default CreateUser;