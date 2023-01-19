const mybatisMapper = require('mybatis-mapper');
const DBPool = require('../../helper/DBPool');
const { RuntimeException } = require('../../helper/ExceptionHelper');
const logger = require('../../helper/LogHelper');

class LoginService {
    /** 생성자를 통해 Mapper 로드 */
    constructor() {
        // Mapper는 프로젝트 루트 기준 상대경로로
        mybatisMapper.createMapper([
            './server/mapper/login/LoginMapper.xml'
        ]);
    }

    /** 새로운 유저 회원가입 처리 */
    async addUser(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement('LoginMapper', 'insertUser', params);
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException('회원가입 처리에 실패했습니다.');
            }

            [data] = result;
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) dbcon.release();
        }

        return data;
    }

    /** 기존의 데이터가 있는지 중복 여부 검사 */
    async checkValue(params) {
        if (!params.fieldName || !params.value) {
            throw new RuntimeException('검색할 데이터가 없습니다.');
        }

        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement('LoginMapper', 'searchUser', params);
            let [result] = await dbcon.query(sql);

            if (result[0].cnt === 0) data = 0;
            else data = 1;
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) dbcon.release();
        }

        return data;
    }
}

module.exports = new LoginService();