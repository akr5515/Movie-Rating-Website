import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../../components/blog-card/blog-card";
import ReactPaginate from "react-paginate";
import './Newsfeed.scss';

const Newsfeed=()=>{
    const [posts,setPosts]=useState();
    useEffect(()=>{

        axios.get('/posts/all')
        .then((response)=>{
            const data=response.data;
            setPosts(data);
            // console.log(data);
        });
    },[]);

    //doing paginate
    const [pageNumber,setPageNumber]=useState(0);
    const postsPerPage=3;
    const pagesVisited= pageNumber* postsPerPage;

    var displayPosts;
    var pageCount;

    if(posts){
        pageCount=Math.ceil(posts.length/postsPerPage);
        displayPosts= posts.slice(pagesVisited,pagesVisited+postsPerPage)
        .map((post)=>{
            return(
                <BlogCard post={post} />
            )
        });
    }

    const changePage=({selected})=>{
        setPageNumber(selected)
    }
    // console.log(posts);
    return(
        <div>
            <h1>Newsfeed</h1>
          

            {/* {posts && <BlogCard posts={posts}/>} */}
            {displayPosts}

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

export default Newsfeed;