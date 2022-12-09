import styled from "styled-components";

/** MapContainer */
export const MapContainer = styled.div`
  .yourLoc {
    font-size: 50px;
    color: red;
    position: fixed;
    right: 4vw;
    bottom: 4vw;
    z-index: 1;
    background-color: white;
    padding: 10px;
    border-radius: 100%;
    cursor: pointer;
    opacity: 0.8;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

    &:hover {
      opacity: 1;
    }
  }
`;

/** ListContainer */
export const ListContainer = styled.div`
  position: fixed;
  height: 100%;
  top: 70px;
  left: 20px;
  z-index: 1;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  .sort {
    width: 30px;
    height: 60px;
    padding-top: 10px;
    box-sizing: border-box;
    text-align: center;
    line-height: 20px;
    position: fixed;
    left: 0;
    background-color: #ccc;
    color: white;
    top: 80px;
  }

  .sort-by-distance {
    background-color: #da4c1f;
    width: 30px;
    height: 80px;
    position: fixed;
    left: 0;
    top: 140px;
    text-align: center;
    line-height: 20px;
    padding-top: 10px;
    box-sizing: border-box;
    /* border-radius: 5px; */
    opacity: 0.7;
    cursor: pointer;
    color: white;

    &:hover {
      opacity: 1;
    }
  }

  .list_item {
    background-color: rgb(255, 255, 255, 0.99);
    border-radius: 10px;
    width: 290px;
    height: 110px;
    margin: 10px;
    padding: 15px 20px;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 10px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    letter-spacing: -0.5px;
    position: relative;

    .more_btn {
      position: absolute;
      top: 8px;
      right: 7px;
      padding: 7px 11px 4px;
      box-sizing: border-box;
      line-height: 32.3px;

      &:hover {
        border-radius: 5px;
        background-color: #80b3e6;
      }

      img {
        height: 16px;
      }
    }

    h3 {
      font-weight: 600;
      color: #0581bb;
      font-size: 16px;
      line-height: 30.4px;
    }

    h4 {
      font-size: 11px;
      margin-bottom: 12px;
      color: #adadad;
      font-weight: 400;
      line-height: 20.9px;
    }

    a {
      font-size: 12px;
      color: #545454;
      font-weight: 200;
    }

    &.hover {
      background-color: #ccc;
      color: white;

      h3 {
        color: white;
      }

      h4 {
        color: #fff;
      }
    }

    &.active {
      background-color: #39f;
      color: white;

      h3 {
        color: white;
      }

      h4 {
        color: #fff;
      }
    }
  }

  .modal-bg {
    width: 100vw;
    height: 100vh;
    /* background-color: red; */
    position: fixed;
    top: 0;
  }
`;

export const SearchLoc = styled.div`
  width: 200px;
  height: 50px;
  border-radius: 10px;
  background-color: #da4c1f;
  z-index: 1;
  position: fixed;
  line-height: 1.8;
  font-weight: bold;
  color: white;
  bottom: 4vw;
  left: 50%;
  transform: translate(-50%, 0);
  opacity: 0.8;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  display: flex;

  &:hover {
    opacity: 1;
  }

  span {
    width: 80%;
  }

  input,
  svg {
    width: 20%;
    margin: 6.5px 0;
  }
`;
