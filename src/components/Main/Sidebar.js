import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../slices/MainSlice";
import { setKeyword } from "../../slices/MapFinderSlice";
import { setActive } from "../../slices/SidebarSlice";


const SidebarContainer = styled.div`
  width: 33%;
  /* min-width: 400px; */
  max-width: 520px;
  height: 100vw;
  background-color: #fefefe;
  padding: 40px 20px;
  box-sizing: border-box;
  font-size: 14px;
  color: #666666;
  position: absolute;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  -ms-overflow-style: none;
  z-index: 9999;
  left: -500px;
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
        background: #e5e5e5;
        cursor: pointer;
        width: 40px;
        border: none;
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
        background: #e5e5e5;
        color: #222222;
        border-radius: 8px;
        padding: 18px 16px 16px;
        box-sizing: border-box;
        border: none;
        &:focus {
          outline: none;
        }
      }
    }
  }
  .filter {
    h3 {
      color: #0581bb;
      font-weight: 600;
      margin: 16px 0;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        background-color: #f3f5f7;
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
        background-color: #ddd;
        &:hover {
          background-color: #ddd;
        }
      }
      .active {
        color: #fefefe;
        background-color: #da4c1f;
      }
    }
  }
`;

// 필터 생성을 위한 배열

const categoryAll = {
  
  whereArr : [
    "을지로/충무로",
    "광화문/시청",
    "삼성/역삼/선릉",
    "성수",
    "종로/중구",
    "송파/강동",
    "홍대/합정",
    "성북",
    "영등포/금천",
    "이태원/경리단",
    "강남/서초/방배",
    "은평",
    "망원",
    "동대문/성동",
    "압구정/신사",
    "신촌",
    "관악/동작",
    "용산/마포",
    "대학로/혜화",
    "강서",
    "노원/도봉/강북",
    "서촌/북촌",
    "연남/연희",
    "구로",
    "여의도",
  ],
  
  whoArr : [
    "🧍 혼자서",
    "👯‍♀️ 동료랑",
    "👩‍❤️‍👨연인이랑",
    "🐶 반려동물과",
    "🙌🏻 친구랑",
    "🔢 소규모로",
    "❤️ 소개팅",
    "👶 아이랑",
    "👨‍👩‍👧 부모님이랑",
  ],

  
  whatArr : [
    "🌞 점심식사",
    "🧑‍💻 일하기",
    "🎧 음악듣기",
    "📖 책읽기",
    "🚶 산책하기",
    "☀️ 한여름에",
    "✏️ 공부하기",
    "🏃‍♀️ 운동하기",
    "🎉 특별한날",
    "💫 영감얻기",
    "🎞 영화보기",
    "😃 대화하기",
    "🌃 늦게까지",
    "😶 멍때리기",
    "📸 사진찍기",
    "🚙 차끌고",
    "☔️ 비오는날",
    "🌛 저녁식사",
    "🙇‍♂️ 대접하기",
  ],

 
 
  featureArr : [
    "💰 가성비",
    "✈️ 현지같은",
    "🌿 그린에코",
    "🥗 건강한",
    "🏞 경치좋은",
    "🕵️‍♀️ 숨겨진",
    "🧙‍♀️ 실력있는",
    "😌 편안한",
    "🍱 푸짐한",
    "📠 빈티지",
    "😎 힙한",
    "✨ 깔끔한",
    "💸 비싼",
    "🌠 루프탑/테라스",
    "👩‍🎤 개성있는",
    "😇 친절한",
    "🤩 인스타감성",
    "👮 정직한",
    "🙊 조용한",
    "🏝 붐비지않는",
    "🚬 흡연가능",
    "🎈 캐주얼한",
    "🌈 성평등한",
    "☀️ 햇빛좋은",
    "🏚 오래된",
    "🎢 높은층고",
    "🚘 주차편한",
  ],


  foodArr : [
    "🌏 세계음식",
    "🍜 면요리",
    "🍖 고기",
    "🍰 디저트",
    "🥘 한국음식",
    "🥗 채식/비건",
    "🥪 간단한음식",
    "🍣 생선",
    "🥟 분식",
    "👐 수제",
    "🌶 매운음식",
  ],


  drinkArr : [
    "☕️ 커피",
    "🍷 와인",
    "🍺 맥주",
    "🍵 차",
    "🍶 전통주",
    "🍹 칵테일",
    "🧊 하이볼",
    "🥛 소주",
    "🥃 위스키",
    "🍶 사케",
  ],

  categoryArr : [
    "식당",
    "카페",
    "주점",
    "상점",
    "기타",
    "베이커리",
    "문화공간",
    "공원",
    "호텔",
  ],
}

