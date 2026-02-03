const router=require("express").Router()
const auth=require("../middlewares/auth")
const authorize=require("../middlewares/authorize")
const validate=require("../middlewares/validate")
const {registerSchema}=require("../utils/schemas")
const {registerAdmin}=require("../controllers/adminController")

router.post("/register-admin",auth,authorize(["admin"]),validate(registerSchema),registerAdmin)

module.exports=router
