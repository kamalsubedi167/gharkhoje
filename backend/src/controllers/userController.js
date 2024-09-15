import { PrismaClient } from "@prisma/client"


const getUser =async (req,res)=>{
    var {id}= req.params

    const prisma = new PrismaClient();
    if(!id){
     id = req.userId;
        
    }
    const user =await prisma.user.findUnique({where:{id}});
    const userProfile = await prisma.userProfile.findFirst({where:{userId:id}})
    if(user &&  userProfile)
        user.profile =userProfile
    else return res.json([])

    return res.json(user);
}


export {getUser}; 