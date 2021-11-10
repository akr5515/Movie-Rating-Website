import axios from 'axios';
import React, { Component, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CommentsComponent from '../comments/comments.component';
import DetailsCardComponent from '../details-card/details-card.component';
import './post-details.style.scss';

const PostDetails=()=> {
    const isAuth=useSelector(state=>state.auth.isAuthenticated);
        const params=useParams();
            const history=useHistory();

    const {postId}=params;

    //username
    const username=useSelector(state=>state.user.username);
    // console.log(username);
    // console.log(movieId);
    const [post,setPost]=useState();
    //state for comments
    const [comments, setComments]=useState([]);
    const commentInputRef=useRef();
    //refs for rating
    const ratingInputRef=useRef();
    const userId= localStorage.getItem('user');
    // console.log(userId);

    const [reload,setReload]=useState(0);

    useEffect(()=>{
        const req={
            id: postId
        }

        axios.post('/posts/get-one',req)
        .then((response)=>{
            // console.log(response.data);
            const data=response.data;
            setPost(data.post);
            // console.log(data);
        });
    },[]);

    useEffect(()=>{
        const data={
            post_id: postId,
        }
        axios.post('/movie/comments/show-one',data)
        .then((response)=>{
            // console.log(response.data);
            const data=response.data.data;
            setComments(data);
            // console.log(data);
            
        });
    },[]);

    const addComment=()=>{
        const data={
            user_id:userId,
            post_id: postId,
            comment: commentInputRef.current.value,
            username: username
        }
        axios.post('/posts/comments/store', data)
        .then((response)=>{
            const data=response.data;
            console.log(data);
            setReload(Math.random());
            commentInputRef.current.value="";
        })
    }

    useEffect(()=>{
        const data={
            post_id: postId,
        }
        axios.post('/posts/comments/show-one',data)
        .then((response)=>{
            // console.log(response.data);
            const data=response.data.data;
            setComments(data);
            // console.log(data);
            
        });
    },[reload]);
    const deletePost=()=>{
        const data={
            id: postId,
            user_id:userId
        }
        console.log(data);
        axios.post('/posts/delete-one',data)
        .then((response)=>{
            const data=response.data;
            console.log(data);
            toast.success('Deleted');
            history.push('/newsfeed');
        }).catch((e)=>console.log(e));
    }
    console.log(post);

    return(
        <div className="post-details-card">
            {post && <div className='author-post'>
                 <h1>Author: {post.name} </h1>

            </div>
            }
            <div>
                {post && <DetailsCardComponent movie={post} />}

            </div>
            {post && userId== post.user_id && <div className="edit-post">
                 <Link to={`/post/edit/${postId}`}><h5>Edit</h5></Link>

            </div>}
            {post && userId== post.user_id &&<div className="delete">
                 <button onClick={deletePost}  className="button-delete">Delete</button> 

            </div>}


            <div className="comments">
                <h2>Comments</h2>
                {isAuth && <div className="comment-submit">
                    <input type='text' ref={commentInputRef}/>
                     <button onClick={addComment}>Give Comment</button>
                </div>}
                

                {comments && <CommentsComponent comments={comments} />}
            </div>
        </div>
    )
}

export default PostDetails;
