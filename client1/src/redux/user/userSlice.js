import { createSlice } from "@reduxjs/toolkit";



const initialState ={
    currentUser: null,
    isLoading: false,
    error: null,

}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signInStart: (state)=>{
            state.isLoading = true;
            state.error = null;
        },
        signInSuccess: (state, action)=>{
            state.isLoading = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        signInFailure: (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        },
        signOut: (state)=>{
            state.currentUser = null;
            state.error = null;
        },
        signUpStart: (state)=>{
            state.isLoading = true;
            state.error = null;
        },
        signUpSuccess: (state, action)=>{
            state.isLoading = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        signUpFailure: (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})
export const { signInStart, signInSuccess, signInFailure, signOut, signUpStart, signUpSuccess, signUpFailure } = userSlice.actions;
export default userSlice.reducer;


