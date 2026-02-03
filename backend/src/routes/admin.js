/**
 * @swagger
 * /admin/register-admin:
 *   post:
 *     summary: Register a new admin (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *       403:
 *         description: Forbidden - Admin only
 */

const router=require("express").Router()
const auth=require("../middlewares/auth")
const authorize=require("../middlewares/authorize")
const validate=require("../middlewares/validate")
const {registerSchema}=require("../utils/schemas")
const {registerAdmin}=require("../controllers/adminController")
router.post("/register-admin",auth,authorize(["admin"]),validate(registerSchema),registerAdmin)
module.exports=router
