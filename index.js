import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import loginRouter from './api/login.js';
import checkTokenRouter from './api/CheckToken.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cookieParser());  // cookie-parser 미들웨어 설정

app.use('/login', loginRouter);
app.use('/', checkTokenRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
