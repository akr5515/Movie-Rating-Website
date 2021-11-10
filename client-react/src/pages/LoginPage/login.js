import axios from 'axios';
import React,{useEffect,useRef} from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import { userActions } from '../../store/username';

import './login.scss';
//react toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { adminActions } from '../../store/admin';

toast.configure();

const LoginPage=()=>{
    const dispatch= useDispatch();
    const history=useHistory();

    const emailInputRef=useRef();
    const passwordInputRef=useRef();

    function submitFormHandler(event){
        event.preventDefault();

        const data={
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value
        }

        axios.post('/login',data)
        .then((response)=>{
            //console.log("got it");
            // this.setState({message: response.data.message});
            dispatch(authActions.login());
            dispatch(userActions.setUser(response.data.user.name));
            if(response.data.user.is_admin==1){
                dispatch(adminActions.login());
                toast.success('Login as Admin');
            }else{
                toast.success('Login Success');
            }
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', response.data.user.id);
            localStorage.setItem('username', response.data.user.name);
            
            history.push('/home');
            

        })
        .catch((error)=>{
            if(error.response.status===401){
                toast.error('Invalid credentials');
            }
        })
    }

    return(
        <div className="login">
            <div id="card">
                <div id="card-content">
                <div id="card-title">
                    <h2>LOGIN</h2>
                    <div class="underline-title"></div>
                </div>

                <form onSubmit={submitFormHandler} class="form">
                    <label for="user-email" >
                        &nbsp;Email
                    </label>
                    <input id="user-email" ref={emailInputRef} class="form-content" type="email" name="email" autocomplete="on" required />
                    <div class="form-border"></div>
                    <label for="user-password" >Password
                    </label>
                    <input id="user-password" ref={passwordInputRef} class="form-content" type="password" name="password" required />
                    <div class="form-border"></div>
                    <a href="#">
                    <legend id="forgot-pass"><Link to="/forgotPassword" > Forgot password? </Link></legend>
                    </a>
                    <input id="submit-btn" type="submit" name="submit" value="LOGIN"  />
                    <a href="#" id="signup">Don't have account yet?</a>
                </form>
                </div>
            </div>
            

            
        </div>
    )
}

export default LoginPage;