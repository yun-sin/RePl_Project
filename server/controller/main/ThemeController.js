const express = require('express');
const logger = require('../../helper/LogHelper');
const regexHelper = require('../../helper/RegexHelper');
const ThemeService = require('../../service/main/ThemeService');

module.exports = (() => {
    const url = process.env.MAIN_THEME_PATH;
    const router = express.Router();

    router.get(`${url}`, async (req, res, next) => {
        let result = null;
        try {
            result = await ThemeService.getList();
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: result });
    });

    router.get(`/theme_place`, async (req, res, next) => {
        let result = null;
        try {
            result = await ThemeService.getPlaces();
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: result });
    });

    return router;
})();