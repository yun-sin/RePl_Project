import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { pending, fulfilled, rejected } from '../helper/ReduxHelper';

export const getComment = createAsyncThunk("PlaceCommentSlice/addComment", async (payload, { rejectWithValue }) => {
    let result = null;
    const URL = process.env.REACT_APP_PLACE_REVIEW;
    const { place_id } = payload;
    
    try {
        const response = await axios.get(`${URL}?place_id=${place_id}`);
        result = response.data;
    } catch (err) {
        return (rejectWithValue(err.response));
    }

    if (result?.item) return result.item;
    else return result;
});

export const addComment = createAsyncThunk("PlaceCommentSlice/addComment", async (payload, { rejectWithValue }) => {
    let result = null;
    const URL = process.env.REACT_APP_PLACE_PATH;
    const { user_id, place_id, rating, content } = payload;

    try {
        const response = await axios.post(`${URL}`, {
            userId: user_id,
            placeId: place_id,
            rating: rating,
            content: content
        });

        result = response.data
    } catch (err) {
        return (rejectWithValue(err.response));
    }

    console.log(result);
    if (result?.item) return result.item;
    else return result;
});

const PlaceCommentSlice = createSlice({
    name: 'PlaceCommentSlice',
    initialState: {
        data: null,
        loading: false,
        error: null
    },
    extraReducers: {
        [getComment.pending]: pending,
        [getComment.fulfilled]: fulfilled,
        [getComment.rejected]: rejected,

        [addComment.pending]: pending,
        [addComment.fulfilled]: fulfilled,
        [addComment.rejected]: rejected,
    }
});

export default PlaceCommentSlice.reducer;