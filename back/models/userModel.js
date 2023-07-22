const express = require("express");
const pool = require("../database");
const bcrypt = require("bcrypt");
const Media = require('../models/mediaModel');

class User {
  constructor(
    firstName,
    lastName,
    email,
    password,
    profilePicture,
    bio,
    github,
    linkedin,
    school,
    id,
    newPassword
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.profilePicture = profilePicture;
    this.bio = bio;
    this.github = github;
    this.linkedin = linkedin;
    this.school = school;
    this.id = id,
    this.newPassword = newPassword
  }

  async createAccount() {
    //checks db for existing email
    const existingEmail =
      "SELECT EXISTS(SELECT email FROM user_account WHERE email = $1)";
    const emailValue = [this.email];
    const emailQuery = await pool.query(existingEmail, emailValue);

    const hashedPassword = await bcrypt.hash(this.password, 12);

    const sql = `
        INSERT INTO user_account(
            first_name,
            last_name,
            email,
            password,
            profile_picture, 
            bio,
            github, 
            linkedin, 
            school
        )
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING*;
    `;

    const values = [
      this.firstName,
      this.lastName,
      this.email,
      hashedPassword,
      this.profilePicture,
      this.bio,
      this.github,
      this.linkedin,
      this.school,
    ];

    const newAccount = await pool.query(sql, values);
    const response = newAccount.rows;

    return response;
  }

  async login(){}

  async getUserData(){
    const sql = `
      SELECT first_name, last_name, profile_picture
      FROM user_account
      WHERE id = $1;
    `;
    const values = [this.id];
    const query = await pool.query(sql, values);

    return query.rows[0];
  }

  async getFriendsList(){
    const sql = `
      SELECT user_id_2
      FROM friends 
      WHERE user_id = $1
      LIMIT $2;
    `;
    const values = [this.id, 10];
    const query = await pool.query(sql, values);

    return query.rows;
  }

  async getFriendsWithReals(){
    const sql = `
      SELECT 
        f.user_id,
        f.user_id_2,
        r.user_id,
        r.media, 
        r.time_stamp
      FROM friends AS f
      INNER JOIN reals AS r
      ON f.user_id_2 = r.user_id
      WHERE f.user_id = $1;
    `;
    const values = [this.id];
    const query = await pool.query(sql, values);

    return query.rows;
  }

  async getUserReals(){
    const sql = `
      SELECT * FROM reals
      WHERE user_id = $1;
    `;
    const values = [this.id];
    const query = await pool.query(sql, values);

    return query.rows;
  }

  async getUserPost(){
    const sql = `
      SELECT * FROM post
      WHERE user_id = $1;
    `;
    const values = [this.id];
    const query = await pool.query(sql, values);

    return query.rows;
  }

  async getUserBio(){
    const sql = `
      SELECT 
        bio,
        github, 
        linkedin,
        school
      FROM user_account 
      WHERE id = $1
    `;
    const values = [this.id];
    const query = await pool.query(sql, values);

    return query.rows;
  }

  
  async getUserMedia(){
    const sql = `
      SELECT media 
      FROM post
      WHERE user_id = $1
    `;
    const values = [this.id];
    const query = await pool.query(sql,values);
    return query.rows;
  }

  //settings

  async updateFirstName(){
    const sql = `
      UPDATE user_account
      SET first_name = $1
      WHERE id = $2
      RETURNING id, first_name, last_name;
    `;
    const values = [this.firstName, this.id];
    const query = await pool.query(sql, values);

    return query.rows;
  }

  async updateLastName(){
    const sql = `
      UPDATE user_account
      SET last_name = $1
      WHERE id = $2
      RETURNING id, first_name, last_name;
    `;
    const values = [this.lastName, this.id];
    const query = await pool.query(sql,values);

    return query.rows;
  }

  async updateEmail(){
    const sql = `
      UPDATE user_account 
      SET email = $1
      WHERE id = $2
      RETURNING id, email;
    `;
    const values = [this.email, this.id];
    const query = await pool.query(sql, values);

    return query.rows;
  }

  async updateBio(){
    const sql = `
      UPDATE user_account 
      SET bio = $1
      WHERE id = $2
      RETURNING id, bio;
    `;
    const values = [this.bio, this.id];
    const query = await pool.query(sql, values);

    return query.rows;
  }
 
  async updateProfilePicture(){
    //get file location of profile picture 
    const profilePictureLocation = `
      SELECT profile_picture
      FROM user_account 
      WHERE id = $1;
    `;
    const profilePictureIdentifier = [this.id];
    const getProfilePicture = await pool.query(
      profilePictureLocation, 
      profilePictureIdentifier
    );
    console.log(getProfilePicture.rows[0].profile_picture);

    //unlink picture 
    const unLinkPath = getProfilePicture.rows[0].profile_picture;
    const media = new Media();
    media.unLink('public/profile_pictures',unLinkPath);
  
 
    //insert new picture 
    const sql = `
      UPDATE user_account 
      SET profile_picture = $1
      WHERE id = $2
      RETURNING profile_picture
    `;
    const values = [this.profilePicture, this.id];
    const query = await pool.query(sql,values);
    return query;
  }

  async updatePassword(){
    // I think the hashed password is supposed 
    // to be compared on the frontend
    const currentPassword = `
      SELECT password FROM user_account 
      WHERE email = $1;
    `;
    const userEmail = [this.email];
    const passwordQuery = await pool.query(currentPassword, userEmail);
    const password = passwordQuery.rows[0].password;
    const newPasswordHashed = await bcrypt.hash(this.newPassword, 12);
    const sql = `
      UPDATE user_account 
      SET password = $1
      WHERE email = $2 
      AND password = $3;
    `;
    const values = [newPasswordHashed, this.email, password];
    const updatedPassword = await pool.query(sql, values);
    
    return updatedPassword.rows[0];
  }
}

module.exports = User;
