import { createSlice } from "@reduxjs/toolkit";

const initialAuthState={
    isAdmin:false
}

const adminSlice=createSlice({
    name: 'admin',
    initialState: initialAuthState,
    reducers:{
        login(state){
            state.isAdmin=true;
        },
        logout(state){
            state.isAdmin=false;
        }
    }
})

export const adminActions= adminSlice.actions;

export default adminSlice.reducer;