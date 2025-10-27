// --- import ---
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers, deleteUser, createUser } from "../services/blogsServices";

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
    initialState: {
        users: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addNewUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            .addCase(deleteApiUser.fulfilled, (state, action) => {
                state.users = state.users.filter(
                    (user) => user.id !== action.payload
                );
            });
    },
});

// --- Selectors ---
export const selectAllUsers = (state) => state.users.users;

export const selectUserById = (state, userId) =>
    state.users.users.find((user) => user.id === userId);

export default usersSlice.reducer;
