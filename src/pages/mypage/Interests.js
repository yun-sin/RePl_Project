import React, { memo, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

import PageContainer from '../../components/mypage/PageContainer';
import PageButton from '../../components/mypage/PageButton';

import { useSelector, useDispatch } from 'react-redux';
import { getInfo } from '../../slices/InfoSlice';
import { getInterest } from '../../slices/InterestSlice';

import InterestModal from '../../components/mypage/InterestModal';

const infoData = {

    "eName": "닉네임",
    "introduction": "힘을내요 슈퍼파워",
    "icon": "icon",
    "email": "email@naver.com",
    "point": 10,
    "interests": ["🧍 혼자서", "☕️ 커피", "🍷 와인","🍺 맥주", "🥗 채식/비건", "🍰 디저트","🌞 점심식사","🎧 음악듣기", "📖 책읽기", "🐶 반려동물과","👐 수제","🥪 간단한음식", "☕️ 커피", "🍷 와인","🧍 혼자서", "☕️ 커피","🍷 와인","🧍 혼자서", "☕️ 커피", "🍷 와인","🧍 혼자서", "☕️ 커피", "🍷 와인",],
    "map": [],
    "follower": [],
    "following": [],
    "noti": [], 
}

const InterestBox = styled(PageContainer)`
    
    .tagCon {
        width: 50%;
        margin: 100px auto;
        position: relative;
        .tag {
            
            background-color: #f3f5f7;
            padding: 10px;
            display: inline-block;
            margin-top: 20px;
            margin-right: 10px;
            border-radius: 10px;

            .imgIcon {
                padding-right: 5px;
            }
            
        }
        
        .addButton {
            position: absolute;
            right: 0;
            bottom: -70px;
        }
    }
`

const Interests = memo(() => {

    const dispatch = useDispatch();
    const { data, loading, error} = useSelector((state) => state.InfoSlice);

    // const { data:data2, loading:loading2, error:error2} = useSelector((state) => state.InterestSlice);
    
    //관심사 추가 상태관리
    const [IMDIsOpen, setIMDIsOpen] = useState(false);
    const handleInterestModal = useCallback((e) => {
        e.preventDefault();
        setIMDIsOpen(true);
      });

    
    useEffect(()=> {
        dispatch(getInfo());
        // dispatch(getInterest());
    }, [dispatch])

    const idData = data?.find((v, i) => v.id === 2)
    
    return (
        <InterestBox>
            <h2>마이페이지 &gt; 내 관심사</h2>
            <div className='tagCon'>
                {idData?.interests.map((v, i) => {
                    
                    return (
                        <div key={v.id} className="tag" >
                            <span className='imgIcon'>{v.icon}</span>
                            <span>{v.dsec}</span>
                        </div>
                    )
                })}
            <PageButton className='addButton' onClick={handleInterestModal}>관심사 추가하기</PageButton>
            </div>

            {IMDIsOpen && <InterestModal IMDIsOpen={IMDIsOpen} onRequestClose={() => setIMDIsOpen(false)} idInterestData={idData?.interests}/>}
        </InterestBox>
    );
});

export default Interests;