import React, { memo } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import iconPlus from "../assets/img/map/icon-plus-grey-sm.svg";

export const LocModalContainer = styled.div`
  letter-spacing: -0.5px;
  color: #666666;
  line-height: 21.45px;

  .modal-header {
    padding: 0 0 30px;
    position: relative;
    h3 {
      color: #0581bb;
      font-weight: 600;
      font-size: 21px;
      margin-bottom: 8px;
    }

    span {
      font-size: 13px;
      cursor: pointer;

      &:hover {
        color: black;
      }
    }

    .faX {
      font-size: 30px;
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
    }
  }

  .modal-body {
    .title {
      font-size: 14px;
      font-weight: 600;
    }
    .modal-img-container {
      width: 700px;
      height: 160px;
      background-color: #e5e5e5;
      text-align: center;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      cursor: pointer;
      margin-bottom: 30px;

      .icon {
        margin-bottom: 10px;
      }

      .text {
        font-size: 13px;
        font-weight: 400;
        line-height: 21.45px;
      }
    }

    .modal-info-container {
      display: flex;

      .info {
        width: 50%;
        padding-right: 20px;

        &:last-of-type {
          padding-right: 0;
          padding-left: 20px;
        }

        .info-item {
          margin-bottom: 40px;

          .theme-card {
            margin: 8px 0;
            font-size: 13px;
            width: 330px;
            height: 51.5px;
            padding: 15px 20px;
            box-sizing: border-box;
            box-shadow: 3px 3px 8px rgb(0 0 0 / 20%);
            border-radius: 12px;
          }
        }
      }
    }
  }
`;

const LocModal = memo(({ title, address, onClick, theme, review }) => {
  return (
    <LocModalContainer>
      <div className="modal-header">
        <h3>{title}</h3>
        <span>{address}</span>
        <FontAwesomeIcon className="faX" icon={faX} onClick={onClick} />
      </div>
      <div className="modal-body">
        {/* 이미지 칸 */}
        <div className="modal-img-container">
          <div className="icon">
            <img src={iconPlus} />
          </div>
          <div className="text">
            여기를 눌러서 장소와 관련된 사진을 올려주시면
            <br />
            페이지가 더 유익해 질 것 같아요!
          </div>
        </div>

        <div className="modal-info-container">
          {/* 왼쪽 줄 */}
          <div className="info">
            <div className="info-item">
              <div className="title">여기는 어떤 곳인가요?</div>
              {theme?.map((v, i) => {
                return (
                  <div key={i} className="theme-card">
                    {v}
                  </div>
                );
              })}
            </div>
            <div className="info-item">
              <div className="title">123</div>
            </div>
          </div>

          {/* 오른쪽 줄 */}
          <div className="info">
            <div className="info-item">
              <div className="title">이 장소에 대한 후기들!</div>
              {review?.map((v, i) => {
                return (
                  <div key={i} className="theme-card">
                    {v}
                  </div>
                );
              })}
            </div>
            <div className="info-item">
              <div className="title">직접 의견을 남겨보세요!</div>
            </div>
          </div>
        </div>

        <div className="modal-bullet-container">
          <div className="title">이 장소를 추천한 게시글 목록</div>
        </div>
      </div>
      <div className="modal-footer"></div>
    </LocModalContainer>
  );
});

LocModal.defaultProps = {
  title: "장소이름 ???",
  address: "위치 ???",
};

export default LocModal;
