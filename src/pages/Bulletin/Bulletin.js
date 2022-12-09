import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import Post from '../../components/bulletin/Post';

import banner from '../../assets/img/bulletin/banner_sample.jpg';
import postImg1 from '../../assets/img/bulletin/post_sample01.jpg';
import postImg2 from '../../assets/img/bulletin/post_sample02.jpg';
import postImg3 from '../../assets/img/bulletin/post_sample03.jpg';
import postImg4 from '../../assets/img/bulletin/post_sample04.jpg';
import postImg5 from '../../assets/img/bulletin/post_sample05.jpg';
import postImg6 from '../../assets/img/bulletin/post_sample06.jpg';

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
    display: flex;
    flex-flow: row nowrap;
    margin: 0 50px 30px 0;

    a {
      margin: 0 5px;
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
    margin-bottom: 30px;
    padding: 8px 16px;

    select {
      border: none;
      background-color: white;
      margin: 0 5px;
      padding: 5px;
    }
  }
`;

const PostList = styled.div`
  width: 85%;
  background-color: orange;
  margin: auto;
  box-sizing: border-box;

  .list-box {
    width: 100%;  
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 30px;
  }
`;

const PageControl = styled.div`
  width: 50%;
  margin: auto;
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
`;

const testData = [
  {
    targetId: 1,
    title: '게시물 1',
    img: postImg1,
    publisher: '게시자 1',
    like: 1,
    postDate: '2022-11-30',
    hashtag: ['해시태그 1', '태그 2', '3']
  },
  {
    targetId: 2,
    title: '게시물 2',
    img: postImg2,
    publisher: '게시자 3',
    like: 2,
    postDate: '2022-11-30',
    hashtag: ['해시태그 1', '태그 2', '3']
  },
  {
    targetId: 3,
    title: '게시물 3',
    img: postImg3,
    publisher: '게시자 3',
    like: 3,
    postDate: '2022-11-30',
    hashtag: ['해시태그 1', '태그 2', '3']
  },
  {
    targetId: 4,
    title: '게시물 4',
    img: postImg4,
    publisher: '게시자 4',
    like: 4,
    postDate: '2022-11-30',
    hashtag: ['해시태그 1', '태그 2', '3']
  },
  {
    targetId: 5,
    title: '게시물 5',
    img: postImg5,
    publisher: '게시자 5',
    like: 5,
    postDate: '2022-11-30',
    hashtag: ['해시태그 1', '태그 2', '3']
  },
  {
    targetId: 6,
    title: '게시물 6',
    img: postImg6,
    publisher: '게시자 6',
    like: 6,
    postDate: '2022-11-30',
    hashtag: ['해시태그 1', '태그 2', '3']
  },
];

const Bulletin = memo(() => {
    return (
        <>
            <BannerArea>
              <img src={banner} alt="배너 이미지" />
              <h1>여기는 배너 제목입니다</h1>
              <div className='links'>
                <NavLink to='/bulletin/mypost/*'>- 내 게시글 -</NavLink>
                <NavLink to='/bulletin/newpost/*'>- 글쓰기 -</NavLink>
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
                  {
                    testData.map((v, i) => {
                      return (
                        <Post
                          key={i}
                          targetId={v.targetId}
                          title={v.title}
                          img={v.img}
                          publisher={v.publisher}
                          like={v.like}
                          postDate={v.postDate}
                          hashtag={v.hashtag}
                        />
                      );
                    })
                  }
                </div>

                <PageControl>
                  <NavLink>&lt;</NavLink>
                  <NavLink to='/bulletin?page=1'>1</NavLink>
                  <NavLink to='/bulletin?page=2'>2</NavLink>
                  <NavLink to='/bulletin?page=3'>3</NavLink>
                  <NavLink to='/bulletin?page=4'>4</NavLink>
                  <NavLink to='/bulletin?page=5'>5</NavLink>
                  <NavLink to='/bulletin?page=6'>6</NavLink>
                  <NavLink to='/bulletin?page=7'>7</NavLink>
                  <NavLink to='/bulletin?page=8'>8</NavLink>
                  <NavLink to='/bulletin?page=9'>9</NavLink>
                  <NavLink to='/bulletin?page=10'>10</NavLink>
                  <NavLink>&gt;</NavLink>
                </PageControl>
              </PostList>
            </MainArea>
        </>
    );
});

export default Bulletin;