import { configureStore } from "@reduxjs/toolkit";

import blogsReducer from "../reducers/blogSlice";
import usersReducer, { fetchUsers } from "../reducers/userSlice";

export const store = configureStore({
    reducer: {
        blogs: blogsReducer,
        users: usersReducer,
    },
});

//Fetch all users from api
store.dispatch(fetchUsers());
