import React, { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import classNames from 'classnames';

const PostCard = styled.div`
    width: 260px;
    margin: 0 10px 15px;
    position: relative;
    border: 1px solid #ccc;
    
    img {
        width: 260px;
        height: 180px;
        margin-bottom: -2px;
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
        width: 260px;
        height: 180px;
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

const Post = memo(props => {
    const [isHover, setIsHover] = useState(false);
    
    const navigate = useNavigate();
    const onLinkClick = useCallback(e => {
        navigate(`/bulletin/postview/${props.targetId}`);
    }, []);

    return (
        <PostCard>
            <div className={classNames('hover__preview', {active: isHover})}
            onMouseLeave={() => setIsHover(false)}
            onClick={onLinkClick}
            >
                <h3>{props.title}</h3>
                <p>게시물 바로가기</p>
            </div>

            <img src={props.img} alt="게시물 이미지" onMouseOver={() => setIsHover(true)}/>
            <h3 className='post__title' onClick={onLinkClick}>{props.title}</h3>
            <div className='post__desc'>
                <h4>{props.publisher}</h4>
                <div className='post__desc__other'>
                    <p><span>좋아요</span> {props.like}</p>
                    <p>{props.postDate}</p>
                </div>
            </div>
            <div className='post__hashtags'>
                {
                    props.hashtag.map((v, i) => {
                        return (
                            <span key={i}>#{v}</span>
                        )
                    })
                }
            </div>
        </PostCard>
    );
});

export default Post;