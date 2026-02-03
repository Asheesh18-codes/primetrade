const {z}=require("zod")
const registerSchema=z.object({body:z.object({email:z.string().email(),password:z.string().min(6),role:z.enum(["user","admin"]).optional()}),params:z.object({}).optional(),query:z.object({}).optional()})
const loginSchema=z.object({body:z.object({email:z.string().email(),password:z.string().min(6)}),params:z.object({}).optional(),query:z.object({}).optional()})
const taskIdSchema=z.object({body:z.object({}).optional(),params:z.object({id:z.coerce.number().int().positive()}),query:z.object({}).optional()})
const taskCreateSchema=z.object({body:z.object({title:z.string().min(1),description:z.string().optional(),status:z.string().min(1),userId:z.coerce.number().int().positive().optional()}),params:z.object({}).optional(),query:z.object({}).optional()})
const taskUpdateSchema=z.object({body:z.object({title:z.string().min(1).optional(),description:z.string().optional(),status:z.string().min(1).optional(),userId:z.coerce.number().int().positive().optional()}),params:z.object({id:z.coerce.number().int().positive()}),query:z.object({}).optional()})
module.exports={registerSchema,loginSchema,taskIdSchema,taskCreateSchema,taskUpdateSchema}
