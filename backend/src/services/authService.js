const db=require("../db")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {AppError}=require("../utils/errors")
const register=async({email,password,role})=>{
  const hash=await bcrypt.hash(password,10)
  try{
    const {rows}=await db.query("insert into users(email,password_hash,role) values($1,$2,$3) returning id,email,role",[email,hash,role||"user"])
    return rows[0]
  }catch(e){
    if(e.code==="23505") throw new AppError(409,"Email already exists")
    throw e
  }
}
const login=async({email,password})=>{
  const {rows}=await db.query("select id,email,role,password_hash from users where email=$1",[email])
  const user=rows[0]
  if(!user) throw new AppError(401,"Invalid credentials")
  const ok=await bcrypt.compare(password,user.password_hash)
  if(!ok) throw new AppError(401,"Invalid credentials")
  const token=jwt.sign({userId:user.id,role:user.role},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN||"1d"})
  return {token,user:{id:user.id,email:user.email,role:user.role}}
}
module.exports={register,login}
