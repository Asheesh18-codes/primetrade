const router=require("express").Router()
const {register,login}=require("../controllers/authController")
const validate=require("../middlewares/validate")
const {registerSchema,loginSchema}=require("../utils/schemas")
router.post("/register",validate(registerSchema),register)
router.post("/login",validate(loginSchema),login)
module.exports=router
