import React, {FC, useEffect, useState} from 'react';
import './createpost.scss'
import FormGroup from "../../components/common/formGroup/FormGroup";
import FileUpload from "../../components/fileUpload/FileUpload";
import Button from "../../components/common/button/Button";
import {Editor} from "react-draft-wysiwyg";
import {ContentState, convertFromHTML, convertToRaw, EditorState} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {useForm} from "react-hook-form";
import PostService from "../../services/post-service";
import {useNavigate, useParams} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import {useAppSelector, useAuth, useTitle} from "../../hooks";
import {IPost} from "../../types/post-type";
import draftToHtml from "draftjs-to-html";
import NotFound from "../404/NotFound";


const CreatePost: FC = () => {
    const {role} = useAuth()
    const {postId} = useParams()
    const [file, setFile] = useState<any>(null)
    const {user, isAuth} = useAppSelector(state => state.auth)
    const [currentPost, setCurrentPost] = useState<IPost>({} as IPost)
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const [error, setError] = useState('')
    const [notFound, setNotFound] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    useTitle(postId ? 'Edit' : 'Create')

    useEffect(() => {
        if(postId){            
            PostService.getById(Number(postId))
                .then(response => {
                    if(isAuth && role !== "admin"){
                        setNotFound(true)
                        return
                    }
                    setCurrentPost(response.data)
                    setEditorState(EditorState.createWithContent(
                        ContentState.createFromBlockArray(convertFromHTML(response.data.text).contentBlocks)
                     ))
                })
                .catch((err) => {
                    console.log(err);
                    
                    setNotFound(true)
                })
        }
    }, [postId, user, isAuth])


    const onSubmit = async (data: any) => {
        let response
        const stringFromHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        setIsLoading(true)
        try{
            if(postId){
                response = await PostService.updatePost(data['Title'] === '' ? currentPost.title : data['Title'], stringFromHtml, currentPost.medias[0].url, currentPost.idA, file)
            }else{
                response = await PostService.createPost(file, data['Title'], stringFromHtml, user.id)
            }
            navigate(`/posts/${response.data.idA}`)
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
                <h2>{postId ? 'Edit post' : 'Create new post'}</h2>
                    <FileUpload
                        defaultImageURL={Object.keys(currentPost).length > 0 ? currentPost.medias[0].url : null}
                        displayImage={true}
                        handleFile={(file: File | undefined) => setFile(file)}
                    />
                    <FormGroup
                        fieldName={'Title'}
                        register={register}
                        errors={errors}
                        placeholder={'Enter title...'}
                        isRequired={!postId}
                        defaultValue={Object.keys(currentPost).length > 0 ? currentPost.title : null}
                    />
                    <div className={'editor'}>
                        <Editor
                            editorState={editorState}
                            toolbarClassName={'toolbarClassName'}
                            wrapperClassName={'wrapperClassName'}
                            editorClassName={'editorClassName'}
                            onEditorStateChange={(state: any) => setEditorState(state)}
                        />
                    </div>
                {!postId}
                    <div className={'createBottom'}>
                        <div className={'createButton'}>
                            <Button
                                handleClick={handleSubmit(onSubmit)}
                                text={postId ? 'Save' : 'Create'}
                                progress={isLoading && <CircularProgress style={{color: 'white'}} size={20}/>}
                            />
                        </div>
                        {error && <div className={'alert danger'}>{error}</div>}
                    </div>
            </div>
        </div>
    );
};

export default CreatePost;