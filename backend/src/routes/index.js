const router=require("express").Router()
router.use("/auth",require("./auth"))
router.use("/tasks",require("./tasks"))
module.exports=router
