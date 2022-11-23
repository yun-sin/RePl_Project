import React, { memo } from "react";
import styled from "styled-components";



/** glider
 * https://www.npmjs.com/package/react-glider
 */
import Glider from "react-glider";
import "glider-js/glider.min.css";
import "../../assets/css/styles.css";


const Slider = memo(() => {
  return (
    <div className="container">
      <Glider
        className="glider-container"
        draggable
        hasArrows
        slidesToShow={1}
        slidesToScroll={1}
      >
        <div>
          <a href="#!">
            <div className="text">이모티콘</div>
            <div className="text">테마제목</div>
            <div className="text">n명의 사용자</div>
          </a>
        </div>
        <div><a href="#!">추천테마2</a></div>
        <div><a href="#!">추천테마3</a></div>
        <div><a href="#!">추천테마4</a></div>
        <div><a href="#!">추천테마5</a></div>
        
      </Glider>
    </div>
  );
});

export default Slider;
