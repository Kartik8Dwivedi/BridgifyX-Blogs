import express from 'express';
import { loginUser, logoutUser, signupUser } from '../../Controllers/user.controllers.js';
import { createNewToken } from '../../Controllers/jwt.controller.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: "API is working! - 👋🌎🌍🌏"
    })
});

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/logout", logoutUser);

router.post("/token", createNewToken);

export default router;