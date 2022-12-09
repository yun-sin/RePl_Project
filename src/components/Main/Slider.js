import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

/** glider
 * https://www.npmjs.com/package/react-glider
 */
import Glider from "react-glider";
import "glider-js/glider.min.css";
import "../../assets/css/styles.css";

// 임시데이터 
let data = [
  {id : 1, emoji : '🍣',  title: '초밥', desc: '10명의 사용자'},
  {id : 2, emoji : '🥗',  title: '샐러드', desc: '20명의 사용자'},
  {id : 3, emoji : '🍞',  title: '식빵', desc: '30명의 사용자'},
  {id : 4, emoji : '🍔',  title: '햄버거', desc: '40명의 사용자'},
  {id : 5, emoji : '🍥',  title: '라면', desc: '50명의 사용자'},
  {id : 6, emoji : '🍮',  title: '푸딩', desc: '40명의 사용자'},
  {id : 7, emoji : '🍷',  title: '와인', desc: '30명의 사용자'},
  {id : 8, emoji : '☕️',  title: '커피', desc: '20명의 사용자'},
];
// 임시데이터 배열 랜덤 처리
data = data.sort(() => Math.random() - 0.5);

const Slider = memo(() => {
  const gliderRef = React.useRef(null);
  return (
    <div className="container">
     
      <Glider
        className="glider-container"
        draggable
        hasArrows
        slidesToShow={1}
        slidesToScroll={1}
        ref={gliderRef}
      >
          {data.map(({id, emoji, title, desc}, i) => {
            return (
              <div key={i}>
                <NavLink to={`/theme/${id}`}>
                  <div>{emoji}</div>
                  <div>{title}</div>
                  <div>{desc}</div>
                </NavLink>
              </div>
            )
          })}
      </Glider>
    </div>
  );
});

export default Slider;
