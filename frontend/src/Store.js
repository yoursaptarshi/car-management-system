import {configureStore} from "@reduxjs/toolkit";

import { userReducer } from "./Reducers/userReducer";
import { carReducer } from './Reducers/carReducer';




const store = configureStore({
    reducer:{
        user:userReducer,
        car: carReducer,        
    }
})

export default store;