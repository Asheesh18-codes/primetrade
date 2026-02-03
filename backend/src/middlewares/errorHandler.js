const {AppError}=require("../utils/errors")
module.exports=(err,req,res,next)=>{
  const status=err instanceof AppError?err.status:500
  const message=err.message||"Server error"
  res.status(status).json({error:message})
}
