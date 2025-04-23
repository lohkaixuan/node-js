const express = require("express");
const AuthController = require("../Controller/authController");
const router = express.Router();

// ==================== 🔓 PUBLIC ROUTES ====================

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/user/:uid", AuthController.getUser);
router.get("/user", AuthController.getUserByToken);

module.exports = router;
