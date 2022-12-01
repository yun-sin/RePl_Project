import React, { memo, useCallback, useState } from 'react';
import styled from 'styled-components';

import EditorView from '../../components/bulletin/EditorView';
import Comments from '../../components/bulletin/Comments';

import RecommendListItem from '../../components/bulletin/RecommendListItem';
import breadSample from '../../assets/img/bulletin/bread_sample.jpg';

const TitleArea = styled.div`
    width: 100%;
    margin: auto;
    height: 400px;
    position: relative;
    background-color: ${props => props.bgColor};

    .title {
        width: 500px;
        height: 150px;
        background-color: #00000022;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
        box-sizing: border-box;
        padding: 10px;

        h2 {
            color: white;
        }

        .title__main-title {
            width: 480px;
            height: 70px;
            font-size: 40px;
            margin-bottom: 20px;
        }

        .title__desc {
            width: 100%;
            height: 40px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;

            h3 {
                color: white;
                font-size: 26px;
            }
        }
    }
`;

const PostingArea = styled.section`
    width: 100%;
    padding: 20px;
    margin: auto;
    box-sizing: border-box;
`;

const RecommendPlaceArea = styled.div`
    width: 1000px;
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
    }

    .recommend-place-body {
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
`;

const CategoryArea = styled.div`
    width: 1000px;
    margin: auto;
    display: flex;
    flex-flow: row nowrap;
    padding-bottom: 20px;

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

    .comments {
        flex: 1 0 auto;
        background: none;
        border: 1px solid #ccc;
        border-radius: 20px;
        width: 50px;
        height: 40px;

        &:hover {
            cursor: pointer;
            background-color: #eee;
        }

        span {
            margin: 0 10px;

            &:last-child {
                color: skyblue;
            }
        }
    }
`;

const testData = {
    bgColor: 'gray',
    title: '예시 게시물 1',
    publisher: '게시자 1',
    postDate: '2022-11-30',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
};

const testData2 = [
    {
        profileImg: breadSample,
        writer: '작성자 1',
        writeDate: '2022-11-30',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        profileImg: breadSample,
        writer: '작성자 2',
        writeDate: '2022-11-30',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        profileImg: breadSample,
        writer: '작성자 3',
        writeDate: '2022-11-30',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
]

const NewPost = memo(props => {
    const [showComments, setShowComments] = useState(false);

    const onCommentsShowClick = useCallback(e => {
        setShowComments(state => {
            return !state;
        });
    }, []);

    return (
        <>
            <TitleArea bgColor={testData.bgColor}>
                <div className='title'>
                    <h2 className='title__main-title'>{testData.title}</h2>
                    <div className='title__desc'>
                        <h3>{testData.publisher}</h3>
                        <h3>{testData.postDate}</h3>
                    </div>
                </div>
            </TitleArea>

            <hr />

            <PostingArea>
                <EditorView postContent={testData.content}/>
                <RecommendPlaceArea>
                    <div className='recommend-place-top'>
                        <h3>이 글에서 추천한 장소들</h3>
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
                    <div className='category-tags'>
                        <span>O 세글자</span>
                        <span>O 네글자네</span>
                        <span>O 다섯글자다</span>
                        <span>O 네글자네</span>
                        <span>O 여섯글자여섯</span>
                        <span>O 세글자</span>
                        <span>O 여섯글자여섯</span>
                    </div>
                    <button className='comments' onClick={onCommentsShowClick}><span>O</span>댓글<span>3</span></button>
                </CategoryArea>

                <Comments showComments={showComments} data={testData2} />
            </PostingArea>
        </>
    );
});

export default NewPost;