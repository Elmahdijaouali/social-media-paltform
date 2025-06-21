import { Router } from 'express'
import { addFriend, blockFriend, deleteFriend, getFriends, unblockFriend  , getListUsersForAddNewFriend , getListBlockedFriends} from '../controllers/friendController'
import verifyAuth from '../middlewares/auth'


const router = Router()

router.get('/getListUsersForAddNewFriend' , verifyAuth , getListUsersForAddNewFriend )
router.get('/friends' , verifyAuth , getFriends )
router.post('/add' , verifyAuth , addFriend )
router.get('/listBlockded' , verifyAuth  , getListBlockedFriends)
router.put('/block/:friendId' , verifyAuth , blockFriend )
router.put('/unblock/:friendId' , verifyAuth , unblockFriend )
router.delete('/delete/:friendId' , verifyAuth , deleteFriend)

export default router  
