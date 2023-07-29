const pool = require('../database');
const express = require("express");
const Media = require('../models/mediaModel');


class Post {
    constructor(
        id,
        userId,
        media, 
        text, 
        timestamp,
    ){
        this.id = id,
        this.userId = userId,
        this.media = media,
        this.text = text,
        this.timestamp = timestamp
    }

    async showAllPost(){
        const sql = `
            SELECT 
                p.id,
                p.user_id,
                p.media,
                p.text,
                p.time_stamp,
                ua.first_name,
                ua.last_name,
                ua.profile_picture
            FROM post as p
            INNER JOIN user_account as ua 
            ON p.user_id = ua.id
            ORDER BY p.time_stamp DESC
            LIMIT 40;
        `;
        const showAllPost = await pool.query(sql);

        return showAllPost.rows;
    }

    async showSinglePost(){
        const sql = `
        SELECT
            p.id,
            p.user_id,
            p.media, 
            p.text,
            p.time_stamp,
            ua.first_name,
            ua.last_name,
            ua.profile_picture
        FROM post as p 
        INNER JOIN user_account as ua
        ON p.user_id = ua.id
        WHERE p.id = $1;
        `;
        const value = [this.id];
        const showSinglePost = await pool.query(sql,value);

        return showSinglePost.rows;
    }

    async showProfilePosts(){
        const sql = `
            SELECT 
            p.id,
            p.user_id,
            p.media, 
            p.text,
            p.time_stamp,
            ua.first_name,
            ua.last_name,
            ua.profile_picture
        FROM post as p
        INNER JOIN user_account as ua 
        ON p.user_id = ua.id 
        WHERE p.user_id = $1;
        `;
        const value = [this.userId];
        const showProfilePosts = await pool.query(sql,value);

        return showProfilePosts.rows;
    }

    async createPost(){
        const sql = `
            INSERT INTO post(
                user_id, 
                media, 
                text, 
                time_stamp
            )VALUES($1,$2,$3,CURRENT_TIMESTAMP)
            RETURNING*;
        `;
        const values = [this.userId, this.media, this.text];
        const createPost = await pool.query(sql, values);

        return createPost.rows;
    }

    async updateMedia(){
        //get file location of media 
        const getMediaLocation = `
            SELECT media FROM post 
            WHERE id = $1;
        `;
        const postIdentifier = [this.id];
        const mediaLocation = await pool.query(
            getMediaLocation,
            postIdentifier
        );
        //unlink media 
        const unLinkPath = mediaLocation.rows[0].media;
        const media = new Media();

        console.log(mediaLocation.rows[0].media);
        
        media.unLink('public/post_pictures', unLinkPath);

        //insert new Media 
        const sql = `
            UPDATE post 
            SET media = $1
            WHERE id = $2
            RETURNING*;
        `;
        const values = [this.media, this.id];
        const updateMedia = await pool.query(sql, values);

        return updateMedia.rows;
    }

    async updateText(){
        const sql = `
            UPDATE post 
            SET text = $1
            WHERE id = $2
            RETURNING*;
        `;
        const values = [this.text, this.id];
        const updateText = await pool.query(sql, values);

        return updateText.rows;
    }

    async deletePost(){
        const sql = `
            DELETE FROM post 
            WHERE id = $1
            RETURNING*;
        `;
        const value = [this.id];
        const deletePost = await pool.query(sql, value);

        return deletePost.rows;
    }
}

module.exports = Post;