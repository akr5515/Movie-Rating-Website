import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import MovieCard from "../../components/movie-card/movie-card.component";

import './CategoryPage.scss';

//select
import Select from 'react-select';
import { useSelector } from "react-redux";

import ReactPaginate from "react-paginate";


const CategoryPage=()=>{

    const isAdmin=useSelector(state=>state.admin.isAdmin);

    const categoryInputRef=useRef();
    const [categories,setCategories]=useState([]);
    const [movies,setMovies]=useState();
    const [reload,setReload]=useState(0);

    const categorySubmit=()=>{
        const data={
            name: categoryInputRef.current.value
        }
        axios.post('/category/store',data)
        .then((response)=>{
            console.log(response.data);
            categoryInputRef.current.value="";
            setReload(Math.random());
        })
    }
    
    useEffect(()=>{
        axios.get('/category/get-all')
        .then((response)=>{
            const data=response.data;
            setCategories(data);
        })
    },[reload]);

    const categorySelectHandler=(e)=>{
     const categoryId = e.target.value;
    //  console.log(categoryId); 
    const data={
        category_id: categoryId
    }
    axios.post('/category/movie-for-one',data)
    .then((response)=>{
        // console.log(response.data);
        setMovies(response.data);
    })
    }
    var categoryId=1;
    const SecondcategoryChangeHandler=(e)=>{
        // console.log(e);
        // console.log(value);
        console.log(e);
         categoryId=e.value;
        const data={
        category_id: categoryId
    }
        axios.post('/category/movie-for-one',data)
    .then((response)=>{
        // console.log(response.data);
        setMovies(response.data);
    })
    }

    useEffect(()=>{
        const data={
        category_id: categoryId
    }
        axios.post('/category/movie-for-one',data)
    .then((response)=>{
        // console.log(response.data);
        setMovies(response.data);
    })
    },[])

    // console.log(movies);

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

    return(
        <div>
            <h1>Category</h1>
            {isAdmin && <div className="addCategory">
                <h3>Add category</h3>
                <input type="text" name="category" ref={categoryInputRef}/>
                <button onClick={categorySubmit}>Add category</button>
            </div>}
            

            Select Categories


            {categories && <Select name="categories[]" 
                            onChange={SecondcategoryChangeHandler} 
                            
                            options={categories.map((o,i)=>{
                                return {id:i, value:o.id, label: o.name}
                            })}
            />}

            <div>
                Result of categories:
                
            </div>

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

export default CategoryPage;