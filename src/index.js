const express = require('express');
const { PORT } = require('./config/serverConfig');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use(morgan('combined'));

const startServer = () => {
    app.listen(PORT, (req, res) => {
        console.log(`Server started on post ${PORT}`);
    });
}

startServer();