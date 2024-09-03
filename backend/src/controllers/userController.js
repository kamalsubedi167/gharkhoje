import { PrismaClient } from "@prisma/client"


const getUser =async (req,res)=>{
    const prisma = new PrismaClient();
    const id = req.userId;
    console.log(id);
    const user =await prisma.user.findUnique({where:{id}});

    return res.json({id:user.id,name:user.name,email:user.email});
}


export {getUser};