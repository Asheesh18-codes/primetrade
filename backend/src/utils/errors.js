class AppError extends Error{constructor(status,message){super(message);this.status=status}}
const notFound=(msg)=>new AppError(404,msg||"Not found")
const forbidden=(msg)=>new AppError(403,msg||"Forbidden")
const unauthorized=(msg)=>new AppError(401,msg||"Unauthorized")
module.exports={AppError,notFound,forbidden,unauthorized}
