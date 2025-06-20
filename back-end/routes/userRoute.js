import { destroyAccount, login , register } from '../controllers/AuthController.js';
import { Router } from "express"

const router = Router();

router.post('/login' , login ) 
router.post('/register' , register )
router.delete('/destoryAccount' , destroyAccount )

export default router 
