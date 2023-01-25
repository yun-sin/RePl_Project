const mybatisMapper = require('mybatis-mapper');
const logger = require('../../helper/LogHelper');
const DBPool = require('../../helper/DBPool');
const dayjs = require('dayjs');
const { RuntimeException } = require('../../helper/ExceptionHelper');

class ThemeService {
    /** 생성자를 통해 Mapper 로드 */
    constructor() {
        // Mapper는 프로젝트 루트 기준 상대경로로
        mybatisMapper.createMapper([
            './server/mapper/main/ThemeMapper.xml'
        ]);
    }

    /** 게시글 데이터 조회 */
    async getList(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement('ThemeMapper', 'selectList', params);
            [data] = await dbcon.query(sql);

            if (data.length === 0) {
                return [];
            }
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) dbcon.release();
        }

        return data;
    }
}

module.exports = new ThemeService();