import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPost = createAsyncThunk('BulletinSlice/gePost', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.get(process.env.REACT_APP_EDITOR_TEST, {
            params: {
                id: payload.id
            }
        });

        result = response.data;
    } catch (err) {
        rejectWithValue(err.response);
    }

    return result;
});

export const newPost = createAsyncThunk('BulletinSlice/newPost', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.post(process.env.REACT_APP_EDITOR_TEST, {
            "body": payload
        });

        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

const BulletinSlice = createSlice({
    name: 'BulletinSlice',
    initialState: {
        data: null,
        loading: false,
        error: null
    },
    reducers: {

    },
    extraReducers: {
        [getPost.pending]: (state, { payload }) => {
            return {
                data: payload,
                loading: true,
                error: null
            }
        },
        [getPost.fulfilled]: (state, { payload }) => {
            return {
                data: payload,
                loading: false,
                error: null
            }
        },
        [getPost.rejected]: (state, { payload }) => {
            return {
                data: payload,
                loading: false,
                error: {
                    code: payload?.status ? payload.status : 500,
                    message: payload?.statusText ? payload.statusText : 'Server Error'
                }
            }
        },
        [getPost.pending]: (state, { payload }) => {
            return {
                data: payload,
                loading: true,
                error: null
            }
        },
        [newPost.fulfilled]: (state, { payload }) => {
            return {
                data: payload,
                loading: false,
                error: null
            }
        },
        [newPost.rejected]: (state, { payload }) => {
            return {
                data: payload,
                loading: false,
                error: {
                    code: payload?.status ? payload.status : 500,
                    message: payload?.statusText ? payload.statusText : 'Server Error'
                }
            }
        },
    }
});

export default BulletinSlice.reducer;