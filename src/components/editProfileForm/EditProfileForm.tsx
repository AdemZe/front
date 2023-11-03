import React, {FC, useEffect, useState} from 'react';
import './editProfileForm.scss'
import Button from "../common/button/Button";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {setUser} from "../../store/reducers/auth/authSlice";
import AuthService from '../../services/auth-service';

interface EditProfileFormProps{
    file: File | null;
    setFile: any;
}

const EditProfileForm: FC<EditProfileFormProps> = ({file, setFile}) => {
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.auth)
    const [userInfo, setUserInfo] = useState({firstName: '', lastName: '', username: ''})
    const [message, setMessage] = useState('')

    useEffect(() => {
        setFile(null)
        if(Object.keys(user).length > 0){
            setUserInfo({...user})
        }
    }, [user, setFile])

    const onSubmit = (e: any) => {
        e.preventDefault()
        setMessage('')
        if(user.username === userInfo.username && user.firstName === userInfo.firstName &&
            user.lastName === userInfo.lastName && !file
        ){
            setMessage('Please edit fields!')
        }else{
            AuthService.updateProfile(user.username, userInfo.firstName, userInfo.lastName,file)
                .then(response => {
                    console.log(response);
                    
                    dispatch(setUser(response.data))
                    setMessage('Changes saved!')
                })
                .catch(error => setMessage(error.message))
        }
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo({...userInfo, [e.target.name]: e.target.value})
    }
    return (
        <form className={'editProfileForm'}>
            <label className="field field_v2">
                <input
                    name={'username'}
                    value={userInfo.username}
                    onChange={onChange}
                    className="field__input"
                />
                <span className="field__label-wrap">
                    <span className="field__label">User Name</span>
                </span>
            </label>
            <label className="field field_v2">
                <input
                    name={'firstName'}
                    value={userInfo.firstName}
                    onChange={onChange}
                    className="field__input"
                />
                <span className="field__label-wrap">
                    <span className="field__label">First name</span>
                </span>
            </label>
            <label className="field field_v2">
                <input
                    name={'lastName'}
                    value={userInfo.lastName}
                    onChange={onChange}
                    className="field__input"
                />
                <span className="field__label-wrap">
                    <span className="field__label">Last name</span>
                </span>
            </label>
            <div className={'submitProfileChanges'}>
                <div className={'profileSaveBtn'}>
                    <Button handleClick={onSubmit} type={'submit'}  text={'Save'}/>
                </div>
                {message &&
                    <span className={message === 'Changes saved!' ? 'submitSuccess' : 'submitError'}>
                        {message}
                    </span>
                }
            </div>
        </form>
    );
};

export default EditProfileForm;