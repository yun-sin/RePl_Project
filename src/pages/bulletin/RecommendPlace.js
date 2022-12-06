import React, { memo, useCallback } from 'react';
import styled from 'styled-components';

import breadSample from '../../assets/img/bulletin/bread_sample.jpg';

const PopUpBox = styled.div`
    width: 600px;
    height: 500px;
    position: relative;
    padding: 20px;
    box-sizing: border-box;
    background-color: tomato;

    .closePopUp {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 5px;
        font-size: 15px;
        
        &:hover {
            cursor: pointer;
            background-color: #ccc;
        }
    }

    .top-desc {
        display: flex;
        flex-flow: row nowrap;
        align-items: flex-end;
        margin-bottom: 15px;

        h3 {
            font-size: 24px;
            font-weight: 600;
        }

        p {
            font-size: 12px;
            margin-left: 15px;
        }
    }

    .selected-place {
        width: 100%;
        margin: auto;
        min-height: 100px;
        background-color: #eee;
        padding: 10px;
        box-sizing: border-box;
        margin-bottom: 10px;
        border-radius: 2px;

        p {
            font-size: 16px;
            display: inline-block;
            margin-right: 10px;
        }

        span {
            display: inline-block;
            background-color: #ccc;
            padding: 2px;
            margin: 0 10px 10px 0;
            border-radius: 3px;
            font-size: 14px;

            button {
                background: none;
                border: none;
                margin: 0 2px 0 5px;

                &:hover {
                    cursor: pointer;
                    font-weight: 600;
                }
            }
        }
    }

    .search {
        display: flex;
        flex-flow: row nowrap;
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
        margin-bottom: 10px;
        
        * {
            line-height: 1.6;
            padding: 5px;
            border-radius: 2px;
            background-color: #eee;
        }

        div {
            flex: 1 1 auto;
            padding: 5px;
            margin-right: 5px;
            display: flex;
            flex-flow: row nowrap;

            input {
                flex: 1 1 auto;
                border: none;
                background: none;
            }
        }

        button {
            border: none;

            &:hover {
                cursor: pointer;
            }
        }
    }

    .searched-list {
        width: 100%;
        max-height: 250px;
        box-sizing: border-box;
        overflow-y: scroll;
        ::-webkit-scrollbar { 
            width: 5px;
        }
        ::-webkit-scrollbar-thumb {
            background-color: #333;
            border-radius: 3px;
        }
        ::-webkit-scrollbar-track { 
            background: none;
        }

        li {
            width: 100%;
            height: 100px;
            box-sizing: border-box;
            padding: 10px;
            display: flex;
            flex-flow: row nowrap;

            &:hover {
                cursor: pointer;
                background-color: #ccc;
            }

            img {
                width: 120px;
                height: 80px;
                object-fit: cover;
                margin-right: 20px;
            }

            div {
                display: flex;
                flex-flow: column wrap;
                justify-content: space-between;
                padding: 5px 0;

                h4 {
                    color: skyblue;
                    font-weight: 600;
                    font-size: 24px;
                }

                p {
                    font-size: 16px;
                    color: darkgray;
                }
            }
        }
    }
`;

const RecommendPlace = memo(() => {
    const onSearchPlace = useCallback(e => {
        e.preventDefault();
    }, []);

    const resetForm = useCallback(e => {
        e.preventDefault();
        e.currentTarget.closest('form').reset();
    }, []);

    return (
        <PopUpBox>
            <button className='closePopUp'>X</button>
            <div className='top-desc'>
                <h3>추천할 장소를 찾아보세요</h3>
                <p>자신이 리뷰를 남긴 장소에서 선택 가능해요</p>
            </div>
            <div className='selected-place'>
                <p>선택된 장소 목록 : </p>
                <span>장소명 1 <button>X</button></span>
                <span>장소명 2 <button>X</button></span>
                <span>장소명 3 <button>X</button></span>
            </div>
            <form className='search' onSubmit={onSearchPlace}>
                <div>
                    <input type="text"></input>
                    <button type='submit'>O 검색</button>
                </div>
                <button type='button' onClick={resetForm}>초기화</button>
            </form>
            <ul className='searched-list'>
                <li>
                    <img src={breadSample} alt="장소 사진" />
                    <div>
                        <h4>썸플라워 베이크샵</h4>
                        <p>서울시 강남구 어디어디</p>
                    </div>
                </li>
                <li>
                    <img src={breadSample} alt="장소 사진" />
                    <div>
                        <h4>썸플라워 베이크샵</h4>
                        <p>서울시 강남구 어디어디</p>
                    </div>
                </li>
                <li>
                    <img src={breadSample} alt="장소 사진" />
                    <div>
                        <h4>썸플라워 베이크샵</h4>
                        <p>서울시 강남구 어디어디</p>
                    </div>
                </li>
            </ul>
        </PopUpBox>
    );
});

export default RecommendPlace;