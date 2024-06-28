import express from 'express';
import bcrypt from 'bcryptjs'; // bcrypt 추가
import jwt from 'jsonwebtoken';
import User from '../model/User.js';

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret_key';

router.post('/', async (req, res) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    console.log(email);

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.sendStatus(401); // Unauthorized
        }

        const pwMatch = await bcrypt.compare(password, user.password);

        if (pwMatch) {
            const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

            // 쿠키에 JWT 토큰 설정
            res.cookie('token', token, {
                httpOnly: true, // 클라이언트에서 쿠키를 읽지 못하도록 설정
                secure: false, // 개발 환경에서는 false, 프로덕션 환경에서는 true로 설정
                maxAge: 3600000 // 쿠키의 유효 기간 설정 (1시간)
            });

            return res.status(200).json({ userId: user._id, userName: user.name });
        } else {
            return res.sendStatus(401); // Unauthorized
        }
    } catch (err) {
        console.error(err);
        return res.sendStatus(500); // Internal Server Error
    }
});
    

export default router;
