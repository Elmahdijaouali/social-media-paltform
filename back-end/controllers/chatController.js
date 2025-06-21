
import Chat from '../models/Chat.js'
import Message from '../models/Message.js'


const createChat = async (req , res ) => {
    const userId1 = req.user.id
    const { userId2 , message  } = req.body
    if(!userId2 || !message){
        return res.status(400).json({error : "Please provide both userId and message" })
    }
    try{
        let chat = await Chat.findOne({ 
           members : {$all : [ userId1 , userId2] }
        })
        if(chat){
            return res.json({
                message : "Chat already exists",
            })
        }

       chat= await Chat.create({
        members : [
            userId1 ,
            userId2
        ]
       })
        
       req.io?.emit('chat_created' , chat )

       res.json({
         message : 'chat created successfuly' , 
         chat
       })

    }catch(err){
        console.log(err)
        res.status(400).json({
            message: 'Error '+err.message
        })
    }
           
}

const getChats = async (req , res ) => {
        const userId = req.user.id
        try{
            const chats = await Chat.find({members : {$in : [userId]}})
            .populate('members' , '-password')
           

            res.json(chats)

        }catch(err){
                console.log(err)
                res.status(400).json({
                    message: 'Error '+err.message
                })
          }

}

const getChat = async (req , res ) =>{
        const chatId = req.params.chatId
        if(!chatId){
            return res.status(422).json({
                message : 'chat id is required'
            })
        }
        try{
            const chat = await Chat.findById(chatId)
            .populate('members' , '-password')
             
            const messages = await Message.find({chatId : chatId})

            res.json({
                chat , 
                messages
            })

        }catch(err){
            console.log(err)
             res.status(400).json({
                    message: 'Error '+err.message
             })
        }
}

const sendMessage = async (req , res ) =>{
    const chatId = req.params.chatId
    const message = req.body.message
    if(!chatId || !message){
        return res.status(422).json({
            message : 'chat id and message are required'
            })
    }
    try{
      const chat = await Chat.findById(chatId)
      if(!chat){
          return res.status(404).json({
            message : 'chat not found'
            })
      }
      const newMessage = await Message.create({
        text : message ,
        senderId : req.user.id ,
        chatId : chatId
      })

      const receiverIds = chat.members.filter(id => id.toString() !== req.user.id.toString());

      receiverIds.forEach((receiverId) => {
         req.io?.to(receiverId.toString()).emit("new_message", {
           chatId,
           message: newMessage
         });
       });

      
      res.json({
        message : 'message sent successfully',
        newMessage
      })


    }catch(err){
        res.status(400).json({
            message: 'Error '+err.message
        })
    }

}

// const deleteMessage = async (req , res ) =>{
//     const chatId = req.params.chatId
//     const messageId = req.params.messageId
//     if(!chatId || !messageId){
//         return res.status(422).json({
//             message : 'chat id and message id are required'
//             })
//     }
//     try{
//         const message = await Message.findById(messageId)
//         if(!message){
//             return res.status(404).json({
//                 message : 'message not found'
//                 })
//         }
        
      

//     }catch(err){
//        res.json({
//          message : 'Error ' + err.message
//        })
//     }
// }

export { createChat , sendMessage  , getChat , getChats , deleteChat , deleteMessage }