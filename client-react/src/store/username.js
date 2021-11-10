import { createSlice } from "@reduxjs/toolkit";

const initialUsername={
    username: ""
}

const userSlice=createSlice({
    name: 'usercheck',
    initialState: initialUsername,
    reducers:{
        setUser(state,action){
            state.username=action.payload;
        },
        logout(state){
            state.username="";
        }
    }
})

export const userActions= userSlice.actions;

export default userSlice.reducer;