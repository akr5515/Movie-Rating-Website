import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

//redux
import { useSelector } from 'react-redux';

import './details.style.scss';

//rating 
import {FaStar} from 'react-icons/fa';
import CommentsComponent from '../comments/comments.component';
import DetailsCardComponent from '../details-card/details-card.component';
import { toast } from 'react-toastify';

const DetailsComponent=()=>{
    const isAuth=useSelector(state=>state.auth.isAuthenticated);


    const params=useParams();
    const {movieId}=params;
    //rating
    const [rating,setRating]=useState(null);
    const [reload,setReload]=useState(0);
    const [rateReload,setRateReload]=useState(0);

    var reloadChk=1;
    //username
    const username=useSelector(state=>state.user.username);

    const [movie,setMovie]=useState();
    //state for comments
    const [comments, setComments]=useState([]);
    const commentInputRef=useRef();
    //refs for rating
    const ratingInputRef=useRef();
    const userId= localStorage.getItem('user');
    // console.log(userId);
    useEffect(()=>{
        const req={
            id: movieId
        }

        axios.post('/movie/showOne',req)
        .then((response)=>{
            // console.log(response.data);
            const data=response.data;
            setMovie(data.movie);
            // console.log(movie);
        });
    },[rateReload]);

    const giveRating=()=>{
        const data={
            user_id:userId,
            movie_id: movieId,
            rating: rating
        }
        axios.post('/movie/rating/store', data)
        .then((response)=>{
            const data=response.data;
            setRateReload(Math.random());
            toast.success('Rating given');
            // console.log(movie);
        })
    }

    const addComment=()=>{
        const data={
            user_id:userId,
            movie_id: movieId,
            comment: commentInputRef.current.value,
            username: username
        }
        axios.post('/movie/comments/store', data)
        .then((response)=>{
            const data=response.data;
            console.log(data);
            setReload(Math.random());
            commentInputRef.current.value="";
        })
    }

    useEffect(()=>{
        const data={
            movie_id: movieId,
        }
        axios.post('/movie/comments/show-one',data)
        .then((response)=>{
            // console.log(response.data);
            const data=response.data.data;
            setComments(data);
            // console.log(data);
            
        });
    },[reload]);



    // console.log(rating);
    return(
        <div className="details-card-main">
            {movie && <DetailsCardComponent movie={movie} />}
  
            {isAuth && <div className="give-rating">
                <h3>Give Rating</h3>
                <div className="star">
                    {
                    [...Array(5)].map((star,i)=>{
                        const ratingValue=i+1;
                        return(
                            <label>
                                <input type='radio' name="rating"  value={ratingValue} onClick={()=>setRating(ratingValue)} />
                                <FaStar 
                                size={50} 
                                    color={ratingValue<=rating? "#ffc107": "#e4e5e9"}
                                /> <br/>
                            </label>
                        )
                    })
                }
                </div>
                <button onClick={giveRating}>Give rate</button>

                
            </div>}

            <div className="comments">
                <h3>Comments</h3>
                {isAuth && <div className="comment-submit">
                    <input type='text' ref={commentInputRef}/> <br/>
                    <button onClick={addComment}>Give Comment</button>

                </div>}

                 {comments && <CommentsComponent comments={comments} />}
            </div>
        </div>
    )
}

export default DetailsComponent;
