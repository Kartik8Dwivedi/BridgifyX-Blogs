import express from 'express';
import { loginUser } from '../../Controllers/user.controllers.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: "API is working! - 👋🌎🌍🌏"
    })
});

router.post("/login", loginUser);

export default router;