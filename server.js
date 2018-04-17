/* eslint no-console: off */
const http = require('http');
const app = require('./lib/app');
const connect = require('./lib/connect');

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/heroes';

connect(MONGODB_URI);

server.listen(PORT, () => {
    console.log('server running on', server.address().port);
});