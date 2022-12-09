import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
        [newPost.pending]: (state, { payload }) => {
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