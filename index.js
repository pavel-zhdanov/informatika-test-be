const http = require('http');
const app = require('./src/config/app')();

const port = process.env.PORT || 3001;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`we live at http://localhost:${port}`);
});
