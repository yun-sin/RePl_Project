import React, { memo, useCallback, useState } from 'react';

import styled from 'styled-components';

const MainForm = styled.form`
    width: 100%;
`;

const TitleArea = styled.div`
    width: 100%;
    margin: auto;
    height: 400px;
    position: relative;

    .title-edit-menu {
        display: flex;
        flex-flow: column nowrap;
        position: absolute;
        right: 20%;
        top: 10%;

        label,
        button,
        input {
            display: inline-block;
            width: 30px;
            height: 30px;
            margin: 5px 0;

            border: 1px solid #aaa;
            background-color: white;
            text-align: center;
            line-height: 30px;
            font-size: 15px;
            font-weight: 600;

            &:hover {
                cursor: pointer;
            }
        }
    }

    .title-input {
        width: 500px;
        height: 150px;
        background-color: #00000022;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
        box-sizing: border-box;
        padding: 10px;

        input {
            background: none;
            border: none;
            color: white;

            &::placeholder {
                color: white;
            }
        }

        .title-input__main-title {
            width: 480px;
            height: 70px;
            font-size: 40px;
        }

        .title-input__desc {
            width: 100%;
            height: 40px;
            margin-top: 20px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;

            input {
                font-size: 20px;
                display: inline-block;
                width: 200px;

                &:last-child {
                    text-align: right;
                }
            }
        }
    }
`;

const NewPost = memo(() => {
    const onPosting = useCallback(e => {
        e.preventDefault();
    }, []);

    const [backgroundColor, setBackgroundColor] = useState('#cccccc');

    const onBackgroundColorInputChange = useCallback(e => {
        setBackgroundColor(e.currentTarget.value);
    }, []);

    return (
        <MainForm onSubmit={onPosting}>
            <TitleArea style={{ backgroundColor: backgroundColor }}>
                <div className="title-edit-menu">
                    <label htmlFor="backgroundImageInput">B</label>
                    <input type="file"
                        accept='.jpg,.PNG'
                        name='backgroundImageInput'
                        id='backgroundImageInput'
                        style={{display: 'none'}}
                    />
                    <input type="color" name="backgroundColorInput" id="backgroundColorInput" onChange={onBackgroundColorInputChange}/>
                    <button>A</button>
                </div>
                <div className='title-input'>
                    <input type="text" name='postTitle' className='title-input__main-title' placeholder='제목을 입력하세요' />
                    <div className='title-input__desc'>
                        <input type="text" name='postDate' placeholder='게시일' disabled />
                        <input type="text" name='postUser' placeholder='게시자' disabled />
                    </div>
                </div>
            </TitleArea>
            <hr />


        </MainForm>
    );
});

export default NewPost;