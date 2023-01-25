const express = require('express');
const logger = require('../../helper/LogHelper');
const regexHelper = require('../../helper/RegexHelper');
const ThemeService = require('../../service/main/ThemeService');

module.exports = (() => {
    const url = process.env.MAIN_THEME_PATH;
    const router = express.Router();

    /** 데이터 있는지 중복 여부 검사 */
    router.get(`${url}`, async (req, res, next) => {
        let result = null;
        try {
            result = await ThemeService.getList();
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: result });
    });

    return router;
})();