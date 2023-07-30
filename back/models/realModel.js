const pool = require('../database');
const Media = require('../models/mediaModel');

class Real {
    constructor(
        id,
        userId,
        media,
        timestamp
    ){
        this.id = id,
        this.userId = userId,
        this.media = media,
        this.timestamp = timestamp
    }

    async showAllReals(){
        const sql = `
            SELECT 
                r.id,
                r.user_id, 
                r.media, 
                r.time_stamp,
                ua.first_name,
                ua.last_name,
                ua.profile_picture
            FROM reals AS r
            INNER JOIN user_account as ua
            ON r.user_id = ua.id;
        `;
        const showAllReals = await pool.query(sql);

        return showAllReals.rows;
    }

    async showSingleReal(){
        const sql = `
            SELECT * FROM reals
            WHERE id = $1;
        `;
        const value = [this.id];
        const showSingleReal = await pool.query(sql, value);

        return showSingleReal.rows;
    }

    async showProfileReals(){
        const sql = `
            SELECT * FROM reals
            WHERE user_id = $1;
        `;
        const value = [this.userId];
        const showProfileReals = await pool.query(sql, value);

        return showProfileReals.rows;
    }

    async createReal(){
        const sql = `
            INSERT INTO reals(
                user_id, 
                media, 
                time_stamp
            )VALUES($1,$2,CURRENT_TIMESTAMP)
            RETURNING*;
        `;
        const values  = [this.userId, this.media];
        const createReal = await pool.query(sql, values);

        return createReal.rows;
    }

    async deleteReal(){
        const getMediaLocation = `
            SELECT * FROM reals
            WHERE id = $1;
        `;
        const realIdentifier = [this.id];
        const mediaLocation = await pool.query(
            getMediaLocation,
            realIdentifier
        );
        const unlinkPath = mediaLocation.rows[0].media;
        const media = new Media();

        media.unLink('public/reals', unlinkPath);

        const sql = `
            DELETE FROM reals
            WHERE id = $1
            RETURNING*;
        `;
        const value = [this.id];
        const deleteReal = await pool.query(sql, value);

        return deleteReal.rows;

    }
}

module.exports =  Real;