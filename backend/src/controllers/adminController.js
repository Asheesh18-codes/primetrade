const authService=require("../services/authService")
const {AppError}=require("../utils/errors")

const registerAdmin=async(req,res,next)=>{
  try{
    console.log("Admin register request for email:", req.body.email);
    const user=await authService.register({...req.body, role:"admin"})
    console.log("Admin registered successfully:", user);
    res.status(201).json(user)
  }catch(e){
    console.log("Admin register error:", e.message);
    next(e);
  }
}

module.exports={registerAdmin}
