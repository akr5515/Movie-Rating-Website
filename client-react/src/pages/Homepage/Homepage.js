import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import MovieCard from "../../components/movie-card/movie-card.component";

import './Homepage.scss';

//spinner
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Homepage=()=>{
    const [movies,setMovies]=useState([]);
    const [topRatedMovies,setTopRatedmovies]=useState([]);
    const [worseRatedMovies,setWorseRatedMovies]=useState([]);

    const [chk,setChk]= useState(0);
    useEffect(()=>{
        axios.get('/movie/index')
        .then((response)=>{
            // console.log(response.data);
            const data=response.data;
            setMovies(data);
            setChk(1);
        });
    },[]);

    useEffect(()=>{
        axios.get('/movie/desc-rating')
        .then((response)=>{
            // console.log(response.data);
            const data=response.data;
            setTopRatedmovies(data);
            setChk(1);
        });
    },[]);

    useEffect(()=>{
        axios.get('/movie/asc-rating')
        .then((response)=>{
            // console.log(response.data);
            const data=response.data;
            setWorseRatedMovies(data);
        });
    },[]);

    //doing paginate
    const [pageNumber,setPageNumber]=useState(0);
    const postsPerPage=5;
    const pagesVisited= pageNumber* postsPerPage;

    var displayMovies;
    var pageCount;

    if(movies){
        pageCount=Math.ceil(movies.length/postsPerPage);
        displayMovies= movies.slice(pagesVisited,pagesVisited+postsPerPage);
        
    }

    const changePage=({selected})=>{
        setPageNumber(selected)
    }

    if(chk==0){
        return(
            <div className='homepage'>
                <Loader
                type="TailSpin"
                color="black"
                height={100}
                width={100}
                timeout={3000} //3 secs
            />
            </div>
        )
    }else  return(
        <div className='homepage'>  
            <h1>Top Rated</h1>
            <div className="movie-card">
                
                {topRatedMovies && <MovieCard mvs={topRatedMovies}/>}
                
            </div>

            <h1>Worse Rated movies</h1>
            <div className="movie-card">
                {worseRatedMovies && <MovieCard mvs={worseRatedMovies}/>}
            </div>

            <h1>All movies</h1>
            <div className="movie-card">
                <div>
                    {displayMovies && <MovieCard mvs={displayMovies}/>}
                </div>
                
            </div>
            <ReactPaginate 
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
        </div>
    );
}

export default Homepage;