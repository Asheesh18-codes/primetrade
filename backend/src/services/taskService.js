const db=require("../db")
const {notFound,forbidden}=require("../utils/errors")
const isAdmin=(user)=>user.role==="admin"
const list=async(user)=>{
  if(isAdmin(user)){
    const {rows}=await db.query("select id,title,description,status,user_id as \"userId\" from tasks order by id desc")
    return rows
  }
  const {rows}=await db.query("select id,title,description,status,user_id as \"userId\" from tasks where user_id=$1 order by id desc",[user.userId])
  return rows
}
const get=async(user,id)=>{
  const {rows}=await db.query("select id,title,description,status,user_id as \"userId\" from tasks where id=$1",[id])
  const task=rows[0]
  if(!task) throw notFound()
  if(!isAdmin(user)&&task.userId!==user.userId) throw forbidden()
  return task
}
const create=async(user,{title,description,status,userId})=>{
  const owner=isAdmin(user)&&userId?userId:user.userId
  const {rows}=await db.query("insert into tasks(title,description,status,user_id) values($1,$2,$3,$4) returning id,title,description,status,user_id as \"userId\"",[title,description||null,status,owner])
  return rows[0]
}
const update=async(user,id,data)=>{
  const task=await get(user,id)
  const owner=isAdmin(user)&&data.userId?data.userId:task.userId
  if(!isAdmin(user)&&owner!==user.userId) throw forbidden()
  const {rows}=await db.query("update tasks set title=$1,description=$2,status=$3,user_id=$4 where id=$5 returning id,title,description,status,user_id as \"userId\"",[data.title??task.title,data.description??task.description,data.status??task.status,owner,id])
  return rows[0]
}
const remove=async(user,id)=>{
  const task=await get(user,id)
  if(!isAdmin(user)&&task.userId!==user.userId) throw forbidden()
  await db.query("delete from tasks where id=$1",[id])
}
module.exports={list,get,create,update,remove}
