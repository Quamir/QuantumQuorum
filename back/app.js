const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

//route paths 
const devRouter = require('./routes/devRoutes');
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const realRouter = require('./routes/realRoutes');
const likesRouter = require('./routes/likesRoutes');
const commentRouter = require('./routes/commentRoutes');

//prevent CORS ISSUES 
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({limit: '50mb'}));


//main routes 
app.use('/api/dev', devRouter);
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/real', realRouter);
app.use('/api/likes', likesRouter);
app.use('/api/comment', commentRouter);


//error handling middleware 
app.use((err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status, 
        message: err.message, 
        operational: err.isOperational, 
        stacktrace: err.stack
    });
});

module.exports = app;