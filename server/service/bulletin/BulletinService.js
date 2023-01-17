const mybatisMapper = require('mybatis-mapper');
const dayjs = require('dayjs');
const DBPool = require('../../helper/DBPool');
const { RuntimeException } = require('../../helper/ExceptionHelper');
const logger = require('../../helper/LogHelper');

class BulletinService {
    /** 생성자를 통해 Mapper 로드 */
    constructor() {
        // Mapper는 프로젝트 루트 기준 상대경로로
        mybatisMapper.createMapper([
            './server/mapper/bulletin/BulletinMapper.xml'
        ]);
    }

    /** 게시판 게시글 목록 데이터 조회 */
    async getList(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement('BulletinMapper', 'selectList', params);
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException('조회 결과 없음');
            }

            data = result;

            sql = mybatisMapper.getStatement('BulletinMapper', 'selectTagsOfPosts', params);
            [result] = await dbcon.query(sql);

            data.forEach(v => {
                v.postdate = dayjs(v.postdate).format('YYYY-MM-DD');
                v.tags = [];

                for (let i = result.length - 1; i >= 0; i--) {
                    if (v.id === result[i].bulletin_id) {
                        v.tags.push(result[i].name);
                        result.splice(i, 1);
                    }
                }
            });
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) dbcon.release();
        }

        return data;
    }

    /** 전체 데이터 수 조회 */
    async getCount(params) {
        let dbcon = null;
        let cnt = 0;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement('BulletinMapper', 'selectAllCount', params);
            let [result] = await dbcon.query(sql);

            if (result.length > 0) {
                cnt = result[0].cnt;
            }
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) dbcon.release();
        }

        return cnt;
    }
}

module.exports = new BulletinService();