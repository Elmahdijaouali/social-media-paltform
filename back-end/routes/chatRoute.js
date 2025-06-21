import  { createChat , sendMessage  , getChat , getChats  } from '../controllers/chatController.js'
import { Router } from 'express'
import verifyAuth from '../middlewares/auth.js'

const router = Router()

router.get('/' , verifyAuth , getChats )
router.get('/:id' , verifyAuth  , getChat )
router.post('/' , verifyAuth , createChat )
router.post('/:id/messages' , verifyAuth , sendMessage )

export default router
