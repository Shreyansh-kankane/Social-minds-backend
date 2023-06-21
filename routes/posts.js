import express from "express";
import { getFeedPosts, getUserPosts, likePost,deletePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.patch("/:id/like", verifyToken, likePost);

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

router.delete("/:postId/delete",verifyToken,deletePost);

export default router;