import styled from "styled-components";

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

  div {
    background-color: rgb(255, 255, 255, 0.99);
    border-radius: 10px;
    width: 300px;
    height: 150px;
    margin: 10px;
    padding: 20px;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 10px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

    &.hover {
      background-color: #ccc;
      color: white;
    }

    &.active {
      background-color: #39f;
      color: white;
    }

    h3 {
      text-align: center;
      margin-bottom: 15px;
    }

    h4 {
      font-size: 14px;
      margin-bottom: 15px;
    }
  }
`;
