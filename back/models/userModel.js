const express = require("express");
const pool = require("../database");
const bcrypt = require("bcrypt");

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
    id
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
    this.id = id;
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
}

module.exports = User;
