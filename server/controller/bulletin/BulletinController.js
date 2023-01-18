const express = require('express');
const logger = require('../../helper/LogHelper');
const regexHelper = require('../../helper/RegexHelper');
const { pagenation } = require('../../helper/UtilHelper');
const bulletinService = require('../../service/bulletin/BulletinService');

module.exports = (() => {
    const url = process.env.BULLETIN_PATH;
    const router = express.Router();

    /** 전체 게시글 목록 조회 */
    router.get(url, async (req, res, next) => {
        // 검색 파라미터 있을 시 저장
        const { query, page=1, rows=5 } = req.query;

        // 검색 파라미터를 MyBatis 전송용 객체로 변환
        const params = {};
        if (query) {
            
        }

        /** 데이터 조회 */
        let json = null;
        let pageInfo = null;

        try {
            // 전체 데이터 수 얻기
            const totalCount = await bulletinService.getCount(params);
            pageInfo = pagenation(totalCount, page, rows);
            
            params.offset = pageInfo.offset;
            params.listCount = pageInfo.listCount;

            json = await bulletinService.getList(params);
        } catch (err) {
            return next(err);
        }

        res.sendResult({ meta: pageInfo, item: json });
    });

    /** 내가 후기 남긴 장소 목록 불러오기 */
    router.get(`${url}/myplace/:id`, async (req, res, next) => {
        const { id } = req.params;

        let json = null;

        try {
            json = await bulletinService.getMyPlaces({ id: id });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    /** 게시글 작성 처리 */
    router.post(url, async (req, res, next) => {
        // 파라미터 받기
        // const { title,  }
    });

    return router;
})();