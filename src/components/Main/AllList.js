import React, { memo, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getThemeData } from "../../slices/ThemeSlice";


// 임시데이터
// let data = [
//   {
//     id: 1,
//     emoji: "💻",
//     title: "혼자 노트북들고 작업하러 가기 좋은 곳",
//     desc: "10명의 사용자",
//   },
//   {
//     id: 2,
//     emoji: "👯‍♀️",
//     title: "우리 동네에 친구가 놀러오면 데려가는 곳",
//     desc: "20명의 사용자",
//   },
//   { id: 3, emoji: "🍞", title: "빵지순례 필수코스", desc: "30명의 사용자" },
//   { id: 4, emoji: "🍔", title: "햄버거가 맛있는 곳", desc: "40명의 사용자" },
//   { id: 5, emoji: "🍥", title: "라면이 맛있는 곳", desc: "50명의 사용자" },
//   { id: 6, emoji: "🍮", title: "푸딩이 맛있는 곳", desc: "40명의 사용자" },
//   { id: 7, emoji: "🍷", title: "와인이 맛있는 곳", desc: "30명의 사용자" },
//   { id: 8, emoji: "☕️", title: "커피가 맛있는 곳", desc: "20명의 사용자" },
//   { id: 9, emoji: "🍛", title: "혼밥하기 좋은 곳", desc: "20명의 사용자" },
// ];

const ThemeContainer = styled.div`
  margin-bottom: 30px;
  /* padding: 30px;
  box-sizing: border-box; */
  width: 60%;
  margin: auto;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .link {
      display: block;
      text-decoration: none;
      width: 32%;
      /* flex: none; */
      margin-bottom: 30px;
    }
    li {
      background-color: #f8f8f8;
      text-align: center;
      text-decoration: none;
      border-radius: 12px;
      box-shadow: 3px 3px 8px rgb(0 0 0 / 20%);
      padding: 30px;
      box-sizing: border-box;
      height: 180px;

      .emoji {
        font-size: 30px;
        margin-bottom: 20px;
      }
      .title {
        font-size: 15px;
        margin-bottom: 20px;
        color: #131017;
      }
      .desc {
        font-size: 12px;
        color : #666;
      }
    }
  }
`;

const AllList = memo(() => {
  const { data: data } = useSelector((state) => state.ThemeSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getThemeData());
  },[]);

  return (
    <ThemeContainer>
      <ul>
        {/* 추후에 인피니티 스크롤 적용해야함 */}
        {data?.map(({ id, icon, text, user_number }, i) => {
          return (
            <NavLink to={`map?theme=${id}`} className="link" key={i}>
              <li>
                <div className="emoji">{icon}</div>
                <div className="title">{text}</div>
                <div className="desc">{user_number}명의 큐레이터</div>
              </li>
            </NavLink>
          );
        })}
      </ul>
    </ThemeContainer>
  );
});

export default AllList;
