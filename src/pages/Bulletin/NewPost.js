import React, { memo, useCallback } from 'react';

import styled from 'styled-components';

const MainForm = styled.form`
    width: 100%;
`;

const TitleArea = styled.div`
    width: 85%;
    height: 400px;

    .title-edit-menu {
        display: flex;
        flex-flow: column nowrap;

        label,
        button {
            display: inline-block;
            width: 30px;
            height: 30px;

            &:hover {
                cursor: pointer;
            }
        }
    }
`;

const NewPost = memo(() => {
    const onPosting = useCallback(e => {
        e.preventDefault();
    });

    return (
        <MainForm onSubmit={onPosting}>
            <TitleArea>
                <div className="title-edit-menu">
                    <label htmlFor="backgroundImageInput">B</label>
                    <input type="file"
                        accept='.jpg,.PNG'
                        name='backgroundImageInput'
                        id='backgroundImageInput'
                        style={{display: 'none'}}
                    />
                    <button>C</button>
                    <button>A</button>
                </div>
            </TitleArea>
        </MainForm>
    );
});

export default NewPost;