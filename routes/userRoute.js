const express = require("express")
const { homePage , addUser, showUser } = require("../controllers/userController")
const router = express.Router()

router.route("/").get(homePage)

router.route("/adduser").post(addUser)

router.route("/showuser").get(showUser)


module.exports = router