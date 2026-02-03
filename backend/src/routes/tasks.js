/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created
 *       401:
 *         description: Unauthorized
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task details
 *   put:
 *     summary: Update a task (Admin only)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated
 *       403:
 *         description: Forbidden - Admin only
 *   delete:
 *     summary: Delete a task (Admin only)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted
 *       403:
 *         description: Forbidden - Admin only
 */

const router=require("express").Router()
const auth=require("../middlewares/auth")
const authorize=require("../middlewares/authorize")
const validate=require("../middlewares/validate")
const {taskCreateSchema,taskUpdateSchema,taskIdSchema}=require("../utils/schemas")
const {listTasks,getTask,createTask,updateTask,deleteTask}=require("../controllers/taskController")
router.use(auth)
router.get("/",listTasks)
router.get("/:id",validate(taskIdSchema),getTask)
router.post("/",validate(taskCreateSchema),authorize(["user","admin"]),createTask)
router.put("/:id",validate(taskUpdateSchema),authorize(["admin"]),updateTask)
router.delete("/:id",validate(taskIdSchema),authorize(["admin"]),deleteTask)
module.exports=router
