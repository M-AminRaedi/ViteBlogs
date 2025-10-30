// --- import ---
import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { getAllUsers, deleteUser, createUser } from "../services/blogsServices";

const userAdaptor = createEntityAdapter();
const initialState = userAdaptor.getInitialState();

// --- Thunks ---
export const fetchUsers = createAsyncThunk("/users/fetchUsers", async () => {
    const response = await getAllUsers();
    return response.data;
});

export const deleteApiUser = createAsyncThunk(
    "/users/deleteApiUser",
    async (initialUserId) => {
        await deleteUser(initialUserId);
        return initialUserId;
    }
);

export const addNewUser = createAsyncThunk(
    "/users/addNewUser",
    async (initialUser) => {
        const response = await createUser(initialUser);
        return response.data;
    }
);

// --- Slice ---
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUsers.fulfilled, userAdaptor.setAll)

            .addCase(addNewUser.fulfilled, userAdaptor.addOne)

            .addCase(deleteApiUser.fulfilled, userAdaptor.removeOne);
    },
});

// --- Selectors ---

export const
    {
        selectAll: selectAllUsers,
        selectById: selectUserById
    } = userAdaptor.getSelectors((state) => state.users);

export default usersSlice.reducer;
 