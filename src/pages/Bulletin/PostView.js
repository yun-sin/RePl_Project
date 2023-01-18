import React, { memo, useCallback, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import Comments from '../../components/bulletin/Comments';
import OtherPost from '../../components/bulletin/OtherPost';
import RecommendListItem from '../../components/bulletin/RecommendListItem';
import Spinner from '../../common/Spinner';

import { getPost } from '../../slices/bulletin/PostViewSlice';
import { getOtherPosts } from '../../slices/bulletin/OtherPostSlice';
import { getRecommendedPlaces } from '../../slices/bulletin/RecommendedPlaceSlice';
import { getPostsTags } from '../../slices/bulletin/HashtagSlice';
import { useSelector, useDispatch } from 'react-redux';

import breadSample from '../../assets/img/bulletin/bread_sample.jpg';

const TitleArea = styled.div`
    width: 100%;
    margin: auto;
    height: 400px;
    position: relative;
    background-color: ${props => props.bgColor};
    border-bottom: 1px solid #eee;

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
            padding: 10px;
        }

        .title__main-title {
            width: 480px;
            height: 70px;
            font-size: 40px;
        }

        .title__desc {
            width: 100%;
            height: 40px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;

            h3 {
                color: white;
                font-size: 20px;
                padding: 10px;
            }
        }
    }
`;

const PostingArea = styled.section`
    width: 100%;
    padding: 20px;
    margin: auto;
    box-sizing: border-box;

    .postContent {
        width: 800px;
        margin: auto;
        padding: 50px 10px 100px;
        box-sizing: border-box;
        border-bottom: 1px solid #aaa;
        margin-bottom: 40px;
    }
`;

const RecommendPlaceArea = styled.div`
    width: 800px;
    margin: auto;
    margin-bottom: 40px;

    .recommend-place-top {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 20px;
        padding: 0 10px;

        h3 {
            font-size: 20px;
            font-weight: 600;
        }
    }

    .recommend-place-body {
        width: 100%;
        box-sizing: border-box;
    }
`;

const CategoryArea = styled.div`
    width: 800px;
    margin: auto;
    display: flex;
    flex-flow: row nowrap;
    padding-bottom: 20px;

    .category-tags {
        flex: 2 1 auto;

        span {
            display: inline-block;
            font-size: 12px;
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
`;

const PublisherDiv = styled.div`
    width: 800px;
    height: 50px;
    margin: auto;
    display: flex;
    flex-flow: row nowrap;
    background-color: #eee;
    margin-bottom: 50px;
    padding: 10px;
    justify-content: space-between;

    div {
        display: flex;
        flex-flow: row nowrap;
        align-items: flex-end;
    }

    img {
        width: 100px;
        height: 100px;
        border-radius: 50%;

        &:hover {
            cursor: pointer;
            filter: brightness(0.8);
        }
    }

    h2 {
        font-size: 24px;
        margin-left: 15px;
        font-weight: 600;

        &:hover {
            cursor: pointer;
        }
    }

    p {
        margin-right: 15px;
        font-size: 16px;

        span {
            font-size: 18px;
            margin-left: 5px;
        }
    }

    button {
        border: 1px solid #ccc;
        background-color: #fff;
        width: 100px;
        height: 40px;
        border-radius: 20px;
        color: skyblue;
        
        &:hover {
            cursor: pointer;
            background-color: #eee;
        }
    }
`;

const OtherPostsArea = styled.div`
    width: 800px;
    margin: auto;

    h3 {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
    }

    .other-posts {
        width: 100%;
        padding: 10px;
        display: flex;
        flex-flow: row nowrap;
        position: relative;
        box-sizing: border-box;

        .other_posts__wrap {
            width: 800px;
            margin: auto;
            display: flex;
            flex-flow: row nowrap;
            overflow-x: scroll;
            overflow-y: hidden;
            scroll-behavior: smooth;
            
            ::-webkit-scrollbar {
                display: none;
            }
        }

        button {
            display: none;
            &.active {
                display: block;
            }

            width: 15px;
            height: 250px;
            border: none;
            background-color: #00000020;
            color: #fff;
            font-size: 25px;
            font-weight: 600;
            position: absolute;
            &:first-child {
                left: 5px;
            }
            &:last-child {
                right: 5px;
            }

            &:hover {
                cursor: pointer;
                background-color: #00000040;
            }
        }
    }
`;

const NewPost = memo(props => {
    /** 게시글 데이터 불러오기 */
    const dispatch = useDispatch();
    // 게시글 본문 및 작성자 데이터
    const { data, loading, error } = useSelector(state => state.PostViewSlice);
    // 본 게시물에서 작성자가 추천한 장소들 데이터
    const { data: places, loading: loading2, error: error2 } = useSelector(state => state.RecommendedPlaceSlice);
    // 본 게시물에서 작성자가 선정한 카테고리들 데이터
    const { data: categories, loading: loading3, error: error3 } = useSelector(state => state.HashtagSlice);
    // 작성자의 다른 게시글들 데이터
    const { data: otherPosts, loading: loading4, error: error4 } = useSelector(state => state.OtherPostSlice);

    // 패스파라미터 변수
    const postId = useParams().id;

    // 해당 패스 게시글 불러오기
    useEffect(() => {
        dispatch(getPost(postId));
    }, [postId]);

    // 게시글 데이터 적재 시 게시자의 다른 게시물 정보 불러오기
    useEffect(() => {
        if (data) {
            dispatch(getRecommendedPlaces(postId));
            dispatch(getPostsTags(postId));
            dispatch(getOtherPosts(data.userId));
        }
    }, [data]);

    console.log(categories);

    /** 작성자의 다른 게시글 영역 */
    // 현재 스크롤 위치 저장
    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);
    // 왼쪽 오른쪽 버튼
    const toLeft = useRef();
    const toRight = useRef();

    // 최대 길이 적재
    useEffect(() => {
        if (!data) return;
        const target = document.querySelector('.other_posts__wrap');
        setMaxScroll(target.scrollWidth);
    }, [data]);

    // 좌 우 클릭
    const onToRightClick = useCallback(e => {
        e.preventDefault();
        e.currentTarget.setAttribute('disabled', 'disabled');
        const target = document.querySelector('.other_posts__wrap');
        target.scrollLeft += 780;
        setScrollPosition(state => state + 780);
        const current = e.currentTarget;
        setTimeout(() => {
            current.removeAttribute('disabled');
        }, 500);
    }, []);
    const onToLeftClick = useCallback(e => {
        e.preventDefault();
        e.currentTarget.setAttribute('disabled', 'disabled');
        const target = document.querySelector('.other_posts__wrap');
        target.scrollLeft -= 780;
        setScrollPosition(state => state - 780);
        const current = e.currentTarget;
        setTimeout(() => {
            current.removeAttribute('disabled');
        }, 500);
    }, []);

    return (
        <>  
            {
                loading ? (
                    <Spinner loading={loading} />
                ) : (
                    error ? (
                        <div>에러</div>
                    ) : (
                        data && <>
                            <TitleArea bgColor={data.bgColor}>
                                <div className='title'>
                                    <h2 className='title__main-title'>{data.title}</h2>
                                    <div className='title__desc'>
                                        <h3>{data.username}</h3>
                                        <h3>{data.postdate}</h3>
                                    </div>
                                </div>
                            </TitleArea>

                            <hr />

                            <PostingArea>
                                <div className="postContent" dangerouslySetInnerHTML={{ __html: data.content}} />
                                <RecommendPlaceArea>
                                    <div className='recommend-place-top'>
                                        <h3>이 글에서 추천한 장소들</h3>
                                    </div>
                                    <div className='recommend-place-body'>
                                        <Spinner loading={loading2} />
                                        {
                                            error2 ? (
                                                <div>추천된 장소 목록을 불러오지 못했습니다.</div>
                                            ) : (
                                                <ul>
                                                    {
                                                        places && places.map((v, i) => {
                                                            return (
                                                                <RecommendListItem
                                                                    key={i}
                                                                    img={v.img}
                                                                    title={v.place_name}
                                                                    address={v.address_name}
                                                                    comment={v.comment}
                                                                    rating={v.rating}
                                                                />
                                                            );
                                                        })
                                                    }
                                                </ul>
                                            )
                                        }
                                    </div>
                                </RecommendPlaceArea>

                                <CategoryArea>
                                    <div className='category-tags'>
                                        {
                                            categories && categories.map((v, i) => {
                                                return (
                                                    <span key={i}>{v.name}</span>
                                                );
                                            })
                                        }
                                    </div>
                                </CategoryArea>

                                <Comments id={postId} />
                            </PostingArea>

                            <PublisherDiv>
                                <div>
                                    <img src={breadSample} alt="작성자 프로필 이모지" />
                                    <h2>{data.username}</h2>
                                </div>
                                <div>
                                    <p>구독자<span>{data.follower}</span></p>
                                    <button>구독하기</button>
                                </div>
                            </PublisherDiv>
                                
                            <OtherPostsArea>
                                <Spinner loading={loading4} />
                                {
                                    error4 ? (
                                        <div>작성자의 다른 게시글을 불러오지 못했습니다.</div>
                                    ) : (
                                        <>
                                            <h3>작성자의 다른 게시글</h3>
                                            <div className="other-posts">
                                                <button className={classNames({active: scrollPosition > 0})} ref={toLeft} onClick={onToLeftClick}>&lt;</button>
                                                <div className='other_posts__wrap'>
                                                    {
                                                        otherPosts && otherPosts.map((v, i) => {
                                                            return (
                                                                <OtherPost key={i} imgSrc={v.bgimage}
                                                                bgColor={v.bgColor}
                                                                title={v.title} preview={v.content} />
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <button className={classNames({active: scrollPosition < maxScroll - 900})} ref={toRight} onClick={onToRightClick}>&gt;</button>
                                            </div>
                                        </>
                                    )
                                }
                            </OtherPostsArea>
                        </>
                    )
                )
            }
        </>
    );
});

export default NewPost;