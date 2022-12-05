import styled from "styled-components";

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
