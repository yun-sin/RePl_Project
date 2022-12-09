import React, { memo } from 'react';
import styled from 'styled-components';
import PageContainer from '../../components/mypage/PageContainer';
import PageInputBox from '../../components/mypage/PageInputBox';
import AllList from '../../components/Main/AllList';



const MapBox = styled(PageContainer)`
    
    h2 {
        padding-bottom: 40px;
    }

    .mapCon {
        display: flex;
        background-color: #eee;
    }

`

const Map = memo(() => {
    return (
        <MapBox>
            <h2>마이페이지 &gt; 나의 지도 관리</h2>
            <div className='mapCon'>
                <div className='theme'>
                    <h3>🗺 나의 테마지도 모아보기</h3>
                    <PageInputBox width={'300px'} height={'120px'}></PageInputBox>
                    
                </div>
                <div className='curation'>
                    <h3>🏕 나의 큐레이션 지도</h3>
                </div>
            </div>
        </MapBox>
    );
});

export default Map;