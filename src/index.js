const express = require('express');
const { PORT } = require('./config/serverConfig');
const app = express();

const startServer = () => {
    app.listen(PORT, (req, res) => {
        console.log(`Server started on post ${PORT}`);
    });
}

startServer();