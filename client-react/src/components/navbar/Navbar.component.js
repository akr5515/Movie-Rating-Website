import React from 'react';
import {NavLink ,useHistory} from 'react-router-dom';

import {useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import { userActions } from '../../store/username';

import LOGO from '../../utils/logo.png';

import './Navbar.style.scss';
import { adminActions } from '../../store/admin';

const Navbar=()=>{
    const isAuth=useSelector(state=>state.auth.isAuthenticated);
    const isAdmin=useSelector(state=>state.admin.isAdmin);

    const dispatch=useDispatch();
    const history=useHistory();

    function onLogoutHandler(){
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        dispatch(authActions.logout());
        dispatch(userActions.logout());
        dispatch(adminActions.logout());
        history.push('/home');
    }
    return(
        
        <header className="header">
            <NavLink activeClassName="navactive" to='/home'>
                <img src={LOGO} alt="logo" className="logo" />
            </NavLink>

            <ul className="right-header">
 
               {isAdmin && <li>
                    <NavLink activeClassName="navactive" to='/movie/addMovie'>
                        Add Movie
                    </NavLink>
                </li>}
                <li>
                    <NavLink activeClassName="navactive" to='/category'>
                        Categories
                    </NavLink>
                </li>

                <li>
                    <NavLink activeClassName="navactive" to='/newsfeed'>
                        NewsFeed
                    </NavLink>
                </li>
                {isAuth && <li>
                    <NavLink activeClassName="navactive" to='/profileuser'>
                        AddPost
                    </NavLink>
                </li>}
                {!isAuth && <li>
                    <NavLink activeClassName="navactive" to='/login'>
                        Login
                    </NavLink>
                </li>}

                {!isAuth && <li>
                    <NavLink activeClassName="navactive" to='/register'>
                        Register
                    </NavLink>
                </li>}
                {isAuth && <li>
                    <button className="logout" onClick={onLogoutHandler}>Logout</button>
                </li>}
            </ul>
            
        </header>
    )
}

export default Navbar;