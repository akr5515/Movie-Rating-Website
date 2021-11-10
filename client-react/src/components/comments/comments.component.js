import React from 'react';

import './comments.style.scss';
const CommentsComponent = ({comments}) => {
    return (
        <div className="card-main">
            {comments && comments.map(comment=>(
                    <div className="container" key={comments.id} >
                        <div class="card-comment">
                            <div class="inner">
                                <h2 class="title"> {comment.comment} </h2>
                                <div class="subtitle"> {comment.username} </div>
                            </div><br/>
                        <div className="line"></div>
                        </div>
                        
                    </div>
                 ))}
        </div>
    );
}

export default CommentsComponent;
