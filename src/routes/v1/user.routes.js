const express = require("express");
const {AuthMiddleware} = require("../../middlewares")
const { UserController } = require("../../controllers");
const router = express.Router();

router.get("/profile/:userId", AuthMiddleware.auth, UserController.getProfile);
router.put("/profile/:userId", AuthMiddleware.auth, UserController.updateProfile);
router.delete("/profile/:userId", AuthMiddleware.auth, UserController.deleteProfile);

module.exports = router;
