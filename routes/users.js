import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getPeoples
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.get("/", getPeoples);

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */

export default router;