import React, { memo, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { useSelector } from "react-redux";


const SidebarContainer = styled.div`
    width: 30%;
    /* min-width: 400px; */
    max-width: 520px;
    height: 100%;
    background-color: #FEFEFE;
    padding: 40px 30px;
    box-sizing: border-box;
    font-size: 14px;
    color: #666666;
    position: absolute;
    top : 0;
    bottom: 0;
    overflow-y: auto;
    -ms-overflow-style: none;
    z-index: 9999;
    left : -500px;
    transition: 0.5s;

    &.active {
        left: 0;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    .search {
        margin-bottom: 20px;
        form {
            width: 100%;
            position: relative;
            .magnifyingGlass {
                position: absolute;
                top: 0;
                bottom: 0;
                left: auto;
                right: 0;
                line-height: 50px;
                margin-right: 10px;
            }
            input {
                width: 100%;
                background: #E5E5E5;
                color: #222222;
                border-radius: 8px;
                padding: 18px 16px 16px;
                box-sizing: border-box;
                border: none;

            }
        }

    }
    .filter {
        h3 {
            color: #0581BB;
            font-weight: 600;
            margin: 16px 0;
        }
        ul {
            display: flex;
            flex-wrap: wrap;
            li {
                background-color: #F3F5F7;
                font-size: 13px;
                padding: 10px 11px 8px;
                margin: 5px 15px 5px 0;
                color: #444444;
                cursor: pointer;
                border-radius: 8px;
                &:hover {
                    background-color: #e8e8e8;
                }
            }
            .more {
                background-color: #dddddd;
                &:hover {
                    background-color: #dddddd;
                }
            }
        }
    }

    
`;

// 필터 생성을 위한 배열
const whereArr = ['서울', '경기', '인천', '강원도', '충청도', '경상도', '전라도', '대전', '대구', '울산', '부산', '광주', '제주도']

const whoArr = ['🧍 혼자서', '👯‍♀️ 동료랑', '👩‍❤️‍👨연인이랑', '🐶 반려동물과', '🙌🏻 친구랑', '🔢 소규모로', '❤️ 소개팅', '👶 아이랑', '👨‍👩‍👧 부모님이랑'];

const whatArr = ['🌞 점심식사', '🧑‍💻 일하기', '🎧 음악듣기', '📖 책읽기', '🚶 산책하기', '☀️ 한여름에', '✏️ 공부하기', '🏃‍♀️ 운동하기', '🎉 특별한날', '💫 영감얻기', '🎞 영화보기', '😃 대화하기', '🌃 늦게까지', '😶 멍때리기', '📸 사진찍기', '🚙 차끌고', '☔️ 비오는날', '🌛 저녁식사', '🙇‍♂️ 대접하기'];

const featureArr = ['💰 가성비', '✈️ 현지같은', '🌿 그린에코', '🥗 건강한', '🏞 경치좋은', '🕵️‍♀️ 숨겨진', '🧙‍♀️ 실력있는'];

const featureMoreArr = ['😌 편안한', '🍱 푸짐한', '📠 빈티지', '😎 힙한'];

const foodArr = ['🌏 세계음식', '🍜 면요리', '🍖 고기', '🍰 디저트', '🥘 한국음식', '🥗 채식/비건', '🥪 간단한음식', '🍣 생선', '🥟 분식', '👐 수제', '🌶 매운음식' ];

const drinkArr = ['☕️ 커피', '🍷 와인', '🍺 맥주', '🍵 차', '🍶 전통주', '🍹 칵테일', '🧊 하이볼', '🥛 소주', '🥃 위스키', '🍶 사케'];

const categoryArr = ['식당', '카페', '주점', '상점', '기타', '베이커리', '문화공간', '공원', '호텔'];



const Sidebar = memo(() => {
    const { isActive } = useSelector((state) => state.SidebarSlice);

    const moreul = useRef();

    const onMoreView = useCallback(() => {
        
    })


  return (
    <SidebarContainer className={`${isActive ? 'active' : ''}`} >
        <div className='search'>
            <form>
                <NavLink to='#' className='magnifyingGlass'>🔍</NavLink>
                <input type="text" placeholder='키워드로 검색해보세요.' />
            </form>
        </div>
        <div className="filter map">
            <ul>
                <li>모든지도</li>
                <li>테마지도</li>
                <li>큐레이션지도</li>
            </ul>
        </div>
        <div className="filter where">
            <h3>어디로 가고싶나요?</h3>
            <ul>
            {whereArr.map((v, i) => {
                return (
                        <li key={i}>
                            <span>{v}</span>
                        </li>
                )
            })}
            </ul>
        </div>
        <div className="filter who">
            <h3>누구와 함께 하나요?</h3>
            <ul>
            {whoArr.map((v, i) => {
                return (
                        <li>
                            <span>{v}</span>
                        </li>
                )
            })}
            </ul>
        </div>
        <div className="filter what">
            <h3>무엇을 하나요?</h3>
            <ul>
            {whatArr.map((v, i) => {
                return (
                        <li>
                            <span>{v}</span>
                        </li>
                )
            })}
            </ul>
        </div>
        <div className="filter feature">
            <h3>분위기와 특징</h3>
            <ul ref={moreul}>
            {featureArr.map((v, i) => {
                return (
                        <li>
                            <span>{v}</span>
                        </li>
                )
            })}
            <li className='more' onClick={onMoreView}>
                <span>+ 더 보기</span>
            </li>
            </ul>
        </div>
        <div className="filter food">
            <h3>어떤 음식</h3>
            <ul>
            {foodArr.map((v, i) => {
                return (
                        <li>
                            <span>{v}</span>
                        </li>
                )
            })}
            </ul>
        </div>
        <div className="filter drink">
            <h3>어떤 술/음료</h3>
            <ul>
            {drinkArr.map((v, i) => {
                return (
                        <li>
                            <span>{v}</span>
                        </li>
                )
            })}
            </ul>
        </div>
        <div className="filter category">
            <h3>카테고리</h3>
            <ul>
            {categoryArr.map((v, i) => {
                return (
                        <li>
                            <span>{v}</span>
                        </li>
                )
            })}
            </ul>
        </div>
    </SidebarContainer>
  )
});

export default Sidebar;