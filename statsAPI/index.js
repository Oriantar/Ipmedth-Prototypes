import express from 'express';
import winston from 'winston';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

const logger = new winston.createLogger({
    transports: [
        new winston.transports.File({ filename: 'performance.log' })
    ]

});
app.post('/performance', (req, res) => {

    const fps = req.body.fps;
    const timestamp = req.body.timestamp; // Get timestamp from the request
    const logMessage = `${timestamp} - FPS: ${fps}\n`;
    console.log(fps);

    logger.log('info', logMessage); // Log the message to the file
});

app.post('/log-keys', (req, res) => {
    const keyLog = req.body; // Get the key log array from the request
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - Key Log: ${JSON.stringify(keyLog)}\n`;

    logger.log('info', logMessage); // Log the message to the file
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});