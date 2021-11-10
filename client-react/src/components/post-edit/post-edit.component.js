import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import './post-edit.style.scss';

//ckeditor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
const PostEditComponent = () => {

    const params=useParams();
            const history=useHistory();

    const {postId}=params;
    const titleInputRef=useRef();
    const descriptionInputRef=useRef();
    const [description,setDesctiption]=useState();


    const [post,setPost]=useState();
    const [file, setFile]= useState();
    const [filename,setFilename]=useState();
    const onChange=(e)=>{
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
        console.log(file);
    }

    const userId= localStorage.getItem('user');

    useEffect(()=>{
        const req={
            id: postId
        }

        axios.post('/posts/get-one',req)
        .then((response)=>{
            // console.log(response.data);
            const data=response.data;
            titleInputRef.current.value=data.post.title;
            setPost(data.post);
            // console.log(data);
        });
    },[]);

    function updatePost(event){
        event.preventDefault();
       
        const fd = new FormData(); 
        fd.append("user_id", userId);
        fd.append("id", postId);
        fd.append("image", file);
        fd.append("title", titleInputRef.current.value);
        fd.append("description", description);
        
         console.log(...fd.entries());
        
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        axios.post('/posts/update-one', fd, config)
        .then((response)=>{
            const data= response.data;
            console.log(data);
            history.push('/newsfeed');
        })
        .catch((error)=> console.log(error));
    }

    const CKeditorChange=( event, editor ) => {
                        const data = editor.getData();
                        console.log( data );
                        setDesctiption(data);
                    }
    var ckData="";
    if(post){
        ckData=post.description;
    }
                    // console.log(post);
    return (
        <div>
            
            <h1>Update the post</h1>

            <div id="card">
                <div id="card-content">
                <div id="card-title">
                </div>

                <form onSubmit={updatePost} class="form">
                    <label for="user-title" >
                        Title
                    </label>
                    <input id="user-email" ref={titleInputRef} class="form-content" type="text" name="title" required />
                    <div class="form-border"></div>

                    <label for="user-email" >
                        Description
                    </label>
                    <CKEditor
                    editor={ ClassicEditor }
                    data={ckData}
                    
                    onChange={ CKeditorChange }

                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
                   
                                        <div class="form-border"></div>                    

                    <label for="user-email" >
                        Image
                    </label>
                    <input id="user-image"  onChange={onChange} class="form-content" type="file" name="image" required />
                    <div class="form-border"></div>                    
                    {file && <img
                        src={URL.createObjectURL(file)}
                        className="side-image"
                        alt="Thumb"
                    />}
                    {!file && post && <img
                        src={`${process.env.REACT_APP_IMAGEURL}${post.image}`}
                        className="side-image"
                        alt="Thumb"
                    />}
                    
                    <input id="submit-btn" type="submit" name="submit" value="Update Post"  />
                </form>
                </div>
            </div>
        </div>
    );
}

export default PostEditComponent;
