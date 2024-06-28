import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret_key';

router.post('/', (req, res) => {
    const { username, password } = req.body;

    if (username === 'your_username' && password === 'your_password') {
        const userId = 1; // 예제용 사용자 ID
        const email = 'user@example.com'; // 예제용 이메일
        const token = jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        return res.status(200).json({ token });
    }

    console.log('Invalid username or password');
    return res.sendStatus(401); // Unauthorized
});

export default router;
