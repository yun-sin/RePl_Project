import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

const SubjectBox = styled.div`
    width: 100%;
    margin-bottom: 20px;

    div {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: bottom;
        margin-bottom: 5px;
    }

    h4 {
        color: #0581BB;
        font-size: 18px;
        font-weight: 600;
    }

    .moreTags {
        display: none;
        &.show {
            display: inline-block;
        }

        border: none;
        background: none;
        color: #aaa;
        &.active {
            font-weight: 600;
            color: #000;
        }

        font-size: 12px;
        border-radius: 5px;
        padding: 3px 5px;

        &:hover {
            cursor: pointer;
        }
    }

    ul {
        padding: 10px 5px;
        width: 100%;
        max-height: 100px;
        overflow: hidden;

        &.active {
            overflow: visible;
            max-height: none;
        }

        li {
            display: inline-block;
            background-color: #eee;
            &.active {
                background-color: #0581BB;
                color: white;
            }
            padding: 8px 10px;
            border-radius: 5px;
            font-size: 13px;
            margin: 0 10px 10px 0;

            transition: all 0.2s;

            &:hover {
                cursor: pointer;
                scale: 0.98;
            }
        }
    }
`;

const TagBox = memo(props => {
    const [isOver, setIsOver] = useState(false);
    const tagbox = useRef();
    const moreTags = useRef();

    useEffect(() => {
        console.log(props.subject);
    }, []);

    useEffect(() => {
        const target = tagbox.current;
        if (target.scrollHeight >= 130) {
            setIsOver(true);
        }
    }, [tagbox]);

    const onMoreTagsClick = useCallback(e => {
        e.preventDefault();

        const current = e.currentTarget;
        const target = current.closest('.tagbox').childNodes[1];

        current.classList.toggle('active');
        target.classList.toggle('active');
    }, []);

    const onHashtagClick = useCallback(e => {
        e.preventDefault();

        const current = e.currentTarget;
        current.classList.toggle('active');
    }, []);

    return (
        <SubjectBox className='tagbox'>
            <div>
                <h4>{props.subject}</h4>
                <button className={classNames('moreTags', {show: isOver})} onClick={onMoreTagsClick} ref={moreTags}>더보기</button>
            </div>
            <ul ref={tagbox}>
                {
                    props.values.map((v, i) => {
                        return (
                            <li key={i} onClick={onHashtagClick}>{v}</li>
                        )
                    })
                }
            </ul>
        </SubjectBox>
    );
});

export default TagBox;