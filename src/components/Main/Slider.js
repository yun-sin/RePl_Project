import React, { memo, useEffect, useCallback, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getThemeData } from "../../slices/ThemeSlice";


/** glider
 * https://www.npmjs.com/package/react-glider
 */
import Glider from "react-glider";
import "glider-js/glider.min.css";
import "../../assets/css/styles.scss";



const Slider = memo(() => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.ThemeSlice);
  const gliderRef = useRef(null);
  const preventInterval = useRef(null);
  const [mouseOver, setMouseOver] = useState(false);

 const randomData = data&&([...data]?.sort(() => Math.random() - 0.5));

  
  useEffect(() => {
    dispatch(getThemeData());
  },[]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if(preventInterval.current) {
        return;
      }
      gliderRef.current.scrollItem(index++ % randomData?.length, false);
    }, 2500);
    return () => {
      clearInterval(interval);
    };
  },[])
  
  const onMouseOver = useCallback(() => {
    setMouseOver(true);
    preventInterval.current = true
  },[mouseOver]);

  const onMouseOut = useCallback(() => {
    setMouseOver(false);
    preventInterval.current = false
  },[mouseOver]);

  return (
    <div className="container" onMouseOver={onMouseOver} onMouseOut={onMouseOut}>

      
      {mouseOver === true? 
      (
        <Glider
        className="glider-container"
        draggable
        hasArrows
        slidesToShow={1}
        slidesToScroll={1}
        ref={gliderRef}
      >
        {randomData?.map(({ id, icon, text, user_number }, i) => {
          return (
            <div key={i}>
              <NavLink to={`/map?theme=${id}`}>
                <div className="emoji">{icon}</div>
                <div className="title">{text}</div>
                <div className="user_number">{user_number}명의 사용자</div>
              </NavLink>
            </div>
          );
        })}
      </Glider>
      ): 
       (
        <Glider
        className="glider-container"
        draggable
        hasArrows={false}
        slidesToShow={1}
        slidesToScroll={1}
        ref={gliderRef}
       
      >
        {randomData?.map(({ id, icon, text, user_number }, i) => {
          return (
            <div key={i}>
              <NavLink to={`/map?theme=${id}`}>
                <div className="emoji">{icon}</div>
                <div className="title">{text}</div>
                <div className="user_number">{user_number}명의 사용자</div>
              </NavLink>
            </div>
          );
        })}
      </Glider>
      )}


    </div>
  );
});

export default Slider;
