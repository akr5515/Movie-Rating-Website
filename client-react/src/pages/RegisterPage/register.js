import axios from 'axios';
import React,{useEffect,useRef} from 'react';
import { useHistory } from 'react-router-dom';

import './register.scss';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import { userActions } from '../../store/username';

const RegisterPage=()=>{
    const dispatch=useDispatch();
    const history= useHistory();
    
    const nameInputRef=useRef();
    const emailInputRef=useRef();
    const passwordInputRef=useRef();
    const passwordConfirmInputRef=useRef();
    
    function submitFormHandler(event){
        event.preventDefault();
        const enteredName= nameInputRef.current.value;
        const enteredEmail= emailInputRef.current.value;
        const enteredPassword= passwordInputRef.current.value;
        const enteredConfirmPassword= passwordConfirmInputRef.current.value;

        if(enteredPassword!==enteredConfirmPassword){
            toast.warn('password dont match');
            return;
        }
        

        const data={
            name: enteredName,
            email: enteredEmail,
            password: enteredPassword,
            password_confirmation: enteredConfirmPassword,
        }

        axios.post('register',data)
        .then((response)=>{
            //console.log("got it");
            //this.setState({message: response.data.message});
            const data=response.data.message;
            toast.success(data);
            dispatch(authActions.login());
            dispatch(userActions.setUser(response.data.user.name));
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', response.data.user.id);
            localStorage.setItem('username', response.data.user.name);
            // this.setState({
            //     loggedIn:true
            // });

            // this.props.setUser(response.data.user);
            history.push('/home');
            
        })
        .catch((error)=>{
            console.log(error);
            if(error.response.status===422){
                toast.warn('Email already exists');
            }
        })
    }
     return(
        <div className="register">
            <div id="card">
                <div id="card-content">
                <div id="card-title">
                    <h2>Register</h2>
                    <div class="underline-title"></div>
                </div>

                <form onSubmit={submitFormHandler} class="form">
                    <label for="user-email" >
                        Name
                    </label>
                    <input id="user-email" ref={nameInputRef} class="form-content" type="text" name="name" autocomplete="off" required />
                    <div class="form-border"></div>
                    <label for="user-email" >
                        Email
                    </label>
                    <input id="user-email" ref={emailInputRef} class="form-content" type="email" name="email" autocomplete="off" required />
                    <div class="form-border"></div>
                    <label for="user-password" >Password
                    </label>
                    <input id="user-password" ref={passwordInputRef} class="form-content" type="password" name="password" required />
                    <div class="form-border"></div>
                    <label for="user-password" >Confirm Password
                    </label>
                    <input id="user-password" ref={passwordConfirmInputRef} class="form-content" type="password" name="password" required />
                    <div class="form-border"></div>

                    <input id="submit-btn" type="submit" name="submit" value="Register"  />
                </form>
                </div>
            </div>


            
        </div>
    )
}

export default RegisterPage;