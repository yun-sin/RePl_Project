import React, { memo, useCallback, useState } from 'react';
import styled from 'styled-components';

import RecommendListItem from '../../components/bulletin/RecommendListItem';
import breadSample from '../../assets/img/bulletin/bread_sample.jpg';

const MainForm = styled.form`
    width: 100%;
`;

const TitleArea = styled.div`
    width: 100%;
    margin: auto;
    height: 400px;
    position: relative;

    .title-edit-menu {
        display: flex;
        flex-flow: column nowrap;
        position: absolute;
        right: 20%;
        top: 10%;

        label,
        button,
        input {
            display: inline-block;
            width: 30px;
            height: 30px;
            margin: 5px 0;

            border: 1px solid #aaa;
            background-color: white;
            text-align: center;
            line-height: 30px;
            font-size: 15px;
            font-weight: 600;

            &:hover {
                cursor: pointer;
            }
        }
    }

    .title-input {
        width: 500px;
        height: 150px;
        background-color: #00000022;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
        box-sizing: border-box;
        padding: 10px;

        input {
            background: none;
            border: none;
            color: white;

            &::placeholder {
                color: white;
            }
        }

        .title-input__main-title {
            width: 480px;
            height: 70px;
            font-size: 40px;
            margin-bottom: 20px;
        }

        .title-input__desc {
            width: 100%;
            height: 40px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;

            input {
                font-size: 20px;
                display: inline-block;
                width: 200px;

                &:last-child {
                    text-align: right;
                }
            }
        }
    }
`;

const PostingArea = styled.section`
    width: 100%;
    padding: 20px;
    margin: auto;
    box-sizing: border-box;

    .send-post {
        width: 600px;
        margin: auto;
        text-align: right;

        .send-post__button {
            border: none;
            padding: 10px 15px;
            border-radius: 10px;
            font-size: 16px;

            &:hover {
                cursor: pointer;
                background-color: #ccc;
            }
        }
    }
`;

const RecommendPlaceArea = styled.div`
    width: 600px;
    margin: auto;
    margin-bottom: 40px;

    .recommend-place-top {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 20px;

        h3 {
            font-size: 24px;
            font-weight: 600;
        }

        button {
            background-color: tomato;
            border: 1px solid tomato;
            color: white;
            border-radius: 10px;
            padding: 5px;

            &:hover {
                cursor: pointer;
            }
        }
    }

    .recommend-place-body {
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
`;

const CategoryArea = styled.div`
    width: 600px;
    margin: auto;
    border-bottom: 1px solid #ccc;
    display: flex;
    flex-flow: row nowrap;
    padding-bottom: 20px;
    margin-bottom: 40px;

    .category-title {
        flex: 0 0 auto;
        font-size: 24px;
        font-weight: 600;
        margin-right: 20px;
    }

    .category-tags {
        flex: 2 1 auto;

        span {
            display: inline-block;
            font-size: 16px;
            padding: 5px;
            border-radius: 5px;
            background-color: #eee;
            margin-right: 15px;
            margin-bottom: 10px;

            &:hover {
                cursor: pointer;
                background-color: #ccc;
            }
        }
    }

    .category-addButton {
        flex: 0 0 auto;
        border: none;
        border-radius: 10px;
        width: 65px;
        height: 30px;
        font-size: 12px;
        background-color: #ccc;

        &:hover {
            cursor: pointer;
        }
    }
`;

const NewPost = memo(() => {
    const onPosting = useCallback(e => {
        e.preventDefault();
    }, []);

    const [backgroundColor, setBackgroundColor] = useState('#cccccc');

    const onBackgroundColorInputChange = useCallback(e => {
        setBackgroundColor(e.currentTarget.value);
    }, []);

    return (
        <MainForm onSubmit={onPosting}>
            <TitleArea style={{ backgroundColor: backgroundColor }}>
                <div className="title-edit-menu">
                    <label htmlFor="backgroundImageInput">B</label>
                    <input type="file"
                        accept='.jpg,.PNG'
                        name='backgroundImageInput'
                        id='backgroundImageInput'
                        style={{display: 'none'}}
                    />
                    <input type="color" name="backgroundColorInput" id="backgroundColorInput" onChange={onBackgroundColorInputChange}/>
                    <button>A</button>
                </div>
                <div className='title-input'>
                    <input type="text" name='postTitle' className='title-input__main-title' placeholder='제목을 입력하세요' />
                    <div className='title-input__desc'>
                        <input type="text" name='postDate' placeholder='게시일' disabled />
                        <input type="text" name='postUser' placeholder='게시자' disabled />
                    </div>
                </div>
            </TitleArea>

            <hr />

            <PostingArea>

                <RecommendPlaceArea>
                    <div className='recommend-place-top'>
                        <h3>이 글에서 추천한 장소들</h3>
                        <button>장소 추가하기</button>
                    </div>
                    <div className='recommend-place-body'>
                        <ul>
                            <RecommendListItem
                                img={breadSample}
                                alt='빵'
                                title='선플라워 베이크샵'
                                address='서울시 어디어디'
                                commend='3'
                                reaction='완벽해요!'
                            />
                            <RecommendListItem
                                img={breadSample}
                                alt='빵'
                                title='선플라워 베이크샵'
                                address='서울시 어디어디'
                                commend='3'
                                reaction='완벽해요!'
                            />
                        </ul>
                    </div>
                </RecommendPlaceArea>

                <CategoryArea>
                    <h3 className='category-title'>
                        해시태그 : 
                    </h3>
                    <div className='category-tags'>
                        <span>O 세글자</span>
                        <span>O 네글자네</span>
                        <span>O 다섯글자다</span>
                        <span>O 네글자네</span>
                        <span>O 여섯글자여섯</span>
                        <span>O 세글자</span>
                        <span>O 여섯글자여섯</span>
                    </div>
                    <button className='category-addButton'>
                        + 더 보기
                    </button>
                </CategoryArea>

                <div className='send-post'>
                    <button className='send-post__button'>저장하기</button>
                </div>
            </PostingArea>
        </MainForm>
    );
});

export default NewPost;