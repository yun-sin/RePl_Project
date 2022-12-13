import React, { memo } from 'react';
import PageContainer from '../../components/mypage/PageContainer';
import PageInputBox from '../../components/mypage/PageInputBox';
import PageButton from '../../components/mypage/PageButton';
import styled from 'styled-components';

const TabMenu = styled.ul`
    /* background-color: #dcdcdc; */
    font-weight: bold;
    display: flex;
    width: 400px;
    margin: 30px auto;
    color: #424242;
    .submenu {
        width: 100%;
        padding: 15px 10px;
        cursor: pointer;
        margin: 0 auto;
        /* background-color: pink; */
        text-align: center;
        border-bottom: 2px solid #dcdcdc;

        &.focused {
            color: #0584BB;
            font-weight: bold;
            border-bottom: 2px solid #0584BB;
        }
    }
`;

const FollowCon = styled(PageContainer)`

    .contents {
        margin: 0 auto;
        /* background-color: pink; */
        /* width: 70%; */
        display: flex;
        flex-direction: column;
        align-items: center;
        
    }

`

const Follow = memo(() => {
    const [currentTab, setCurrentTab] = React.useState(0);

    const menuArr = [
        { name: '팔로워', follow: ['a', 'b', 'c', 'd', 'e', 'f'] },
        { name: '팔로잉', follow: ['A', 'B', 'C'] },
      ];
    
      const selectMenuHandler = (index) => {
        setCurrentTab(index);
      };

    return (
       <FollowCon>
            <h2>마이페이지 &gt; 팔로우/팔로잉</h2>

            <TabMenu>
                {menuArr.map((v, index)=>{
                    return (
                    <li
                        key={index}
                        className={currentTab === index ? "submenu focused" : "submenu"}
                        onClick={()=> selectMenuHandler(index)}
                        >
                    {v.name}
                    </li>
                    )
                })}
            </TabMenu>
            <div className='contents'>
                {menuArr[currentTab].follow.map((v, i) => {
                    return (
                        <PageInputBox key={i} className='inputBox' height={'50px'}>{v}</PageInputBox>
                    )
                })}
            </div>
       </FollowCon>
    );
});

export default Follow;