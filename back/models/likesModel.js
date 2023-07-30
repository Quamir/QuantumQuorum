const pool = require('../database');


class Likes {
    constructor(id, postId, userId){
        this.id = id,
        this.postId = postId,
        this.userId = userId
    }

    async likePost(){
        const checkForLike = `
            SELECT *
            FROM post_likes
            WHERE post_id = $1
            AND user_id = $2;
        `;
        const checkForLikeValues = [this.postId, this.userId];
        const checkForlikeQuery = await pool.query(
            checkForLike,
            checkForLikeValues
        );

        if(checkForlikeQuery.rows.length === 0){
            const sql = `
                INSERT INTO post_likes(
                    post_id,
                    user_id
                )VALUES(
                    $1,
                    $2
                )RETURNING*;
            `;
            const values = [this.postId, this.userId];
            const query = await pool.query(sql, values);

            return query.rows;
        }else{
            const sql = `
                DELETE FROM post_likes
                WHERE post_id = $1
                AND user_id = $2
                RETURNING*;
            `;
            const values = [this.postId, this.userId];
            const query = await pool.query(sql, values);

            return query.rows;
        }
    }

    async likeComment(){
        const checkForLike = `
            SELECT * 
            FROM comment_likes
            WHERE post_id = $1
            AND user_id = $2
        `;

        const checkForLikeValues = [this.postId, this.userId];
        const checkForlikeQuery = await pool.query(
            checkForLike,
            checkForLikeValues
        );

        console.log(checkForlikeQuery.rows.length);

        if(checkForlikeQuery.rows.length === 0){
            const sql = `
                INSERT INTO comment_likes(
                    post_id,
                    user_id
                )VALUES(
                    $1,
                    $2
                )RETURNING*;
            `;
            const values = [this.postId, this.userId];
            const query = await pool.query(sql, values);

            return query;

        }else{
            const sql = `
                DELETE FROM comment_likes
                WHERE post_id = $1
                AND user_id = $2
                RETURNING*;
            `;
            const values = [this.postId, this.userId];
            const query = await pool.query(sql, values);

            return query;
        }
    }
}

module.exports = Likes;