import React from "react";
import { Link } from "react-router-dom";
import parse from 'html-react-parser';
import { useHistory } from "react-router-dom";

import './blog-card.scss';
import axios from "axios";

const BlogCard=({post})=>{
    const userId=localStorage.getItem('user');
    const history=useHistory();
    var date;
    if(post.created_at){
        date=post.created_at.split(" ");
    }
    console.log(post);
    return(
        <div>
                <div class="container" key={post.id}>
                    <div class="square">
                        <img src={`${process.env.REACT_APP_IMAGEURL}${post.image}`} alt="Avatar" class="mask" />
                    <div class="h1">
                        {post.title}
                    </div>
                    <p>Date: {date[0]} </p>
                        <p>{parse(`${post.description}`)}</p>
                        
                    <div className="buttons-group">
                        <Link to={`/post/${post.id}`}  className="button">Details</Link> 
                        
                        
                    </div>
                    </div>
                    
                    
                    
                    </div>
            {/* ))} */}
        </div>
        
            
                
            
            
    );
}

export default BlogCard;