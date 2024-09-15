// profileController.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId; // Assuming `req.user.id` contains the authenticated user's ID
    const userProfile = await prisma.user.findUnique({
      where: { userId: userId }
    });

    if (!userProfile) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateUserProfile = async (req, res) => {
  try {

    const prisma = new PrismaClient()
    const userId = req.userId+""; // Assuming `req.user.id` contains the authenticated user's ID

    const { name, about, address, occupation, familyStatus, email, dateOfBirth, gender } = req.body;

    console.log(req.file)




    const userProfile = await prisma.userProfile.findFirst({ where: { userId } })
    if (userProfile) {
      if(req.file){
        await prisma.userProfile.update({
          where: { userId: userId },
          data: { avatarUrl:req.file.filename }
        });
        return res.json({avatarUrl:req.file.filename});
      }else
      await prisma.userProfile.update({
        where: { userId: userId },
        data: { name, about, address, occupation, familyStatus, email, dateOfBirth, gender }
      });
    }
    else {
      
       await prisma.userProfile.create({data:{ name, about, address, occupation, familyStatus, email, dateOfBirth, gender, userId:userId }});
    
    }

    res.send();
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
  // const userProfile = await prisma.userProfile.findFirst({where:{userId:id}})
};

export { getUserProfile, updateUserProfile };
