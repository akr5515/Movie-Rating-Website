import React from 'react';
import { FaStar } from 'react-icons/fa';


import './details-card.style.scss';

import parse from 'html-react-parser';

const DetailsCardComponent = ({movie}) => {
    return (
        <div>
            <div id="container">	
	
            <div class="product-details">
                
            <h1>{ movie.title }</h1>
            {movie.rating && <span class="hint-star star">
                <div className="star">
                        {
                        [...Array(5)].map((star,i)=>{
                            const ratingValue=i+1;
                            return(
                                <label>
                                    <FaStar 
                                    size={20} 
                                        color={ratingValue<=movie.rating? "#ffc107": "#e4e5e9"}
                                    /> <br/>
                                </label>
                            )
                        })
                        }
                    </div>
            </span>}
                
                    <p class="information"> {parse(`${movie.description}`) }
                     </p>

                
                
        
                    
        </div>
            
        <div class="product-image">
            
            <img src={`${process.env.REACT_APP_IMAGEURL}${movie.image}`} alt="" />
            
        </div>

        </div>
        </div>
    );
}

export default DetailsCardComponent;
