const db=require('./src/db')
const bcrypt=require('bcrypt')
async function setupAdmin(){
  try{
    const email=process.argv[2]||'admin@gmail.com'
    const password=process.argv[3]||'admin123'
    console.log('Setting up admin user...')
    const hash=await bcrypt.hash(password,10)
    const result=await db.query('INSERT INTO users(email,password_hash,role) VALUES($1,$2,$3) ON CONFLICT (email) DO UPDATE SET role=\'admin\' RETURNING id,email,role',[email,hash,'admin'])
    console.log('Admin setup successful:',result.rows[0])
  }catch(err){
    console.error('Admin setup error:',err.message)
  }finally{
    process.exit(0)
  }
}
setupAdmin()
