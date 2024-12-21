import {createSlice} from "@reduxjs/toolkit";


let initialState = {
    user:null,
}

export const profileSlice = createSlice({
    name:"profile",
    initialState,
    reducers:{
        setUser : (state, action) =>{
            state.user = action.payload
        }
    }
})

export const {setUser} = profileSlice.actions

// when we create slice reducer function automatically generated.
export default profileSlice.reducer