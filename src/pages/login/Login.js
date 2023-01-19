import React, { memo, useRef, useCallback } from 'react';
import styled from 'styled-components';
import PageButton from '../../components/mypage/PageButton';
import { NavLink } from 'react-router-dom';
import RegexHelper from '../../helper/RegexHelper';

const EmailLoginCon = styled.div`
    display: flex;
    flex-direction: column;
    /* background-color: pink; */
    align-items: center;
    
    h2 {
        text-align: center;
        margin-top: 100px;
        margin-bottom: 70px;
        font-weight: bold;
        font-size: 18px;
    }

    .loginCon {
        display: flex;
        flex-direction: column;
        width: 300px;
        /* background-color: skyblue; */
        
        label {
            margin-right: 10px;
        }
        
        input {
          box-shadow: 1px 2px 5px #DADADA;
          width: 100%;
          height: 50px;
          border: none;
          outline: none;
          border-radius: 12px;
          padding-left: 20px;
          box-sizing: border-box;
          color: #0581bb;
          margin-bottom: 25px;
          margin-top: 10px;
        }

        .loginButton {
            width: 100%;
            margin-top: 20px;
        }

        .link {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            font-size: 14px;
        }
    }
`

const Login = memo(() => {

    const userId = useRef();
    const userPw = useRef();

    const onSubmit = useCallback((e) => {
        e.preventDefault();

        const regexHelper = RegexHelper.getInstance();

        try {
            regexHelper.value(
              userId.current,
              "아이디를 입력하세요."
            );
            regexHelper.value(
              userPw.current,
              "비밀번호를 입력하세요."
            );
          } catch (e) {
            alert(e.message);
            return;
          }
    });

    return (
        <EmailLoginCon>
            <h2>리플 로그인하기</h2>
            <div className='loginCon'>
                <form action="">
                    <label htmlFor='emailId'>아이디</label>
                    <input type="text" ref={userId} name='emailId' id='emailId' placeholder='아이디를 입력하세요'/>
                    <label htmlFor='emailPwd'>비밀번호</label>
                    <input type="password" ref={userPw} name='emailPwd' id='emailPwd' placeholder='비밀번호를 입력하세요'/>
                    <PageButton type='submit' className='loginButton' width='180px' height='50px' color='#0584BB' onClick={onSubmit}>로그인</PageButton>
                </form>
                <div className='link'>
                    <NavLink>아이디/비밀번호 찾기</NavLink>
                    <NavLink to='/join'>회원가입</NavLink>
                </div>
            </div>
        </EmailLoginCon>
    );
});

export default Login;