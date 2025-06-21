import Friend from '../models/Friend.js'
import User from '../models/User.js'



const getListUsersForAddNewFriend = async (req, res) => {
      try{

        const users = await User.find({ _id: { $ne: req.user._id } }).limit(20)
        res.json(users)

      }catch(err){
        res.status(400).json({
            message: err.message
        })
      }
}

const addFriend =async () => {
    try{
        const userId = req.user.id 
        if(!userId ){
          return res.status(401).json({ message: 'Unauthorized: No user ID' });
        }
      
        const friendId = req.body.friendId
        if(!friendId ){
            return res.status(422).json({ message: 'required field friendId ' });
        }

        const friend = await Friend.findOne({ $or : [
           { userId , friendId },
           { userId : friendId , friendId : userId }
        ] })

        if(friend){
           return res.status(400).json({
                message : "friend already exists"
            })
         }

        await Friend.create({ userId, friendId })

        res.json({ message: 'Friend added successfully' })

    }catch(err){
        res.status(400).json({
             error : err.message
        })
    }
}

const getFriends = async (req, res) =>{
     try{
        const userId = req.user.id
        if(!userId ){
            return res.status(401).json({ message: 'Unauthorized: No user ID' });
        }

        const friends = await Friend.find({ $or : [{ userId , status : 'allowed' }, { friendId: userId , status : 'allowed' }] })

        res.json({
               friends
             })
       
     }catch(err){
         res.status(400).json({
            error : err.message
            })
     }
}


const deleteFriend = async (req , res ) => {
     try{
        const userId = req.user.id
        if(!userId ){
            return res.status(401).json({ message: 'Unauthorized: No user ID' });
        }

        const {friendId} = req.params
         if(!friendId){
            return res.status(422).json({ message: 'required field friendId ' });
         }
         
         await Friend.findOneAndDelete({
             $or : [{ userId , friendId }, { userId : friendId , friendId : userId }]
         })

         res.json({
            message : 'Friend deleted successfully'
         })

     }catch(err){
         res.status(400).json({
            error : err.message
            })
     }
}

const getListBlockedFriends = async (req , res ) => {
     try{
       const userId = req.user.id
        if(!userId ){
            return res.status(401).json({ message: 'Unauthorized: No user ID' });
        }

        const friends = await Friend.find({ $or : [{ userId , status : 'blocked' }, { friendId: userId , status : 'blocked' }] })

        res.json({
               friends
             })
     }catch(err){
         res.status(400).json({
            error : err.message
            })
     }
}

const blockFriend = async (req , res ) =>{
    try{
       const userId = req.user.id
       if(!userId ){
        return res.status(401).json({ message: 'Unauthorized: No user ID' });
       }
      
       const {friendId} = req.params
       if(!friendId){
        return res.status(422).json({ message: 'required field friendId ' });
        }

       const friend = await Friend.findOne({ $or : [
        { userId , friendId },
        { userId : friendId , friendId : userId }
       ] })

       friend.status = 'blocked'
       await friend.save()

       res.json({
        message : 'Friend blocked successfully'
       })
       
    }catch(err){
         res.status(400).json({
            error : err.message
         })
    }
}

const unblockFriend = async (req , res ) =>{
    const { friendId} = req.params
    if(!friendId){
         return res.status(422).json({ message: 'required field friendId ' });
    }
     try{
         const userId = req.user.id
         if(!userId ){
            return res.status(401).json({ message: 'Unauthorized: No user ID' });
         }

      const friend = await Friend.findOne({ $or : [
        { userId , friendId },
        { userId : friendId , friendId : userId }
       ] })

       friend.status = 'allowed'
       await friend.save()

       res.json({
        message : 'Friend allowed successfully'
       })
       

         
     }catch(err){
        res.status(400).json({
            error : err.message
            })
     }
}

// const searchOnFriend = async (req , res ) => {
//      const { username } = req.params
//      if(!username){
//         res.status(422).json({
//             message : "username field is required "
//         })
//      }

//      try{
        
    
//      }catch(err){
//           res.status(400).json({
//             error : err.message
//             })
//      }
// }


export { addFriend , deleteFriend , blockFriend , unblockFriend ,  getFriends ,getListUsersForAddNewFriend , getListBlockedFriends }