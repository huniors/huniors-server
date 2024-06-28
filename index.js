import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import loginRouter from './api/login.js';

const app = express();
app.use(express.json());
app.use(cookieParser());  // cookie-parser 미들웨어 설정
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.options('*', cors());
app.listen(8080, () => {
    console.log(`Server running on port 8080`);
});

mongoose.connect("mongodb+srv://hmusk7:tJiuD3c7s4oeLeC6@developmentcluster.uhickvy.mongodb.net/?retryWrites=true&w=majority&appName=DevelopmentCluster/MyLittlePelican")
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

import checkTokenApi from './api/CheckToken.js';
import signInApi from './api/SignIn.js';
import signUpApi from './api/SignUp.js';

app.use('/api/checktoken', checkTokenApi);
app.use('/api/signin', signInApi);
app.use('/api/signup', signUpApi);