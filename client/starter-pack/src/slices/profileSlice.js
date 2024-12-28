import {createSlice} from "@reduxjs/toolkit";


let initialState = {
   
    loading:false,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    
}

export const profileSlice = createSlice({
    name:"profile",
    initialState,
    reducers:{
        setUser : (state, action) =>{
            state.user = action.payload
        },
        setLoading: (state, action) =>{
            state.loading = action.payload
        }
    }
})

export const {setUser, setLoading} = profileSlice.actions

// when we create slice reducer function automatically generated.
export default profileSlice.reducer