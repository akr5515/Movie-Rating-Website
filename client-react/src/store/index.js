import {configureStore} from '@reduxjs/toolkit';

import authReducer from './auth';
import userReducer from './username'
import adminReducer from './admin';

const store = configureStore({
  reducer: { user: userReducer,auth: authReducer, admin: adminReducer },
});

export default store;