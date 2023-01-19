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
            './server/mapper/bulletin/BulletinMapper.xml',
            './server/mapper/bulletin/PostMapper.xml'
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
                if (params.query || params.tag != -1) {
                    return [];
                } else {
                    throw new RuntimeException('조회 결과 없음');
                }
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

    /** 내가 후기 남긴 장소 목록 조회 */
    async getMyPlaces(params) {
        let dbcon = null;
        let data = null;
        let temp = null;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement('BulletinMapper', 'selectMyPlaces', params);
            let [result] = await dbcon.query(sql);

            for (let i = 0; i < result.length; i++) {
                sql = mybatisMapper.getStatement('BulletinMapper', 'selectPlacePhoto', { id: result[i].id });

                [temp] = await dbcon.query(sql);

                result[i].place_img = temp;
            }

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

    /** 전체 카테고리 태그들 조회 */
    async getCategories() {
        let dbcon = null;
        let data = {};

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement('BulletinMapper', 'selectCategories');
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException('조회 결과 없음');
            }

            for (let i = 0; i < result.length; i++) {
                if (data[result[i].classification]) {
                    const temp = {};
                    temp.id = result[i].id;
                    temp.name = result[i].name;
                    data[result[i].classification].push(temp);
                }
                else data[result[i].classification] = [];
            };
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) dbcon.release();
        }

        return data;
    }

    /** 게시글 추가하기 */
    async addPost(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement('BulletinMapper', 'insertItem', params);
            let [{ insertId, affectedRows }] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException('저장된 데이터가 없습니다.');
            }

            if (params?.selectedPlaces.length > 0) {
                for (let i = 0; i < params.selectedPlaces.length; i++) {
                    sql = mybatisMapper.getStatement('BulletinMapper', 'insertPlaceRecommned', { bulletin_id: insertId, place_id: params.selectedPlaces[i] });
                    let [result] = await dbcon.query(sql);

                    if (result.length === 0) {
                        throw new RuntimeException('추천 장소 추가에 실패했습니다.');
                    }
                }
            }
            if (params?.selectedTags.length > 0) {
                for (let i = 0; i < params.selectedTags.length; i++) {
                    sql = mybatisMapper.getStatement('BulletinMapper', 'insertPostCategory', { bulletin_id: insertId, category_id: params.selectedTags[i] });
                    let [result] = await dbcon.query(sql);

                    if (result.length === 0) {
                        throw new RuntimeException('게시글 카테고리 저장에 실패했습니다.');
                    }
                }
            }
            
            // 새로 저장된 데이터의 PK값을 반환, 해당 값을 활용해 다시 조회
            sql = mybatisMapper.getStatement('PostMapper', 'selectItem', { id: insertId });
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException('저장된 데이터를 조회할 수 없습니다.');
            }

            [data] = result;
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) dbcon.release();
        }

        return data;
    }
}

module.exports = new BulletinService();