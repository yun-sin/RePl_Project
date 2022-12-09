import React, { memo } from 'react';
import styled from 'styled-components';

const InputBox = styled.div`
    width: 350px;
    height: 40px;
    border-radius: 10px;
    box-shadow: 2px 2px 5px #DADADA;
    font-size: 13px;
    color: #0584BB;
    font-weight: bold;
    line-height: 3.2;
    padding: 0 10px;
`
const PageInputBox = memo(({children}) => {
    return (
        <InputBox>
            {children}
        </InputBox>
    );
});

export default PageInputBox;