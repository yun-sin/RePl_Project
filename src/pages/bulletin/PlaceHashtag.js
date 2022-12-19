import React, { memo } from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';

import TagBox from '../../components/bulletin/TagBox';

const SelectHashtagBox = styled.div`
    width: 500px;
    height: 600px;
    position: relative;
    padding: 20px 20px 10px;
    box-sizing: border-box;
    background-color: tomato;
    overflow-y: scroll;
    ::-webkit-scrollbar { 
        width: 5px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #333;
        border-radius: 3px;
    }
    ::-webkit-scrollbar-track { 
        background: none;
    }

    .closePopUp {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 5px;
        font-size: 25px;
        
        &:hover {
            cursor: pointer;
            background-color: #ccc;
        }
    }

    .top-desc {
        margin-bottom: 30px;

        h3 {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        p {
            font-size: 12px;
        }
    }
`

const PlaceHashtag = memo(() => {
    const onClosePopUpClick = useCallback(e => {
        const targets = document.querySelectorAll('li');
        let values = [];

        targets.forEach(v => {
            if (v.classList.contains('active')) values.push(v.innerHTML);
        });

        console.log(values);
    }, []);

    return (
        <SelectHashtagBox>
            <button className='closePopUp' onClick={onClosePopUpClick}>X</button>
            <div className='top-desc'>
                <h3>이 장소는 어떤 곳인가요?</h3>
                <p>어울리는 태그를 선택해주세요</p>
            </div>
            <TagBox title='누구와 함께하나요?' />
            <TagBox title='무엇을 하나요?' />
            <TagBox title='분위기는 어떤가요?' />
        </SelectHashtagBox>
    );
});

export default PlaceHashtag;