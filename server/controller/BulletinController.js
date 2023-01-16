const express = require('express');
const logger = require('../helper/LogHelper');
const regexHelper = require('../helper/RegexHelper');
const { pagenation } = require('../helper/UtilHelper');
const bulletinService = require('../service/BulletinService');

module.exports = (() => {
    const url = '/editorTest';
    const router = express.Router();

    /** 전체 게시글 목록 조회 */
    router.get(url, async (req, res, next) => {
        // 검색 파라미터 있을 시 저장
        const { query, page=1, rows=5 } = req.query;

        console.log(query);

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

    /** 단일 게시글 데이터 조회 */
    router.get(`${url}/:id`, async (req, res, next) => {
        // 파라미터 받기
        const { id } = req.params;

        // 파라미터 유효성 검사
        try {
            regexHelper.value(id, '게시글 번호가 없습니다.');
            regexHelper.num(id, '게시글 번호가 잘못되었습니다.');
        } catch (err) {
            return next(err);
        }

        /** 데이터 조회 */
        let json = null;

        try {
            json = await bulletinService.getItem({ id: id });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    return router;
})();