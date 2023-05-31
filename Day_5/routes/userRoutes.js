const express = require("express");
const router = express.Router();


const { signUp, login, getUsers, getUserById, updateUserById, deleteUserById } = require("../controllers/authenticationController");
const { loginValidation, signupValidation } = require("../utils/authenticationValidation");

// middleware
// router.use("/", (req, res, next) => {
//   console.log("request happend at ", Date.now());
//   req.test = "mohamed";
//   next();
// });

// restful api (users) : crud operations // create, read , update, delete
// users

// get users
router.get("/", getUsers);
// Get User by ID
router.get("/:id", getUserById);
// Register User
router.post("/", signupValidation, signUp);
// Log-in
router.post("/login", loginValidation, login);
// update users
// put : replace the old document with the new document
// patch: only modifies certain properties inside the document
router.put("/:id", updateUserById);
router.patch("/:id", updateUserById);
// delete users
router.delete("/:id", deleteUserById);
// router.use((req, res, next) => {
//   console.log(req.data);
// });

module.exports = router;
