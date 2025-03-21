const express = require("express");
const { getUserById, updateUserProfile, deleteUser } = require("../controllers/userController");
const verifyToken = require("../middlewares/auth");

const router = express.Router();

router.get("/:id", verifyToken, getUserById);
router.put("/update", verifyToken, updateUserProfile);
router.delete("/delete", verifyToken, deleteUser);

module.exports = router;
