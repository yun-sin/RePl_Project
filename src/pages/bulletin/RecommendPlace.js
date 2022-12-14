import React, { memo, useCallback, useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import breadSample from '../../assets/img/bulletin/bread_sample.jpg';
import { useEffect } from 'react';

const PopUpBox = styled.div`
    width: 400px;
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
        font-size: 25px;
        
        &:hover {
            cursor: pointer;
            background-color: #ccc;
        }
    }

    .top-desc {
        margin-bottom: 15px;

        h3 {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        p {
            font-size: 12px;
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
            font-size: 14px;
            display: inline-block;
            margin-right: 10px;
        }

        span {
            display: inline-block;
            background-color: #ccc;
            padding: 2px;
            margin: 0 10px 10px 0;
            border-radius: 3px;
            font-size: 12px;

            button {
                background: none;
                border: none;
                margin: 0 2px 0 2px;
                font-size: 10px;

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
            font-size: 12px;
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
        padding-bottom: 15px;
        overflow-y: scroll;
        ::-webkit-scrollbar { 
            width: 4px;
        }
        ::-webkit-scrollbar-thumb {
            background-color: #777;
            border-radius: 3px;
        }
        ::-webkit-scrollbar-track { 
            background: none;
        }

        li {
            width: 100%;
            box-sizing: border-box;
            padding: 10px;
            display: flex;
            flex-flow: row nowrap;
            transition: all 0.2s;

            &:hover {
                cursor: pointer;
                background-color: #ccc;
            }

            &.active {
                background-color: #0581bb;
                
                div {
                    h4, p { color: white; }
                }
            }

            img {
                width: 90px;
                height: 60px;
                object-fit: cover;
                margin-right: 20px;
            }

            div {
                display: flex;
                flex-flow: column wrap;
                justify-content: space-between;
                padding: 5px 0;
                padding-bottom: 10px;

                h4 {
                    color: skyblue;
                    font-weight: 600;
                    font-size: 18px;
                }

                p {
                    font-size: 14px;
                    color: darkgray;
                }
            }
        }
    }
`;

const testData = [
    {
        img: breadSample,
        title: '장소명',
        address: '서울시 어디어디'
    },
    {
        img: breadSample,
        title: '장소명',
        address: '서울시 어디어디'
    },
    {
        img: breadSample,
        title: '장소명',
        address: '서울시 어디어디'
    },
    {
        img: breadSample,
        title: '장소명',
        address: '서울시 어디어디'
    },
    {
        img: breadSample,
        title: '장소명',
        address: '서울시 어디어디'
    },
    
]

const RecommendPlace = memo(() => {
    const [selectedIndex, setSelectedIndex] = useState([]);

    useEffect(() => {
        setSelectedIndex(new Array(testData.length).fill(false));
    }, []);

    const onSearchPlace = useCallback(e => {
        e.preventDefault();
    }, []);

    const resetForm = useCallback(e => {
        e.preventDefault();
        e.currentTarget.closest('form').reset();
    }, []);

    const onPlaceClick = useCallback(e => {
        const idx = e.currentTarget.getAttribute('idx');
        setSelectedIndex(state => {
            let temp = [];
            for (const k of state) {
                temp.push(k);
            }
            temp[idx] = !temp[idx];
            return temp;
        });

        const title = e.currentTarget.children[1].children[0].innerHTML;
        console.log(title);
    }, [selectedIndex]);

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
                {
                    testData.map((v, i) => {
                        return (
                            <li key={i} idx={i} onClick={onPlaceClick} className={classNames({active: selectedIndex[i]})}>
                                <img src={v.img} alt="장소 사진" />
                                <div>
                                    <h4>{v.title}</h4>
                                    <p>{v.address}</p>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </PopUpBox>
    );
});

export default RecommendPlace;