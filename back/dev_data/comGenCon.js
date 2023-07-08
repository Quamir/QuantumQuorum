const fs = require('fs');
const path = require('path');
const pool = require('../database');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');
const dateFns = require('date-fns');

const initialUsersArray = require('./initialUsers');
const { getRandomValues } = require('crypto');

class ComGenContent {
  constructor(id, media, description, text, timestamp, postId, commentId) {
    (this.id = id),
      (this.description = description),
      (this.text = text),
      (this.media = media),
      (this.timestamp = timestamp),
      (this.postId = postId),
      (this.commentId = commentId);
  }

  async genUser() {
    for (const user of initialUsersArray) {
      const profilePicture = `http://localhost:3000/image/profile_pictures/${user.firstName}_${user.lastName}.jpg`;
      const password = await bcrypt.hash(user.password, 12);

      const values = [
        user.firstName,
        user.lastName,
        user.email,
        password,
        profilePicture,
        user.bio,
        user.github,
        user.linkedin,
        user.school,
      ];

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
            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *;      
        `;

      try {
        const query = await pool.query(sql, values);
        console.log(query.rows[0]);
      } catch (error) {
        console.log('Error inserrting user:', error);
      }
    }
  }

  async genPost() {
    for (let i = 0; i <= 300; i++) {
      this.id = genRandomIntInclusive(78, 100);
      this.text = await genSentence();
      this.media = genRandomMedia();
      this.timestamp = genRandomTimestamp(2023, 0, 1, 2023, 7, 24);

      const sql = `INSERT INTO post(
      user_id,
      media,
      text,
      time_stamp
    )VALUES($1,$2,$3,$4) RETURNING *;
    `;

      const values = [this.id, this.media, this.text, this.timestamp];
      const genPost = await pool.query(sql, values);
      console.log(genPost.rows);

      // wait for 1 sec becfore continuing to the next iteration a 100 loops = 1m 40s
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  async genReals() {
    for (let i = 0; i <= 15; i++) {
      const minUserId = await getMinUserId();
      const maxUserId = await getMaxUserId();

      this.id = genRandomIntInclusive(
        minUserId.rows[0].min,
        maxUserId.rows[0].max
      );
      this.media = this.media = genRandomMedia();
      this.timestamp = genRandomTimestamp(2023, 5, 6, 2023, 6, 7);

      const sql = `INSERT INTO reals(
        user_id,
        media,
        time_stamp
      )VALUES($1,$2,$3) RETURNING *`;

      const values = [this.id, this.media, this.timestamp];
      const query = await pool.query(sql, values);
    }
  }

  async genPostLikes() {
    const minPostId = await getMinPostId();
    const maxPostId = await getMaxPostId();
    const minUserId = await getMinUserId();
    const maxUserId = await getMaxUserId();

    for (let i = 0; i <= 1000; i++) {
      this.id = genRandomIntInclusive(
        minUserId.rows[0].min,
        maxUserId.rows[0].max
      );
      this.postId = genRandomIntInclusive(
        minPostId.rows[0].min,
        maxPostId.rows[0].max
      );

      const sql = `
        INSERT INTO post_likes(
          post_id,
          user_id
        )VALUES($1,$2)
      `;

      const values = [this.postId, this.id];
      const query = await pool.query(sql, values);
    }
  }

  async genPostComments() {
    for (let i = 0; i <= 1000; i++) {
      const minPostId = await getMinPostId();
      const maxPostId = await getMaxPostId();
      const minUserId = await getMinUserId();
      const maxUserId = await getMaxUserId();

      this.postId = genRandomIntInclusive(
        minPostId.rows[0].min,
        maxPostId.rows[0].max
      );
      this.id = genRandomIntInclusive(
        minUserId.rows[0].min,
        maxUserId.rows[0].max
      );
      this.text = await genSentence();
      this.timestamp = genRandomTimestamp(2023, 0, 1, 2023, 7, 24);

      console.log(this.text);

      const sql = `
      INSERT INTO post_comment(
        post_id,
        user_id,
        text, 
        time_stamp
      )VALUES($1,$2,$3,$4) RETURNING *;
    `;

      const values = [this.postId, this.id, this.text, this.timestamp];
      const query = await pool.query(sql, values);

      console.log(query.rows[0]);

      // wait for 1 sec becfore continuing to the next iteration a 100 loops = 1m 40s
      await new Promise(resolve => setTimeout(resolve, 600));
    }
  }

  async genCommentLikes() {
    for (let i = 0; i <= 1000; i++) {
      const minPostId = await getMinPostId();
      const maxPostId = await getMaxPostId();
      const minUserId = await getMinUserId();
      const maxUserId = await getMaxUserId();

      this.postId = genRandomIntInclusive(
        minPostId.rows[0].min,
        maxPostId.rows[0].max
      );
      this.id = genRandomIntInclusive(
        minUserId.rows[0].min,
        maxUserId.rows[0].max
      );

      const sql = `
      INSERT INTO comment_likes(
        post_id,
        user_id
      )VALUES($1,$2) RETURNING *;
    `;

      const values = [this.postId, this.id];
      const query = await pool.query(sql, values);

      console.log(query.rows[0]);

      // wait for 1 sec becfore continuing to the next iteration a 100 loops = 1m 40s
      await new Promise(resolve => setTimeout(resolve, 600));
    }
  }

  async genReplies() {
    for (let i = 0; i <= 400; i++) {
      const minCommentId = await getMinCommentId();
      const maxCommentId = await getMaxCommentId();
      const minUserId = await getMinUserId();
      const maxUserId = await getMaxUserId();

      this.commentId = genRandomIntInclusive(
        minCommentId.rows[0].min,
        maxCommentId.rows[0].max
      );
      this.id = genRandomIntInclusive(
        minUserId.rows[0].min,
        maxUserId.rows[0].max
      );
      this.text = await genSentence();
      this.timestamp = genRandomTimestamp(2023, 0, 1, 2023, 7, 22);

      const sql = `
      INSERT INTO replies(
        comment_id,
        user_id,
        text,
        time_stamp
      )VALUES($1,$2,$3,$4) RETURNING *;
    `;

      const values = [this.commentId, this.id, this.text, this.timestamp];
      const query = await pool.query(sql, values);

      console.log(query.rows[0]);
    }
  }

  async genInitialFriendRelations(){
    const getUserIds = 'SELECT id FROM user_account';
    const idQuery = await pool.query(getUserIds);
    
    for(let i = 0; i <= idQuery.rows.length -1; i++){
      console.log( idQuery.rows[i].id);
      for(let j = 0; j <= idQuery.rows.length -1; j++){
        if( idQuery.rows[j] !== idQuery.rows[i]){
          const sql = `
            INSERT INTO friends(user_id, user_id_2)
            VALUES($1,$2);
          `;
          const values = [idQuery.rows[i].id, idQuery.rows[j].id];
          const query = await pool.query(sql,values);
          console.log(idQuery.rows[j].id);
        }
      }
    }

    console.log(' ');
  }
}

async function genParagraph() {
  try {
    const response = await fetch(
      'https://baconipsum.com/api/?type=all-meat&paras=3&start-with-lorem=1&format=json'
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
  }
}

async function genSentence() {
  try {
    const response = await fetch(
      'https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1&formay=json'
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return JSON.stringify(data);
  } catch (error) {
    console.error('Error', error);
  }
}

function genRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
}

function genRandomTimestamp(
  startYear,
  startMonth,
  startDay,
  endYear,
  endMonth,
  endDay
) {
  const results = dateFns.eachDayOfInterval({
    start: new Date(startYear, startMonth, startDay),
    end: new Date(endYear, endMonth, endDay),
  });

  const randomDateBetween = results[genRandomIntInclusive(0, results.length - 1)];

  // set random hours, minutes and seconds 
  randomDateBetween.setHours(genRandomIntInclusive(0, 23));
  randomDateBetween.setMinutes(genRandomIntInclusive(0, 59));
  randomDateBetween.setSeconds(genRandomIntInclusive(0, 59));

  const sqlFormat = dateFns.formatISO9075(randomDateBetween);

  return sqlFormat;
}

function genRandomMedia() {
  const dir = fs.readdirSync(
    path.join(__dirname, '..', 'public', 'post_pictures')
  );
  const imgName = dir[genRandomIntInclusive(0, 31)];
  const imgPath = `http://localhost:3000/post_pictures/${imgName}`;

  return imgPath;
}

async function getMinUserId() {
  const minUserId = 'SELECT MIN(id) FROM user_account';
  const minUserIdQuery = await pool.query(minUserId);

  return minUserIdQuery;
}

async function getMaxUserId() {
  const maxUserId = 'SELECT MAX(id) FROM user_account';
  const maxUserIdQuery = await pool.query(maxUserId);

  return maxUserIdQuery;
}

async function getMinPostId() {
  const minPostId = 'SELECT MIN(id) FROM post';
  const minPostIdQuery = await pool.query(minPostId);

  return minPostIdQuery;
}

async function getMaxPostId() {
  const maxPostId = 'SELECT MAX(id) FROM post';
  const maxPostIdQuery = await pool.query(maxPostId);

  return maxPostIdQuery;
}

async function getMinCommentId(){
  const minCommentId = 'SELECT MIN(id) FROM post_comment';
  const minCommentIdQuery = await pool.query(minCommentId);

  return minCommentIdQuery;
}

async function getMaxCommentId(){
  const maxCommentId = 'SELECT MAX(id) FROM post_comment';
  const maxCommentIdQuery = await pool.query(maxCommentId);
  
  return maxCommentIdQuery;
}

module.exports = ComGenContent;
