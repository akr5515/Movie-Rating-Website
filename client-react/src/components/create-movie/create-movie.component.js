import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import './create-movie.style.scss';

//select
import Select from 'react-select';
//ckeditor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CreateMovie=()=>{
    const history=useHistory();

    const [file, setFile]= useState();
    const [filename,setFilename]=useState();
    const titleInputRef=useRef();
    // const descriptionInputRef=useRef();
    const [description,setDesctiption]=useState();
    
    //for categories
    const [categories,setCategories]=useState([]);

    const [selectedCategory,setSelectedCategory]=useState([1]);

    const onChange=(e)=>{
        setFile(e.target.files[0]);
        console.log(e.target.files[0]);
        setFilename(e.target.files[0].name);
        // console.log(file);
    }

    function submitFormHandler(event){
        event.preventDefault();
       
        const fd = new FormData(); 
        fd.append("image", file);
        fd.append("title", titleInputRef.current.value);
        fd.append("description", description);
        fd.append("categories", selectedCategory);
         console.log(...fd.entries());

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        axios.post('/movie/store', fd, config)
        .then((response)=>{
            const data= response.data;
            console.log(data);
            history.push('/home');
        })
        .catch((error)=> console.log(error));
    }

    useEffect(()=>{
        axios.get('/category/get-all')
        .then((response)=>{
            const data=response.data;
            setCategories(data);
        })
    },[]);


    const SecondcategoryChangeHandler=(e)=>{
        // console.log(e);
        // console.log(value);
        var options = e; 
        var value = []; 
        for (var i = 0, l = options.length; i < l; i++) 
        { 
            value.push(options[i].value);
            
        } 
        console.log(value); 
        setSelectedCategory(value);
        setSelectFor(e);
    }
    // console.log(categories);
    // console.log(selectedCategory);

    //select
    const [selectFor, setSelectFor]=useState([]);

    const CKeditorChange=( event, editor ) => {
                        const data = editor.getData();
                        console.log( data );
                        setDesctiption(data);
                    }

    return(
        <div>
            

            <div id="card">
                <div id="card-content">
                <div id="card-title">
                    <h2>Add movie</h2>
                    <div class="underline-title"></div>
                </div>

                <form onSubmit={submitFormHandler} class="form">
                    <label for="user-title" >
                        Title
                    </label>
                    <input id="user-email" ref={titleInputRef} class="form-content" type="text" name="email" autocomplete="on" required />
                    <div class="form-border"></div>

                    <label for="user-email" >
                        Description
                    </label>
                    <CKEditor
                    editor={ ClassicEditor }
                    data=""
                    
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
                    {file && <img
                        src={URL.createObjectURL(file)}
                        className="side-image"
                        alt="Thumb"
                    />}
                                        <div class="form-border"></div>                    

                    <div>

                        {categories && <Select name="categories[]"
                        isMulti
                            onChange={SecondcategoryChangeHandler} 
                            value={selectFor}
                            options={categories.map((o,i)=>{
                                return {id:i, value:o.id, label: o.name}
                            })}
                        />}
                    </div>
                    <div class="form-border"></div>
                    <input id="submit-btn" type="submit" name="submit" value="Add Movie"  />
                </form>
                </div>
            </div>

            
        </div>
    );
}

export default CreateMovie;