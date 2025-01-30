import express from 'express';
import { loginUser, logoutUser, signupUser } from '../../Controllers/user.controllers.js';
import { createNewToken } from '../../Controllers/jwt.controller.js';
import { authenticateToken } from '../../Middlewares/jwt.middleware.js';
import { createPost, deletePost, getAllPosts, getPost, updatePost } from '../../Controllers/post.controller.js';

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

router.post("/create", authenticateToken, createPost);
router.put("/update/:id", authenticateToken, updatePost);
router.delete("/delete/:id", authenticateToken, deletePost);

router.get("/post/:id", authenticateToken, getPost);
router.get("/posts", authenticateToken, getAllPosts);

export default router;