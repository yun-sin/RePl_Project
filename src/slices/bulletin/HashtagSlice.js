import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { pending, fulfilled, rejected } from '../../helper/ReduxHelper';
import axios from 'axios';

export const getTags = createAsyncThunk('HashtagSlice/getTags', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.get(process.env.REACT_APP_BULLETIN_PATH + '/categories');

        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    if (result.rtcode === 200) {
        const data = [];
        const keys = Object.keys(result.item);

        for (const k of keys) {
            const temp = {};

            temp.fieldName = k;
            switch (k) {
                case 'whereArr': temp.subject = '어디로 가고 싶나요?'; break;
                case 'whoArr': temp.subject = '누구와 함께 하나요?'; break;
                case 'whatArr': temp.subject = '무엇을 하나요?'; break;
                case 'featureArr': temp.subject = '분위기와 특징'; break;
                case 'foodArr': temp.subject = '어떤 음식'; break;
                case 'drinkArr': temp.subject = '어떤 술/음료'; break;
                case 'categoryArr': temp.subject = '카테고리'; break;
                default: break;
            }
            temp.values = result.item[k];

            data.push(temp);
        }

        console.log(data);

        return data;
    }
    return result.rtmsg;
});

export const getPostsTags = createAsyncThunk('HashtagSlice/getPostsTags', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.get(process.env.REACT_APP_BULLETIN_PATH + '/getTags/' + payload);

        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    if (result.rtcode === 200) return result.item;
    return result.rtmsg;
});

const HashtagSlice = createSlice({
    name: 'HashtagSlice',
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
        /** 태그 가져오기 */
        [getTags.pending]: pending,
        [getTags.fulfilled]: fulfilled,
        [getTags.rejected]: rejected,

        /** 게시물에 선택된 태그들 가져오기 */
        [getPostsTags.pending]: pending,
        [getPostsTags.fulfilled]: fulfilled,
        [getPostsTags.rejected]: rejected,
    }
});

export const { getCurrentData } = HashtagSlice.actions;
export default HashtagSlice.reducer;