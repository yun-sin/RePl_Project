import React, { memo } from 'react';
import PageInputBox from '../../components/mypage/PageInputBox';
import styled from 'styled-components';
import PageContainer from '../../components/mypage/PageContainer';

const NotiCon = styled(PageContainer)`

    .contents {
        margin: 60px auto;
        /* background-color: pink; */
        /* width: 70%; */
        display: flex;
        flex-direction: column;
        align-items: center;

        span {
            margin-right: 30px;
            font-size: 20px;
            /* background-color: pink; */
            line-height: 60px;
            color: #424242;

        }
        
        .notiMapCnt {
            font-size: 14px;
        }
    }

`

const Noti = memo(() => {

    const notiArr = [
        { emoji: '👶', name: 'test' , mapCnt: 4 },
        { emoji: '👶', name: 'test' , mapCnt: 4 },
        { emoji: '👶', name: 'test' , mapCnt: 4 },
      ];


    return (
        <NotiCon>
            <h2>마이페이지 &gt; 신고목록</h2>
            <div className='contents'>
                {notiArr.map((v, i) => {
                    return (
                        <PageInputBox key={i} className='inputBox' height={'60px'}>
                            <span className='notiEmoji'>{v.emoji}</span>
                            <span className='notiName'>{v.name}</span>
                            <span className='notiMapCnt'>{v.mapCnt}개의 테마</span>
                        </PageInputBox>
                    )
                })}
            </div>
        </NotiCon>
    );
});

export default Noti;