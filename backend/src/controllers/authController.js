import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { generateToken } from "../helpers/verifyToken.js";


const register =async (req,res)=>{
    const {name,email,password} = req.body;
    try{
        var errors = {};

        if(!name || name.length<6){
            errors.name = "Name must be at least 6 chars";
        }//if not username
        if(!email || email.length<6){
            errors.email = "Email must be at least 6 chars";
        }//if not username
        if(!password || password.length<6){
            errors.password = "Passoword must be at least 6 chars";
        }//if not username

      
        
        if(Object.keys(errors).length>0){
            return res.status(400).json(errors);
        }

        const prisma = new PrismaClient();

        const hashedPassword = await bcrypt.hash(password,5);

        const user = await prisma.user.create({
            data:{name,email,password:hashedPassword}
        }
           );
        return res.json({message:"Register success Vayo"})
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Failed to create user"});
    }
}//register


const login =async (req,res)=>{
    const {email,password} = req.body;
    try{
       
        const prisma = new PrismaClient();

        const user = await prisma.user.findUnique({
            where:{email:email}
        });

        // const user = await prisma.user.findFirst({where:{email}});

        if(!user) return res.status(400).json({message:"Invalid Credentials"});

        const hashedPassword = user.password;
        const isPasswordMatch = await bcrypt.compare(password,hashedPassword);

        if(!isPasswordMatch)  return res.status(400).json({message:"Invalid Credentials"});
        
        const token = generateToken({id:user.id});

        return res.json({name:user.name,id:user.id,token});
    
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Something went wrong logging..."});
    }
}//register








export {login,register};