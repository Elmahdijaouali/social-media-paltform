import User from '../models/User.js' 
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const login = async ( req , res ) => {
    const { username , password } = req.body
    try{
       
        const user = await User.findOne({ username })
        if(!user) {
            return res.json({ error  : 'User not found' })
        }

        const isValidPassword = await bcrypt.compare(password , user.password)

        if(!isValidPassword){
          return res.json({ error : 'password not correct !'})
        }


        const token = jwt.sign({ id : user._id } , process.env.SECRET_KEY , { expiresIn :"1h" })

        res.json({ token , message : 'successfuly login ' })

    }catch(err){
         console.log(err)
         res.json({ error : 'error' + err.message  })
    }
}


const register = async ( req , res ) => {

    const { username , firstname , bio , lastname , password } = req.body

    try{
        if(!username || !password || !firstname || !lastname || !bio){
            return res.json({ error : 'please fill all fields' })
        }

        const userExists = await User.findOne({ username })

        if(userExists){
            return res.json({ error : 'username already exists' })
        }

        const  hashedPassword = await bcrypt.hash(password , 10)

        const user = new User({username , firstname , lastname , bio  , password : hashedPassword })

        await user.save()

        res.json({ 
            message : 'user created successfully',
        })

    }catch(err){
         console.log(err)
         res.json({
            error : 'error' + err.message
         })
         
    }
}

const destroyAccount = async ( req , res ) => {
    try{
      const user = await User.findById(req.user.id)
      await user.remove()

      res.json({ message : 'account deleted successfully' })
   
    }catch(err){
         console.log(err)
         res.json({ 
            error : 'error ' + err.message
         })
         
    }
}

const updatePassword = async ( req , res ) => {
   const { oldPassword , newPassword } = req.body

   try{
      const user = await User.findById(req.user.id)
     const isMatch = await bcrypt.compare(oldPassword , user.password)
     if(!isMatch){
        return res.json({ error : 'old password is incorrect' })
     }
     
      const hashedPassword =  await bcrypt.hash(newPassword , 10) 
     await user.updateOne( { password : hashedPassword  })

     res.json({
        message : 'password updated successfully'
     })
      
   }catch(err){
      console.log({
         error : 'error ' + err.message
      })
   }
}

const updateInofmrationProfile = async ( req , res ) => {
    const { username , firstname , lastname  , bio  } = req.body 
     try{
      const user = await User.findById(req.user.id)
      user.username = username
      user.firstname = firstname
      user.lastname = lastname
      user.bio = bio
      await user.save()
      res.json({
         message : "profile updated successfully"
      })
      
     }catch(err){
      console.log({
         error : 'error ' + err.message
      })
     }
}

const logout = async (req , res ) => {
     try{
       
       res.json( { message : 'logged out successfully' } )
     }catch(err){
         console.log(err)
         res.json({
            error : 'error ' + err.message
         })
     }
}

const updatePrfile = async ( req , res ) =>{
     const { profilePicture } = req.body    
     try{
     
        const user = await User.findById(req.user.id)
        user.profilePicture = profilePicture
        user.save()

        res.json({
            message : "profile picture updated successfully"
        })

     }catch(err){
         console.log(err) 
         res.json()
     }
}

const updateCover = async ( req , res ) =>{
     const { cover  } = req.body    
     try{
     
        const user = await User.findById(req.user.id)
        user.cover = cover 

        user.save()

        res.json( {
            message : 'cover updated successfully'
        })
     }catch(err){
         console.log(err) 
         res.json()
     }
}


const getUser =async (req , res ) => {

   try{
      const user = await User.findById(req.user.id)
      res.json(user)

   }catch(err){
     console.log(err)
     res.json( {
         error : 'error ' + err.message
     })
   }
}




export { login , register , destroyAccount }