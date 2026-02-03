const {AppError}=require("../utils/errors")
module.exports=(roles)=>(req,res,next)=>{
  if(!req.user) return next(new AppError(401,"Unauthorized"))
  if(!roles.includes(req.user.role)) return next(new AppError(403,"Forbidden: Insufficient permissions"))
  next()
}
