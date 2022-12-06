import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

const SubjectBox = styled.div`
    width: 100%;
    margin-bottom: 40px;

    div {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
    }

    h4 {
        color: skyblue;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 15px;
    }

    .moreTags {
        display: none;
        &.show {
            display: inline-block;
        }

        border: none;
        background: none;
        &.active {
            background-color: #ccc;
        }

        font-size: 16px;
        border-radius: 5px;
        padding: 5px 10px;

        &:hover {
            cursor: pointer;
        }
    }

    ul {
        padding: 10px 5px;
        width: 100%;
        max-height: 110px;
        overflow: hidden;

        &.active {
            overflow: visible;
            max-height: none;
        }

        li {
            display: inline-block;
            background-color: #eee;
            padding: 8px 15px;
            border-radius: 5px;
            font-size: 16px;
            margin: 0 15px 10px 0;

            &:hover {
                cursor: pointer;
                background-color: #ccc;
            }
        }
    }
`;

const testData = [
    'O 태그명',
    'O 태그명',
    'O 태그명',
    'O 태그명',
    'O 태그명',
    'O 태그명',
    'O 태그명',
    'O 태그명',
    'O 태그명',
    'O 태그명',
    'O 태그명',
    'O 태그명',
    'O 태그명',
    'O 태그명',
    'O 태그명',
    'O 태그명',
    'O 태그명',
    'O 태그명',
    'O 태그명',
    'O 태그명',
    'O 태그명',
    'O 태그명',
    'O 태그명',
    'O 태그명',
    'O 태그명',
    'O 태그명',
    'O 태그명',
]

const TagBox = memo(props => {
    const [isOver, setIsOver] = useState(false);
    const tagbox = useRef();
    const moreTags = useRef();

    const onMoreTagsClick = useCallback(e => {
        e.preventDefault();

        const current = e.currentTarget;
        const target = current.closest('.tagbox').childNodes[1];

        current.classList.toggle('active');
        target.classList.toggle('active');
    }, []);

    useEffect(() => {
        const target = tagbox.current;
        console.log(target.scrollHeight);
        if (target.scrollHeight >= 130) {
            setIsOver(true);
            console.log('hi');
        }
    }, [tagbox]);

    return (
        <SubjectBox className='tagbox'>
            <div>
                <h4>{props.title}</h4>
                <button className={classNames('moreTags', {show: isOver})} onClick={onMoreTagsClick} ref={moreTags}>더보기</button>
            </div>
            <ul ref={tagbox}>
                {
                    testData.map((v, i) => {
                        return (
                            <li key={i}>{v}</li>
                        )
                    })
                }
            </ul>
        </SubjectBox>
    );
});

export default TagBox;