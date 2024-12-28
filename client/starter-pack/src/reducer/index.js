// here i am going to combine the different slices.

import {combineReducers} from "@reduxjs/toolkit"
import authReducer from "../slices/authSlice" // here i need to import only reducer function
import profileReducer from "../slices/profileSlice"
import cartReducer from "../slices/cartSlice"
import courseReducer from "../slices/courseSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    course: courseReducer,
})

export default rootReducer