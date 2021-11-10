import React from "react";

import './movie-card.style.scss';
import Image from '../../utils/image.jpg'
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const MovieCard=({mvs})=>{
    console.log(mvs);
    return(
        <div className="movies">
            {mvs && mvs.map(mv=>(
                <div className="card" key={mv.id}>
                <img src={`${process.env.REACT_APP_IMAGEURL}${mv.image}`} alt="Avatar" />
                
                    <h2><b>{mv.title}</b></h2>
                    <p>Rating: </p>
                    <div className="star">
                        
                        {
                        [...Array(5)].map((star,i)=>{
                            const ratingValue=i+1;
                            return(
                                <label>
                                    <FaStar 
                                    size={20} 
                                        color={ratingValue<=mv.rating? "#ffc107": "#e4e5e9"}
                                    /> <br/>
                                </label>
                            )
                        })
                        }
                    </div>
                    <div className="details">
                    <Link to={`/movie/description/${mv.id}`}><b>Details</b></Link>
                    </div>
                
                </div>
            ))}
            
        </div>
       
    );
}

export default MovieCard;