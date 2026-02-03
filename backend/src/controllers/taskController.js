const taskService=require("../services/taskService")
const listTasks=async(req,res,next)=>{
  try{
    const tasks=await taskService.list(req.user)
    res.json(tasks)
  }catch(e){next(e)}
}
const getTask=async(req,res,next)=>{
  try{
    const task=await taskService.get(req.user,req.params.id)
    res.json(task)
  }catch(e){next(e)}
}
const createTask=async(req,res,next)=>{
  try{
    const task=await taskService.create(req.user,req.body)
    res.status(201).json(task)
  }catch(e){next(e)}
}
const updateTask=async(req,res,next)=>{
  try{
    const task=await taskService.update(req.user,req.params.id,req.body)
    res.json(task)
  }catch(e){next(e)}
}
const deleteTask=async(req,res,next)=>{
  try{
    await taskService.remove(req.user,req.params.id)
    res.status(204).end()
  }catch(e){next(e)}
}
module.exports={listTasks,getTask,createTask,updateTask,deleteTask}
