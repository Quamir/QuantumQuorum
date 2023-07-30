const pool = require('../database');

class Comment{
    constructor(
        id, 
        postId,
        userId,
        text, 
        timestamp
    ){
        this.id = id,
        this.postId = postId,
        this.userId = userId,
        this.text = text,
        this.timestamp = timestamp
    }

    async showAllComments(){
        const sql = `
            SELECT * FROM post_comment
            WHERE post_id = $1;
        `;
        const value = [this.postId];
        const query = await pool.query(sql, value);

        return query.rows;
    }

    async createComment(){
        const sql = `
            INSERT INTO post_comment(
                post_id, 
                user_id,
                text,
                time_stamp
            )VALUES($1,$2,$3,CURRENT_TIMESTAMP)
            RETURNING*;
        `;
        const values = [this.postId, this.userId, this.text];
        const query = await pool.query(sql, values);

        return query.rows;
    }

    async updateComment(){
        const sql = `
            UPDATE post_comment
            SET text = $1
            WHERE id = $2
            AND user_id = $3
            RETURNING*;
        `;
        const values = [this.text, this.id, this.userId];
        const query = await pool.query(sql, values);

        return query.rows;
    }

    async deleteComment(){
        const sql = `
            DELETE FROM post_comment
            WHERE id = $1
            AND user_id = $2
            RETURNING*;
        `;
        const values = [this.id, this.userId];
        const query = await pool.query(sql, values);

        return query.rows;
    }
}

module.exports = Comment;