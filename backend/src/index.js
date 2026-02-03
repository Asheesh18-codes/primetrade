require("dotenv").config()
const express=require("express")
const app=express()
const routes=require("./routes")
const errorHandler=require("./middlewares/errorHandler")
const swagger=require("./swagger")

app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS")
  res.header("Access-Control-Allow-Headers","Content-Type,Authorization")
  if(req.method==="OPTIONS") return res.sendStatus(200)
  next()
})

app.use(express.json())
swagger(app)
app.use("/api/v1",routes)
app.use((req,res)=>res.status(404).json({error:"Not found"}))
app.use(errorHandler)
const port=process.env.PORT||4000
app.listen(port,()=>{console.log(`Server running on ${port}`)})
