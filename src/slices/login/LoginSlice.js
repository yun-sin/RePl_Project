import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { pending, fulfilled, rejected } from '../../helper/ReduxHelper';
import axios from 'axios';

export const addUser = createAsyncThunk('LoginSlice/addUser', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.post(process.env.REACT_APP_LOGIN_URL, payload);

        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

const LoginSlice = createSlice({
    name: 'LoginSlice',
    initialState: {
        data: null,
        loading: false,
        error: null
    },
    reducers: {
        getCurrentUser: (state, action) => {
            return state;
        }
    },
    extraReducers: {
        [addUser.pending]: pending,
        [addUser.fulfilled]: fulfilled,
        [addUser.rejected]: rejected
    }
});

export const { } = LoginSlice.actions;

export default LoginSlice.reducer;