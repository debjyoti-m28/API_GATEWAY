const express = require('express');
const { PORT } = require('./config/serverConfig');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit')
const app = express();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
})

app.use(morgan('combined'));
app.use(limiter);

app.use('/bookingservice', async (req, res, next) => {
    console.log(req.headers['x-access-token']);
    try {
        const response = await axios.get('http://localhost:3001/api/v1/isauthenticated', {
            headers: {
                'x-access-token': req.headers['x-access-token']
            }
        });
        console.log(response.data);
        if(response.data.success) {
            next();
        } else {
            return res.status(401).json({
                message: 'Unauthorised'
            })
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorised'
        })
    }
})

app.use('/bookingservice', createProxyMiddleware({ target: 'http://localhost:3002/', changeOrigin: true}));

const startServer = () => {
    app.listen(PORT, (req, res) => {
        console.log(`Server started on post ${PORT}`);
    });
}

startServer();