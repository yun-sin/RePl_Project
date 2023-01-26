import React, { memo, useEffect, useState, useCallback } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { useQueryString } from '../../hooks/useQueryString';
import Pagenation from '../../components/Pagenation';

import { useSelector, useDispatch } from 'react-redux';
import { getList } from '../../slices/bulletin/BulletinSlice';
import { getTags } from '../../slices/bulletin/HashtagSlice';

import Post from '../../components/bulletin/Post';
import Spinner from '../../components/Spinner';

const BannerArea = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #39f;
  font-weight: 900;

  .banner__title {
    h1 {
      font-size: 40px;
      margin-bottom: 30px;
      font-weight: 900;
    }

    p {
      font-size: 20px;
      line-height: 1.5;
    }
  }

  .linksWrap {
    width: 1200px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
  }

  .links {
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 5px;

    a {
      margin: 0 5px;
      padding: 6px 10px;
      background-color: #fff;
      text-decoration: none;
      color: #0581bb;
      border-radius: 12px;

      &:hover {
        background-color: #0581bb;
        color: #fff;
      }
    }
  }
`;

const MainArea = styled.section`
  width: 1200px;
  margin: auto;
  padding: 16px 32px;
  background-color: #fff;
  box-sizing: border-box;

  .main__option-bar {
    width: 100%;
    margin: auto;
    margin-bottom: 30px;

    select,
    input,
    button {
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #fff;
      margin: 0 5px;
      padding: 5px;
      font-size: 12px;
    }

    input {
        width: 500px;
    }

    button {
        padding: 5px 10px;

        &:hover {
            cursor: pointer;
            background-color: #eee;
        }
    }
  }
`;

const PostList = styled.div`
  width: 100%;
  background-color: #fff;
  margin: auto;
  box-sizing: border-box;

  .list-box {
    width: 100%;  
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 30px;
  }
`;

const Bulletin = memo(() => {
    /** QueryString 변수 받기 */
    const { query, page=1, tag } = useQueryString();
    const navigate = useNavigate();

    /** 슬라이스에서 불러오는 데이터들 */
    const dispatch = useDispatch();
    const { pagenation, data, loading, error } = useSelector(state => state.BulletinSlice);
    const { data: tags, loading: loading2, error: error2 } = useSelector(state => state.HashtagSlice);

    const [isUpdate, setIsUpdate] = useState(0);
    const [sort, setSort] = useState(false);

    // 데이터 적재
    useEffect(() => {
        dispatch(getList({
            query: query,
            tag: tag,
            page: page,
            rows: 8,
            sortByLike: sort
        }));
        dispatch(getTags());
    }, [query, page, isUpdate, sort]);

    /** 옵션 검색 구현을 위한 State들 */
    const [classification, setClassification] = useState(0);
    const [tagOptions, setTagOptions] = useState([]);

    // 정렬 방식 변경시 이벤트
    const onSortWayChange = useCallback(e => {
        e.preventDefault();

        const way = e.currentTarget.value;

        setSort(state => {
            return (way === 'p');
        });
    }, []);

    // 대분류 select 변경시 이벤트
    const onCategoryFieldChange = useCallback(e => {
        e.preventDefault();

        const fieldIndex = e.currentTarget.value;
        setClassification(fieldIndex);
    }, []);

    useEffect(() => {
        if (classification == 0) {
            setTagOptions([]);
        } else {
            setTagOptions(tags[classification - 1].values);
        }
    }, [classification]);

    // 소분류 select 변경시 이벤트
    const onSubCategoryChange = useCallback(e => {
        e.preventDefault();

        // setSelectedTag(state => parseInt(e.currentTarget.value));
        let redirectUrl = `/bulletin?tag=${e.currentTarget.value}`;
        redirectUrl = query ? redirectUrl + `&query=${query}` : redirectUrl;
        navigate(redirectUrl);
        setIsUpdate(state => state + 1);
    }, []);

    /** 게시글 검색 이벤트 */
    const onPostQuerySubmit = useCallback(e => {
        e.preventDefault();

        let redirectUrl = '/bulletin?';
        const query = e.currentTarget.query.value;

        if (query) redirectUrl += `query=${query}`;
        if (tag) redirectUrl += `&tag=${tag}`;

        navigate(redirectUrl);
    }, [tag]);
    return (
        <>
            <BannerArea>
                <div className="banner__title">
                    <h1>사람들의 서울 이야기</h1>
                    <p>게시글은 직접 리뷰를 남긴 장소를 대상으로 작성 가능해요.<br/>아래의 썸네일을 클릭해서 사람들의 취향과 개성이 담긴 이야기를 직접 읽어보세요.</p>
                </div>
                <div className="linksWrap">
                        <div className='links'>
                            <NavLink to='/bulletin/mypost/*'>- 내 게시글 -</NavLink>
                            <NavLink to='/bulletin/newpost/*'>- 글쓰기 -</NavLink>
                        </div>
                </div>
            </BannerArea>

            <MainArea>
                <form className='main__option-bar' onSubmit={onPostQuerySubmit}>
                    <select name="align" id="align" onChange={onSortWayChange}>
                        <option value="l">최신순</option>
                        <option value="p">인기순</option>
                    </select>
                    <select name="category" id="category" onChange={onCategoryFieldChange}>
                        <option value="0">-- 카테고리 --</option>
                        {
                            tags && tags.map((v, i) => {
                                return (
                                    <option key={i} value={i + 1}>{v.subject}</option>
                                )
                            })
                        }
                    </select>
                    <select name="subCategory" id="subCategory" onChange={onSubCategoryChange}>
                        <option value="-1">-- 세부 카테고리 --</option>
                        {
                            tagOptions && tagOptions.map((v, i) => {
                                return (
                                    <option key={i} value={v.id}>{v.name}</option>
                                )
                            })
                        }
                    </select>
                    <input type="text" name="query" placeholder="검색어를 입력하세요."></input>
                    <button type='submit'>검색하기</button>
                </form>

                <PostList>
                    <div className='list-box'>
                        <Spinner loading={loading} />
                        {
                            data && data?.item.map((v, i) => {
                                return (
                                    <Post
                                        key={i}
                                        targetId={v.id}
                                        postTitle={v.title}
                                        backgroundImage={v.bgimage}
                                        backgroundColor={v.bgcolor}
                                        postUser={v.username}
                                        like={v.like}
                                        postDate={v.postdate}
                                        selectedTags={v.tags}
                                    />
                                );
                            })
                        }
                    </div>

                    {pagenation && (<Pagenation pagenation={pagenation} />)}
                </PostList>
            </MainArea>
        </>
    );
});

export default Bulletin;