const Sidebar = memo(() => {
  const { isActive } = useSelector((state) => state.SidebarSlice);
  const { keyword } = useSelector((state) => state.MapFinderSlice);
  const { filter } = useSelector((state) => state.MainSlice);
  const [select, setSelect] = useState(false);
  const [selectedItems, setSelectedItems] = useState({
    whereArr: null,
    whoArr: null,
    whatArr: null,
    featureArr: null,
    foodArr: null,
    drinkArr: null,
    categoryArr: null,
  });
  const [whereMoreView, setWhereMoreView] = useState(false);
  const [whatMoreView, setWhatMoreView] = useState(false);
  const [featureMoreView, setFeatureMoreView] = useState(false);

  const all = useRef();
  const theme = useRef();
  const following = useRef();

  useEffect(() => {
    switch (filter) {
      case 0:
        onAllClick();
        break;
      case 1:
        onThemeClick();
        break;
      default:
        onFollowingClick();
        break;
    }
  }, [filter]);

  const dispatch = useDispatch();

  const onFilterClick = useCallback((e, type) => {
    if (e.currentTarget === selectedItems[type]) {
      selectedItems[type].classList.remove("active");
      selectedItems[type] = null;
      return;
    }
    if (Object.values(selectedItems)?.filter((v) => v)?.length >= 3) {
      window.alert("카테고리는 최대 3개까지 선택할 수 있습니다.");
      return;
    }
    if (selectedItems[type]) {
      selectedItems[type].classList.remove("active");
      selectedItems[type] = e.currentTarget;
      selectedItems[type].classList.add("active");
    } else {
      selectedItems[type] = e.currentTarget;
      selectedItems[type].classList.add("active");
    }
  });

  console.log(selectedItems);

  const onSearchSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(setKeyword(e.target.search.value));
    dispatch(setActive(false));
    console.log(e.target.search.value);
  }, []);

  const onWhereMoreView = useCallback((Where) => {
    setWhereMoreView(true);
  });

  const onWhatMoreView = useCallback((Where) => {
    setWhatMoreView(true);
  });

  const onFeatureMoreView = useCallback((Where) => {
    setFeatureMoreView(true);
  });

  const onAllClick = useCallback((e) => {
    dispatch(setFilter(0));
    all.current.classList.add("active");
    theme.current.classList.remove("active");
    following.current.classList.remove("active");
  });

  const onThemeClick = useCallback((e) => {
    dispatch(setFilter(1));
    theme.current.classList.add("active");
    all.current.classList.remove("active");
    following.current.classList.remove("active");
  });

  const onFollowingClick = useCallback((e) => {
    dispatch(setFilter(2));
    following.current.classList.add("active");
    all.current.classList.remove("active");
    theme.current.classList.remove("active");
  });

  const more = useCallback((whereArr,length) => {
    if ( !length)
    {
     
      length = categoryAll[whereArr].length || 0
    }
    console.log(length)
    return categoryAll[whereArr].map((v, i) => {
      return (
        <li key={i} onClick={(e) => onFilterClick(e, whereArr)}>
          <span>{v}</span>
        </li>
      );
    }).slice(0,length);
  }, []);
  

  return (
    <SidebarContainer className={`${isActive ? "active" : ""}`}>
      <div className="search">
        <form onSubmit={onSearchSubmit}>
          <button type="submit" className="magnifyingGlass">
            🔍
          </button>
          <input
            type="text"
            name="search"
            placeholder="키워드로 검색해보세요."
            defaultValue={keyword}
          />
        </form>
      </div>
      <div className="filter map">
        <ul>
          <li onClick={onAllClick} ref={all}>
            모든지도
          </li>

          <li onClick={onThemeClick} ref={theme}>
            테마지도
          </li>
          <li onClick={onFollowingClick} ref={following}>
            팔로잉지도
          </li>
        </ul>
      </div>
      <div className="filter where">
        <h3>어디로 가고싶나요?</h3>
        <ul>
          {whereMoreView === false ? more("whereArr" ,6) : more("whereArr")}
          {whereMoreView === false ? (
            <li onClick={onWhereMoreView} className="more">
              + 더 보기
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
      <div className="filter who">
        <h3>누구와 함께 하나요?</h3>
        <ul>
          {categoryAll.whoArr.map((v, i) => {
            return (
              <li key={i} onClick={(e) => onFilterClick(e, "whoArr")}>
                <span>{v}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="filter what">
        <h3>무엇을 하나요?</h3>
        <ul>
          {whatMoreView === false ? more("whatArr",6) : more("whatArr")}
          {whatMoreView === false ? (
            <li onClick={onWhatMoreView} className="more">
              + 더 보기
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
      <div className="filter feature">
        <h3>분위기와 특징</h3>
        <ul>
          {featureMoreView === false ? more("featureArr",6) : more("featureArr")}
          {featureMoreView === false ? (
            <li onClick={onFeatureMoreView} className="more">
              + 더 보기
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
      <div className="filter food">
        <h3>어떤 음식</h3>
        <ul>
          {categoryAll.foodArr.map((v, i) => {
            return (
              <li key={i} onClick={(e) => onFilterClick(e, "foodArr")}>
                <span>{v}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="filter drink">
        <h3>어떤 술/음료</h3>
        <ul>
          {categoryAll.drinkArr.map((v, i) => {
            return (
              <li key={i} onClick={(e) => onFilterClick(e, "drinkArr")}>
                <span>{v}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="filter category">
        <h3>카테고리</h3>
        <ul>
          {categoryAll.categoryArr.map((v, i) => {
            return (
              <li key={i} onClick={(e) => onFilterClick(e, "categoryArr")}>
                <span>{v}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </SidebarContainer>
  );
});

export default Sidebar;
