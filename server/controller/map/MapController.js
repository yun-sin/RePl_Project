const express = require('express');
const logger = require('../../helper/LogHelper');
const regexHelper = require('../../helper/RegexHelper');
const MapService = require('../../service/map/MapService');

module.exports = (() => {
    const url = process.env.MAP_PATH;
    const router = express.Router();

    router.get(`${url}`, async (req, res, next) => {
        let result = null;

        try {
            result = await MapService.getList();
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: result });
    });

    router.post('/bookmark', async (req, res, next) => {
        let result = null;
        const { user_id, place_id } = req.body;

        try {
            result = await MapService.addBookmark({
                userId: user_id,
                placeId: place_id
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: result });
    });

    router.get('/bookmark', async (req, res, next) => {
        const query = req.query;
        let result = null;

        try {
            if (query.place_id) {
                result = await MapService.getUserBookmarkItem({
                    userId: query.user_id,
                    placeId: query.place_id
                });
            } else {
                result = await MapService.getUserBookmarkList({
                    userId: query.user_id,
                });
            }
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: result });
    });

    router.delete('/bookmark/:index', async (req, res, next) => {
        let result = null;
        let { index } = req.params;

        try {
            result = await MapService.deleteBookmark({
                id: index
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: result });
    });

    return router;
})();