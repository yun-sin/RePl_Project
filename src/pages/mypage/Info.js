import React, { memo } from 'react';
import styled from 'styled-components';
import PageContainer from '../../components/mypage/PageContainer';
import PageInputBox from '../../components/mypage/PageInputBox';

const InfoBox = styled(PageContainer)`
    
    h2 {
        margin: 0 auto;
        padding-bottom: 40px;
    }

    p {
        padding: 15px 0;
    }

    .content {
        /* background-color: pink; */
        width: 500px;
        margin: 50px auto;
        display: flex;
        flex-direction: column;
        
        .name {
            margin: 0 auto;
            padding-top: 10px;    
        }

        .changeButton {
            margin-top: 30px;
            margin-left: 305px;
        }
    }



`

const PageButton = styled.button`
    width: 130px;
    height: 37px;
    background-color:#C5441C;
    border-style: none;
    border-radius: 13px;
    color: white;
    font-size: 15px;
    cursor: pointer;

    &:hover {
        scale: 1.05;
        transition: 0.1s;
    }
`

// const infoData = {
//     info: [
//         {
//             "eName": "닉네임",
//             "introduction": "힘을내요 슈퍼파워",
//             "icon": "icon",
//             "email": "email@naver.com",
//             "point": 10
//         }
//     ]
// }

const Info = memo(() => {
    return (
        
        <InfoBox>
            <h2>마이페이지 &gt; 내 정보 관리</h2>
            <div className='content'>
                <div className='name'>
                    <p>닉네임</p>
                    <PageInputBox>닉네임</PageInputBox>
                </div>
                <div className='name'>
                    <p>한 줄 소개</p>
                    <PageInputBox>힘을내요 슈퍼파워</PageInputBox>
                </div>
                <div className='name'>
                    <p>아이콘</p>
                    <PageInputBox>👩‍⚖️</PageInputBox>
                </div>
                <div className='name'>
                    <p>이메일</p>
                    <PageInputBox>email@naver.com</PageInputBox>
                </div>
                <div className='name'>
                    <p>포인트</p>
                    <PageInputBox>30</PageInputBox>
                </div>

                <PageButton className='changeButton'>내 정보 변경하기</PageButton>
                
            </div>
        </InfoBox>
    );
});

export default Info;