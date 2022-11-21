import React, { memo, useState } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import postImg1 from '../../assets/img/bulletin/post_sample01.jpg';
import postImg2 from '../../assets/img/bulletin/post_sample02.jpg';
import postImg3 from '../../assets/img/bulletin/post_sample03.jpg';
import postImg4 from '../../assets/img/bulletin/post_sample04.jpg';
import postImg5 from '../../assets/img/bulletin/post_sample05.jpg';
import postImg6 from '../../assets/img/bulletin/post_sample06.jpg';

const PostCard = styled.div`
    width: 22.99%;
    margin: 0 1% 1.5% 1%;
    position: relative;
    
    img {
        width: 100%;
        aspect-ratio: 13 / 9;
    }

    .post__title {
        padding: 5px;

        text-align: right;
        font-size: 18px;
        font-weight: 600;
        line-height: 1.5;

        background-color: #2861da;
        color: white;

        &:hover {
            cursor: pointer;
        }
    }

    .post__desc {
        background-color: white;

        h4 {
            padding: 10px;

            text-align: right;
            font-size: 16px;
            font-weight: 600;
            line-height: 1.5;
        }

        .post__desc__other {
            margin-top: 10px;
            display: flex;
            flex-flow: row nowrap;
            padding: 10px;
            justify-content: space-between;
        }
    }

    .post__hashtags {
        text-align: right;
        padding: 10px;
        background-color: lightgray;

        span {
            margin-left: 5px;
        }
    }

    .hover__preview {
        display: none;
        &.active {
            display: flex;
        }

        flex-flow: column nowrap;
        width: 100%;
        aspect-ratio: 13 / 9;
        background-color: #000000c8;
        color: white;
        align-items: center;
        justify-content: center;
        text-align: center;

        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;

        &:hover {
            cursor: pointer;
        }

        h3 {
            font-size: 20px;
            font-weight: 600;
            
            &::before {
                content: '" ';
                display: inline-block;
            }
            &::after {
                content: ' "';
                display: inline-block;
            }
        }

        p {
            margin-top: 15px;
        }
    }
`

const Post = memo(() => {
    const [isHover, setIsHover] = useState(false);

    return (
        <PostCard>
            <div className={classnames('hover__preview', {active: isHover})} onMouseLeave={() => setIsHover(false)}>
                <h3>게시글 소개</h3>
                <p>미리보기 프리뷰 창</p>
            </div>

            <img src={postImg1} alt="게시물 이미지" onMouseOver={() => setIsHover(true)}/>
            <h3 className='post__title'>게시물 타이틀</h3>
            <div className='post__desc'>
                <h4>게시자</h4>
                <div className='post__desc__other'>
                    <span>좋아요</span>
                    <span>게시일</span>
                </div>
            </div>
            <div className='post__hashtags'>
                <span>#해시태그</span>
                <span>#카테고리</span>
            </div>
        </PostCard>
    );
});

export default Post;