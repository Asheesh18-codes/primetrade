module.exports=(schema)=>async(req,res,next)=>{
  try{
    const data=await schema.parseAsync({body:req.body,params:req.params,query:req.query})
    req.body=data.body
    req.params=data.params
    req.query=data.query
    next()
  }catch(e){
    const msg=e.errors?.[0]?.message||"Invalid request"
    res.status(400).json({error:msg})
  }
}
