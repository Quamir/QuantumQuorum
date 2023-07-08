require('dotenv').config({ path: './config.env'});

const app = require('./app');


app.listen(3000, () => {
    console.log('server started on port 3000');
});