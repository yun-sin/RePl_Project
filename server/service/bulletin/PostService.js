const mybatisMapper = require('mybatis-mapper');
const dayjs = require('dayjs');
const DBPool = require('../../helper/DBPool');
const { RuntimeException } = require('../../helper/ExceptionHelper');
const logger = require('../../helper/LogHelper');
const { nextPowerTwo } = require('add');

class PostService {
    /** 생성자를 통해 Mapper 로드 */
    constructor() {
        // Mapper는 프로젝트 루트 기준 상대경로로
        mybatisMapper.createMapper([
            './server/mapper/bulletin/PostMapper.xml'
        ]);
    }

    /** 게시글 데이터 조회 */
    async getItem(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement('PostMapper', 'selectItem', params);
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException('조회 결과 없음');
            }

            [data] = result;

            data.postdate = dayjs(data.postdate).format('YYYY-MM-DD')
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) dbcon.release();
        }

        return data;
    }

    async getFollower(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement('PostMapper', 'selectFollower', params);
            let [result] = await dbcon.query(sql);

            [data] = result;
        } catch (err) {
            throw err
        } finally {
            if (dbcon) dbcon.release();
        }

        return data;
    }

    /** 게시글의 댓글 데이터 조회 */
    async getComments(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement('PostMapper', 'selectComments', params);
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                return [];
            }

            data = result;

            data.forEach(v => {
                v.commentdate = dayjs(v.commentdate).format('YYYY-MM-DD');
            })
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) dbcon.release();
        }

        return data;
    }

    /** 게시글에 댓글 달기 */
    async postComment(params) {
        let dbcon = null;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement('PostMapper', 'postComment', params);
            let [{ affectedRows }] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException('데이터 저장 실패');
            }
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) dbcon.release();
        }

        return 200;
    }

    /** 게시자의 다른 게시글 조회 */
    async getOtherPosts(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement('PostMapper', 'selectOtherPosts', params);
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                return [];
            }

            data = result;
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) dbcon.release();
        }

        return data;
    }
}

module.exports = new PostService();