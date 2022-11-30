import React, { memo, useCallback } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import breadSample from '../../assets/img/bulletin/bread_sample.jpg';

const CommentsArea = styled.div`
    display: none;
    

    &.active {
        display: block;

        animation: appear 0.4s ease-in-out;
        @keyframes appear {
            0% {
                transform: translate(0, -10%);
                opacity: 0.7;
            }
            100% {
                transform: translate(0, 0);
                opacity: 1;
            }
        }
    }

    width: 1000px;
    margin: auto;

    .comments__title {
        font-size: 16px;
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
        
        span {
            color: skyblue;
            margin-left: 5px;
        }
    }

    .comments__profileImg {
        flex: 1 0 auto;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
    }

    .comments__list {
        width: 100%;
        padding: 10px;
        color: #636363;
        font-weight: 400;

        .comments__list__item {
            width: 100%;
            display: flex;
            flex-flow: row nowrap;
            border-bottom: 1px solid #eee;
            padding: 20px 0;
            
            .comments__contents {
                flex: 1 1 auto;
                margin-left: 15px;
                font-size: 15px;

                .comments__contents__top {
                    margin-bottom: 8px;

                    span {
                        margin-right: 10px;

                        &:last-child {
                            margin: none;
                            font-size: 14px;
                        }
                    }
                }

                .comments__contents__main {
                    line-height: 1.5;
                }
            }
        }
    }

    .comments__add {
        width: 100%;
        padding: 10px;
        display: flex;
        flex-flow: row nowrap;

        .connemts__add__inputBox {
            position: relative;
            width: 100%;
            margin-left: 15px;

            textarea {
                width: 100%;
                height: 100px;
                resize: none;
                font-size: 15px;
                padding: 10px;
                box-sizing: border-box;
                line-height: 1.5;
                border: 1px solid #ccc;
                border-radius: 5px;
            }

            button {
                position: absolute;
                right: 15px;
                bottom: 15px;
                width: 60px;
                height: 35px;
                background: none;
                border: 1px solid #ccc;
                border-radius: 15px;

                &:hover {
                    cursor: pointer;
                    background-color: #eee;
                }
            }
        }
    }
`;

const Comments = memo(props => {
    const onCommentAddSubmit = useCallback(e => {
        e.preventDefault();
    }, []);

    return (
        <CommentsArea className={classNames({active: props.showComments})}>
            <h4 className='comments__title'>댓글 <span>3</span></h4>
            <ul className="comments__list">
                {
                    props.data.map((v, i) => {
                        return (
                            <li className='comments__list__item' key={i}>
                                <img src={v.profileImg} alt="댓글 작성자 프로필 이미지" className='comments__profileImg' />
                                <div className='comments__contents'>
                                    <p className='comments__contents__top'>
                                        <span>{v.writer}</span>
                                        <span>{v.writeDate}</span>
                                    </p>
                                    <p className='comments__contents__main'>
                                        {v.content}
                                    </p>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>

            <form className="comments__add" onSubmit={onCommentAddSubmit}>
                <img src={breadSample} alt="댓글 작성자 프로필 이미지" className='comments__profileImg' />

                <div className='connemts__add__inputBox'>
                    <textarea name='commentsInput' placeholder='작성자에게 힘이 되는 댓글을 부탁드려요!' />
                    <button type='submit'>확인</button>
                </div>
            </form>
        </CommentsArea>
    );
});

export default Comments;