import User from '../models/user.js'
import bcrypt from 'bcrypt'

export const signup = async(req,res) => {
    try {
        const {fullname,email,password} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"user already exists"})
        }
        const hashedpassword = await bcrypt.hash(password,10);

        const creatuser = new User({
            fullname:fullname,email:email,password:hashedpassword
        })
        await creatuser.save();
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: creatuser._id,
                fullname: creatuser.fullname,
                email: creatuser.email,
            },
        });
    } catch (error) {
        console.log("error" , error.message);
        res.status(500).json({message:"Internal server error"});
    }
}


export const login = async(req,res) => {
     try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        const ismatch = await bcrypt.compare(password,user.password);
        if(!user || !ismatch){
            return res.status(400).json({message : "Invalid username or password!"});
        }
        else{
            res.status(200).json({message:"Login successfully" , user:{
                _id:user.id,
                fullname:user.fullname,
                email:user.email,
            }})
        }
     } catch (error) {
        console.log("error" + error.message);
        res.status(500).json({messgae:"internal server error"});
     }
}