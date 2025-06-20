import { destroyAccount, login , getUser , register, updatePassword, updateProfilePicture , updateInfomrationProfile , updateCoverPicture} from '../controllers/AuthController.js';
import { Router } from "express"
import verifyAuth from '../middlewares/auth.js'
const router = Router();

import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });

router.get('/me' , getUser )
router.post('/login' , login ) 
router.post('/register' , register )
router.delete('/destoryAccount' , verifyAuth , destroyAccount )
router.put('/updatePassword' , verifyAuth , updatePassword)
router.put('/updateProfilePicture' , verifyAuth ,  upload.single('image') , updateProfilePicture )
router.put('/updateCoverPicture' , verifyAuth ,  upload.single('image') , updateCoverPicture )
router.put('/updateInfomrationProfile' , verifyAuth ,  updateInfomrationProfile)
// router.delete('/logout')


export default router 
