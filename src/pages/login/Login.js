import React, { memo } from 'react';
import styled from 'styled-components';
import PageButton from '../../components/mypage/PageButton';

const EmailLoginCon = styled.div`
    display: flex;
    flex-direction: column;
    background-color: pink;
    align-items: center;
    
    h2 {
        text-align: center;
        margin: 80px 0;
        font-weight: bold;
        font-size: 18px;
    }

    .join {
        display: flex;
        flex-direction: column;

        label {
            margin-right: 10px;
        }

        input {
          width: 360px;
          height: 64px;
          border: none;
          outline: none;
          border-radius: 12px;
          padding-left: 20px;
          box-sizing: border-box;
          color: #0581bb;
        }
    }
`

const Login = memo(() => {
    return (
        <EmailLoginCon>
            <h2>리플 로그인하기</h2>
            <div className='join'>
                <form action="">
                    <label htmlFor='emailId'>아이디</label>
                    <input type="text" name='emailId' id='emailId'/>
                    <label htmlFor='emailPwd'>비밀번호</label>
                    <input type="text" name='emailPwd' id='emailPwd'/>
                </form>
                <PageButton className='loginButton' width='180px' color='#0584BB'>로그인</PageButton>
            </div>
        </EmailLoginCon>
    );
});

export default Login;