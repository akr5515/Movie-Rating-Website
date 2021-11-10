import axios from 'axios';
import React, { Component, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword=()=>{
    const params=useParams();
    const {codeId}=params;
    const emailInputRef= useRef();
    const passwordInputRef=useRef();
    const passwordConfirmInputRef=useRef();
    const email= localStorage.getItem('emailForgot');
    const history=useHistory();

    function submitFormHandler(event){
        event.preventDefault();
        const data={
            email: email,
            token: codeId,
            password: passwordInputRef.current.value,
            password_confirmation: passwordConfirmInputRef.current.value
        }

        if(passwordInputRef.current.value!==passwordConfirmInputRef.current.value){
            toast.warn('password dont match');
            return;
        }

        axios.post('/resetpassword',data)
        .then((response)=>{
            console.log(response.data);
            localStorage.removeItem('emailForgot');
            toast.success('Password Changed');
            history.push('/home');

        })
        .catch((error)=>{
            console.log(error);
        })
    }
    // console.log(email);
            return (
            <div id="card">
                <div id="card-content">
                <div id="card-title">
                    <h2>Reset Password</h2>
                    <div class="underline-title"></div>
                </div>

                <form onSubmit={submitFormHandler} class="form">

                    <label for="user-password" >Password
                    </label>
                    <input id="user-password" ref={passwordInputRef} class="form-content" type="password" name="password" required />
                    <div class="form-border"></div>
                    <label for="user-password" >Confirm Password
                    </label>
                    <input id="user-password" ref={passwordConfirmInputRef} class="form-content" type="password" name="password" required />
                    <div class="form-border"></div>
                    <input id="submit-btn" type="submit" name="submit" value="Reset"  />
                </form>
                </div>
            </div>
        );
}
        

export default ResetPassword;
