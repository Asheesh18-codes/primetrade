const jwt=require("jsonwebtoken")
const {unauthorized}=require("../utils/errors")
module.exports=(req,res,next)=>{
  const header=req.headers.authorization||""
  const token=header.startsWith("Bearer ")?header.slice(7):null
  if(!token) return next(unauthorized())
  try{
    const payload=jwt.verify(token,process.env.JWT_SECRET)
    req.user={userId:payload.userId,role:payload.role}
    next()
  }catch(e){next(unauthorized())}
}
