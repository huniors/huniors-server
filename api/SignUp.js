import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../model/User.js';

const router = express.Router();

const checkDuplication = async (req, res, next) => {
    const email = req.body.email.toLowerCase();
    const user = await User.findOne({ email });
    if (user) {
        return res.Status(409);
    }

    req.body.email = email;
    next();
};

router.post('/', checkDuplication, async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
        });
        await newUser.save();

        
    }
});

export default router;