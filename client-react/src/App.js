import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';

import Navbar from './components/navbar/Navbar.component';
import Footer from './components/footer/footer.component';
import './App.scss';
import Homepage from './pages/Homepage/Homepage';
import ProfileUser from './pages/ProfileUser/ProfileUser';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import Newsfeed from './pages/Newsfeed/Newsfeed';
import LoginPage from './pages/LoginPage/login';
import RegisterPage from './pages/RegisterPage/register';
import CreateMovie from './components/create-movie/create-movie.component';
import DetailsComponent from './components/details-component/details.component';

//redux
import { useDispatch } from 'react-redux';
import { authActions } from './store/auth';
import { userActions } from './store/username';
import PostDetails from './components/post-details/post-details.component';
import ResetPassword from './components/reset-password/reset-password.component';
import ForgotPassword from './components/forgot-password/forgot-password.component';
import PostEditComponent from './components/post-edit/post-edit.component';

const App=()=>{
  const dispatch=useDispatch();

  const storedToken= localStorage.getItem('token');
  const storedUserName= localStorage.getItem('username');


  if(storedToken!==null){
    dispatch(authActions.login());
    dispatch(userActions.setUser(storedUserName));
  }

  return(
    <div className="master-div">
      <Navbar />
      <div className="second-div">
          <Switch>
            <Route path='/' exact>
              <Redirect to = '/home' />
            </Route>
            <Route path='/home'>
              <Homepage />
            </Route>

            <Route path='/login'>
              <LoginPage />
            </Route>

            <Route path='/register'>
              <RegisterPage />
            </Route>
            
            <Route path='/profileuser'>
              <ProfileUser/>
            </Route>

            <Route path='/category'>
              <CategoryPage />
            </Route>

            <Route path='/newsfeed'>
              <Newsfeed/>
            </Route>

            <Route path='/test'>
              <CreateMovie/>
            </Route>
            <Route path='/movie/addMovie'>
              <CreateMovie/>
            </Route>

            <Route path='/movie/description/:movieId'>
              <DetailsComponent/>
            </Route>

            <Route exact path='/post/:postId'>
              <PostDetails/>
            </Route>

            <Route exact path='/post/edit/:postId'>
              <PostEditComponent/>
            </Route>

            <Route path='/forgotPassword'>
              <ForgotPassword/>
            </Route>
            <Route path='/resetpassword/:codeId'>
              <ResetPassword/>
            </Route>
        </Switch>
      </div>
      
      <Footer />
    </div>
  )
}
export default App;
