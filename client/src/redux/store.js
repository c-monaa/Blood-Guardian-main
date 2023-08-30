import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import loadersReducer from "./loaderSlice";
const store = configureStore({
    reducer:{
        users: userReducer,
        loaders: loadersReducer,
    },
});

export default store;