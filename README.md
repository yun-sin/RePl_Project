# 🗺️ 리플 (Real Place)


> 4조 세미 프로젝트<br>
  2022.10.31 ~ 2023.01.~~
  

## About
 - React 사용
 - 진짜서울(https://jinjja-seoul.com) 사이트를 참고함
 - 유저들이 장소에 대한 후기를 남기고 이를 테마별로 지정하여 검색할 수 있는 사이트
 
## Team
 - [서보선](https://github.com/sqhtjs0104), [권채림](https://github.com/zzemoo), [유지인](https://github.com/xoxoinny0) , [장윤신](https://github.com/yun-sin)

## Skill

|Front-End|Back-End|Communication|
|:---|:---|:---|
|<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/></br><img src="https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=CSS3&logoColor=white" align="left"/></br><img src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white"/></br><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/></br><img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/></br><img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white"/>|<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/></br><img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>|<img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white"/></br><img src="https://img.shields.io/badge/Github-181717?style=flat-square&logo=github&logoColor=white"/>|

 
## API & Library
> <img src="https://img.shields.io/badge/react_helmet_async-eee?style=flat-square"/>
> <img src="https://img.shields.io/badge/react_router_dom-eee?style=flat-square"/>
> <img src="https://img.shields.io/badge/react_modal-eee?style=flat-square"/>
> <img src="https://img.shields.io/badge/react_glider-eee?style=flat-square"/>
> <img src="https://img.shields.io/badge/react_loader_slider-eee?style=flat-square"/>
> <br/><br/>
> <img src="https://img.shields.io/badge/classnames-eee?style=flat-square"/>
> <img src="https://img.shields.io/badge/fortawesome-eee?style=flat-square"/>
> <img src="https://img.shields.io/badge/ckeditor4-eee?style=flat-square"/>
> <br/><br/>
> <img src="https://img.shields.io/badge/dayjs-eee?style=flat-square"/>
> <img src="https://img.shields.io/badge/axios-eee?style=flat-square"/>
> <img src="https://img.shields.io/badge/lodash-eee?style=flat-square"/>
> <br/><br/>
> <img src="https://img.shields.io/badge/express-eee?style=flat-square"/>
> <img src="https://img.shields.io/badge/nodemon-eee?style=flat-square"/>
> <img src="https://img.shields.io/badge/dotenv-eee?style=flat-square"/>
> <img src="https://img.shields.io/badge/cookie_parser-eee?style=flat-square"/>
> <img src="https://img.shields.io/badge/body_parser-eee?style=flat-square"/>
> <img src="https://img.shields.io/badge/mysql2-eee?style=flat-square"/>
> <img src="https://img.shields.io/badge/mybatis_mapper-eee?style=flat-square"/>
> <img src="https://img.shields.io/badge/express_mysql_session-eee?style=flat-square"/>
> <img src="https://img.shields.io/badge/serve_static-eee?style=flat-square"/>
> <img src="https://img.shields.io/badge/multer-eee?style=flat-square"/>
> <img src="https://img.shields.io/badge/nodethumbnail-eee?style=flat-square"/>
> <br/><br/>
> <img src="https://img.shields.io/badge/winston-eee?style=flat-square"/>


## Problems
 - 북마크 중복 요청문제
   - 버튼을 연속적으로 누를 경우 서버에 중복된 요청이 전송됨 (버튼을 누를때마다 post 또는 del 요청)
   - -> 모달창이 닫힐 때 state값에 따라 post 또는 delete 수행

## 담당업무
 - 지도페이지 담당
   - 카카오맵 API 적용
   - React modal을 이용한 장소 상세정보 팝업
   - 현재 장소 표시 및 재검색
   - 보고있는 지도 범위, 테마 등 검색조건 적용기능
   - 북마크 기능 구현
   - 장소 추가 및 삭제(카카오맵 검색 기능 이용, 중복 등록 방지 기능 구현)
   - 애니메이션 (마커 클릭시 해당 장소로 스크롤, 반대로 목록 클릭시 마커 중심으로 지도 이동)

 
## 결과물

> 지도페이지
![지도3](https://user-images.githubusercontent.com/99275134/231155883-d1c60747-03e7-493c-abd2-b16aa84697aa.gif)

> 장소추가
![장소추가](https://user-images.githubusercontent.com/99275134/231156790-55b2fb9e-a74b-45fd-8772-973647d90290.gif)

> 장소삭제
![장소삭제](https://user-images.githubusercontent.com/99275134/231159002-073039c3-8027-40a2-801e-20a04b776531.gif)

> 테마추가
![테마추가](https://user-images.githubusercontent.com/99275134/231159433-80a26ca1-b0bc-4d92-9298-911debb25025.gif)

> 검색결과 없을 경우
![검색결과없을시](https://user-images.githubusercontent.com/99275134/231159063-05b991af-f1f6-486a-8ef0-d85ed2cda99e.gif)

