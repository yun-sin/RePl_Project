import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { pending, fulfilled, rejected } from '../../helper/ReduxHelper';
import axios from 'axios'

export const getList = createAsyncThunk('BulletinSlice/getList', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.get(process.env.REACT_APP_EDITOR_TEST);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    if (result.rtcode === 200) {
        return result.item;
    }

    return result.rtmsg;
});

export const newPost = createAsyncThunk('BulletinSlice/newPost', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.post(process.env.REACT_APP_EDITOR_TEST, payload);

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
        getCurrentData: (state, action) => {
            return state;
        }
    },
    extraReducers: {
        /** 전체 게시물 데이터 가져오기 */
        [getList.pending]: pending,
        [getList.fulfilled]: fulfilled,
        [getList.rejected]: rejected,

        /** 게시물 저장 */
        [newPost.pending]: pending,
        [newPost.fulfilled]: fulfilled,
        [newPost.rejected]: rejected,
    }
});

export const { getCurrentData } = BulletinSlice.actions;
export default BulletinSlice.reducer;