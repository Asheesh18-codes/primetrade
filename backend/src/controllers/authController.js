const authService=require("../services/authService")
const register=async(req,res,next)=>{
  try{
    console.log("Register request received for email:", req.body.email);
    const user=await authService.register(req.body)
    console.log("Register successful:", user);
    res.status(201).json(user)
  }catch(e){
    console.log("Register error:", e.message);
    next(e);
  }
}
const login=async(req,res,next)=>{
  try{
    console.log("Login request received for email:", req.body.email);
    const data=await authService.login(req.body)
    console.log("Login successful");
    res.json(data)
  }catch(e){
    console.log("Login error:", e.message);
    next(e);
  }
}
module.exports={register,login}
