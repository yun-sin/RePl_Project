const mybatisMapper = require('mybatis-mapper');
const logger = require('../../helper/LogHelper');
const DBPool = require('../../helper/DBPool');
const { RuntimeExeption } = require('../../helper/ExceptionHelper');

class MapService {
    constructor() {
        mybatisMapper.createMapper([
            './server/mapper/map/MapMapper.xml',
        ]);
    }

    async getList(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement('MapMapper', 'selectList', params);
            let [result] = await dbcon.query(sql);
            data = result;
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) dbcon.release();
        }

        return data;
    }
}

module.exports = new MapService();