import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret_key';

router.get('/', (req, res) => {
    const cookies = req.headers.cookie;
    console.log('Received cookies:', cookies);

    if (!cookies) {
        console.log('No cookies provided');
        return res.sendStatus(401); // Unauthorized
    }

    // 쿠키 값 자체를 JWT 토큰으로 간주하고 처리
    const cookieArray = cookies.split(';').map(cookie => cookie.trim());
    const token = cookieArray.find(cookie => cookie.split('.').length === 3);

    if (!token) {
        console.log('No valid JWT token found');
        return res.sendStatus(401); // Unauthorized
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Token verified successfully:', decoded);
        return res.status(200).json({ userId: decoded.id, email: decoded.email });
    } catch (err) {
        console.error('Token verification failed:', err.message);
        return res.sendStatus(401); // Unauthorized
    }
});

export default router;
