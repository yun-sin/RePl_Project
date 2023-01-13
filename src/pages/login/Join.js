import React, { memo } from 'react';
import styled from 'styled-components';
import PageButton from '../../components/mypage/PageButton';
import { NavLink } from 'react-router-dom';
import RegexHelper from '../../helper/RegexHelper';

const JoinCon = styled.div`
    display: flex;
    flex-direction: column;
    /* background-color: pink; */
    align-items: center;
    
    h2 {
        text-align: center;
        margin-top: 70px;
        margin-bottom: 60px;
        font-weight: bold;
        font-size: 18px;
    }

    .joinCon {
        display: flex;
        flex-direction: column;
        width: 300px;
        /* background-color: skyblue; */
        
        label {
            margin-right: 10px;
            font-size: 14px;
        }
        
        input {
          box-shadow: 1px 2px 5px #DADADA;
          width: 100%;
          height: 40px;
          border: none;
          outline: none;
          border-radius: 12px;
          padding-left: 20px;
          box-sizing: border-box;
          color: #0581bb;
          margin-bottom: 25px;
          margin-top: 10px;
        }

        /* #userId {
            width: 80%;
        } */

        .joinButton {
            width: 100%;
            margin-top: 20px;
            margin-bottom: 60px;
        }

        .link {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            font-size: 14px;
        }

        .nameBox {
            display: flex;
            /* background-color: yellow; */

            .checkId {
                margin-left: 10px;
                margin-top: 10px;
            }
        }
    }
`

const Join = memo(() => {
    return (
        <JoinCon>
            <h2>회원가입</h2>
            <div className='joinCon'>
                <form action="">
                    <label htmlFor='name'>이름</label>
                    <input type="text" name='name' id='name' placeholder='이름을 입력하세요'/>

                    <label htmlFor='userId'>아이디</label>
                    <div className='nameBox'>
                        <input type="text" name='userId' id='userId' placeholder='아이디를 입력하세요'/>
                        <PageButton className='checkId' width='90px' height='40px' color='#0584BB' >중복확인</PageButton>
                    </div>

                    <label htmlFor='eName'>닉네임(변경가능)</label>
                    <div className='nameBox'>
                        <input type="text" name='eName' id='eName' placeholder='닉네임을 입력하세요'/>
                        <PageButton className='checkId' width='90px' height='40px' color='#0584BB' >중복확인</PageButton>
                    </div>

                    <label htmlFor='email'>이메일</label>
                    <input type="text" name='email' id='email' placeholder='이메일을 입력하세요'/>

                    <label htmlFor='userPw'>비밀번호</label>
                    <input type="text" name='userPw' id='userPw' placeholder='비밀번호를 입력하세요'/>

                    <label htmlFor='userPw2'>비밀번호 확인</label>
                    <input type="text" name='userPw2' id='userPw2' placeholder='비밀번호를 입력하세요'/>

                    <PageButton type='submit' className='joinButton' width='180px' height='50px' color='#0584BB'>가입하기</PageButton>
                </form>
            </div>
        </JoinCon>
    );
});

export default Join;