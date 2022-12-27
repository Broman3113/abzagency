import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {tUserInitialState} from "../types/types";
import usersAPI from "../api/usersAPI";

const baseUrl = "https://frontend-test-assignment-api.abz.agency/api/v1";
export const fetchUsersThunk = createAsyncThunk(
    'users/fetchUsers',
    async (url: string | undefined, {dispatch, rejectWithValue}) => {
        try {
            const response = await fetch(url || `${baseUrl}/users?page=1&count=6`);
            if (!response.ok) throw new Error('Something went wrong!');
            const data = (await response.json()) as tUserInitialState;
            dispatch(setUsersData(data))
            return data;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message)
            }
            return console.log("ERROR", error)
        }
    }
)

export const postUserThunk = createAsyncThunk(
    'users/postUser',
    async (formData: FormData, {rejectWithValue, fulfillWithValue}) => {
        usersAPI.fetchToken()
            .then(token => usersAPI.postUser(token, formData))
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    return fulfillWithValue(data);
                } else {
                    return rejectWithValue(data)
                }
            })
            .catch(error => rejectWithValue(error.message))
    }
)
// usersAPI.fetchToken().then(r => console.log(r));
export const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        fetchStatus: {
            status: "success",
            error: null,
        },
        postStatus: {
            status: null,
            error: null,
        }
    } as unknown as tUserInitialState,
    reducers: {
        setUsersData: (state, action) => {
            state.success = action.payload.success;
            state.page = action.payload.page;
            state.total_pages = action.payload.total_pages;
            state.total_users = action.payload.total_users;
            state.count = action.payload.count;
            state.links = action.payload.links;
            state.users.push(...action.payload.users);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsersThunk.pending, (state) => {
            state.fetchStatus = {
                status: 'loading',
                error: null,
            };
        });
        builder.addCase(fetchUsersThunk.fulfilled, (state) => {
            state.fetchStatus = {
                status: 'success',
                error: null,
            }
        });
        builder.addCase(fetchUsersThunk.rejected, (state, action) => {
            state.fetchStatus = {
                status: 'error',
                error: action.payload as string,
            }
        });

        builder.addCase(postUserThunk.pending, (state) => {
            state.postStatus = {
                status: 'loading',
                error: null,
            };
        });
        builder.addCase(postUserThunk.fulfilled, (state) => {
            state.postStatus = {
                status: 'success',
                error: null,
            }
        });
        builder.addCase(postUserThunk.rejected, (state, action) => {
            state.postStatus = {
                status: 'error',
                error: action.payload as string,
            }
        });
    }
})

export const {setUsersData} = usersSlice.actions;
export default usersSlice.reducer;
