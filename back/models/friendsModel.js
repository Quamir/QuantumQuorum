const pool = require('../database');

class Friends{
    constructor(id,userId,userId2){
        this.id = id,
        this.userId = userId, 
        this.userId2 = userId2
    }

    async showAllFriends(){
        const sql = `
            SELECT * FROM friends
            WHERE user_id = $1;
        `;
        const value = [this.userId];
        const query = await pool.query(sql, value);

        return query.rows;
    }

    async addFriend(){
        const checkForRelation = `
            SELECT * FROM friends
            WHERE user_id = $1
            AND user_id_2 = $2
        `;
        const checkForRelationValues = [this.userId, this.userId2];
        const checkForRelationQuery = await pool.query(
            checkForRelation,
            checkForRelationValues
        );

        if(checkForRelationQuery.rows.length === 0){
            const sql = `
                INSERT INTO friends(
                    user_id, 
                    user_id_2
                )VALUES(
                    $1,
                    $2
                )RETURNING*;
            `;
            const values = [this.userId, this.userId2];
            const query = await pool.query(sql, values);

            return query;
        }else{
            const sql = `
                DELETE FROM friends
                WHERE user_id = $1
                AND user_id_2 = $2
                RETURNING*;
            `;
            const values = [this.userId, this.userId2];
            const query = await pool.query(sql, values);

            return query;
        }
    }
}


module.exports = Friends;