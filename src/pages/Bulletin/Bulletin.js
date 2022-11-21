import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import Post from '../../components/bulletin/Post';

import banner from '../../assets/img/bulletin/banner_sample.jpg';

const BannerArea = styled.div`
  width: 100%;
  height: 300px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }

  h1 {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);

    font-size: 28px;
    margin-bottom: 30px;
    font-weight: 600;
    color: skyblue;
  }

  .links {
    position: absolute;
    bottom: 0;
    right: 0;

    margin: 0 50px 30px 0;

    a {
      padding: 6px 10px;
      background-color: white;
      border: 1px solid #ccc;
      text-decoration: none;
      color: skyblue;
    }
  }
`;

const MainArea = styled.section`
  width: 100%;
  padding: 16px 32px;
  background-color: #bbb;
  box-sizing: border-box;

  .main__option-bar {
    width: 85%;
    margin: auto;
    padding: 8px 16px;

    select {
      border: none;
      background-color: white;
      margin: 0 5px;
      padding: 5px;
    }
  }
`

const PostList = styled.div`
  width: 85%;
  background-color: orange;
  margin: auto;
  margin-top: 30px;
  box-sizing: border-box;

  .list-box {
    width: 100%;  
    display: flex;
    flex-flow: row wrap;
  }

  .page_control {
    width: 700px;
    margin: auto;
    display: flex;
    flex-flow: row nowrap;
  }
`

const PageControl = styled.div`
  width: 50%;
  margin: auto;
  margin-top: 30px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;

  a {
    display: inline-block;
    width: 8.3%;
    text-align: center;
    padding: 10px 5px;

    background-color: #ccc;
    text-decoration: none;
    color: black;
    font-size: 16px;

    &:hover,
    .active {
      background-color: black;
      color: white;
    }
  }
`

const Bulletin = memo(() => {
    return (
        <>
            <BannerArea>
              <img src={banner} alt="배너 이미지" />
              <h1>여기는 배너 제목입니다</h1>
              <div className='links'>
                <NavLink to='/bulletin/mypost/*'>내 게시글</NavLink>
                <NavLink to='/bulletin/newpost/*'>글쓰기</NavLink>
              </div>
            </BannerArea>

            <MainArea>
              <div className='main__option-bar'>
                <select name="align" id="align">
                  <option value="">인기순</option>
                  <option value="">최신순</option>
                </select>
                <select name="category" id="category">
                  <option value="">-- 카테고리를 선택하세요 --</option>
                </select>
                <select name="area" id="area">
                  <option value="">-- 지역을 선택하세요 --</option>
                </select>
              </div>

              <PostList>
                <div className='list-box'>
                  <Post />
                  <Post />
                  <Post />
                  <Post />
                  <Post />
                  <Post />
                </div>

                <PageControl>
                  <NavLink>&lt;</NavLink>
                  <NavLink>1</NavLink>
                  <NavLink>2</NavLink>
                  <NavLink>3</NavLink>
                  <NavLink>4</NavLink>
                  <NavLink>5</NavLink>
                  <NavLink>6</NavLink>
                  <NavLink>7</NavLink>
                  <NavLink>8</NavLink>
                  <NavLink>9</NavLink>
                  <NavLink>10</NavLink>
                  <NavLink>&gt;</NavLink>
                </PageControl>
              </PostList>
            </MainArea>
        </>
    );
});

export default Bulletin;