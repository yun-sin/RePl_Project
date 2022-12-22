import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPost = createAsyncThunk('BulletinSlice/getPost', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.get(process.env.REACT_APP_EDITOR_TEST + payload.id);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

export const newPost = createAsyncThunk('BulletinSlice/newPost', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.post(process.env.REACT_APP_EDITOR_TEST, {
            bgColor: payload.bgColor,
            postTitle: payload.postTitle,
            postDate: payload.postDate,
            postUser: payload.postUser,
            content: payload.content,
        });

        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

export const getMyReview = createAsyncThunk('BulletinSlice/getMyReview', async (payload, { rejectWithValue }) => {
    let result = null;

    /**
     * To Do: 지금 여기 data.json의 map 전부 다 불러오는데,
     * 나중에 릴레이션 테이블 만들면 내가 쓴 리뷰 필드 생성해서 거기서 불러와야 함
     */
    try {
        const response = await axios.get(process.env.REACT_APP_MY_REVIEW_PLACE);

        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }
    
    return result;
});

export const getTags = createAsyncThunk('BulletinSlice/getTags', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.get(process.env.REACT_APP_WHOLE_TAGS);

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
        /** 게시물 데이터 가져오기 */
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

        /** 게시물 저장 */
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

        /** 추천할 장소(내가 리뷰한) 불러오가 */
        [getMyReview.pending]: (state, { payload }) => {
            return {
                data: payload,
                loading: true,
                error: null
            }
        },
        [getMyReview.fulfilled]: (state, { payload }) => {
            return {
                data: payload,
                loading: false,
                error: null
            }
        },
        [getMyReview.rejected]: (state, { payload }) => {
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

export const { getCurrentData } = BulletinSlice.actions;
export default BulletinSlice.reducer;