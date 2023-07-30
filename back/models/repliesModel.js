const pool = require('../database');

class Reply {
    constructor(
        id,
        commentId,
        userId,
        text,
        timestamp
    ){
        this.id = id,
        this.commentId = commentId,
        this.userId = userId,
        this.text = text,
        this.timestamp = timestamp
    }

    async showAllReplies(){
        const sql = `
            SELECT * FROM replies
            WHERE comment_id = $1;
        `;
        const value = [this.commentId];
        const query = await pool.query(sql, value);

        return query.rows;
    }

    async createReply(){
        const sql = `
            INSERT INTO replies(
                comment_id, 
                user_id,
                text,
                time_stamp
            )VALUES($1,$2,$3, CURRENT_TIMESTAMP)
            RETURNING*;
        `;
        const value = [this.commentId, this.userId, this.text];
        const query = await pool.query(sql, value);

        return query.rows;
    }

    async updateReply(){
        const sql = `
            UPDATE replies
            SET text = $1
            WHERE user_id = $2
            AND id = $3
            RETURNING*;
        `;
        const values = [this.text, this.userId, this.id];
        const query = await pool.query(sql, values);

        return query.rows;
    }

    async deleteReply(){
        const sql = `
            DELETE FROM replies
            WHERE user_id = $1
            AND id = $2
            RETURNING*;
        `;
        const values = [this.userId, this.id];
        const query = await pool.query(sql, values);

        return query.rows;
    }
}

module.exports = Reply;