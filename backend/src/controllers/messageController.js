import { PrismaClient } from "@prisma/client"
import { query } from "express";


async function sendMessage(req,res){
    const data = req.body;


    try{
        const prismaClient = new PrismaClient();
        data['sender'] = req.userId;

        const message = await prismaClient.message.create({data});

        return res.json(message);
    }catch(error){
        return res.status(500).json({message:"Something went wrong",error});
    }

}//


async function getChattedUsers(req,res) {
        var userId = req.userId;
        const prismaClient = new PrismaClient();

    
    // try {
    
      const messages = await prismaClient.message.findMany({
        where: {
          OR: [
            { sender: userId },
            { receiver: userId }
          ]
        },
        select: {
          sender: true,
          receiver: true
        }
      });

      // console.log(messages);
  
      // Extract unique user IDs
      const userSet = new Set();
      messages.forEach(message => {
        if (message.sender !== userId) {
          userSet.add(message.sender);
        }
        if (message.receiver !== userId) {
          userSet.add(message.receiver);
        }
      });
  
      // Convert the Set to an Array
      const chattedUsers = Array.from(userSet);
  
      const users = await prismaClient.user.findMany({
        where: {
          id: {
            in: chattedUsers,
          },
        },
        select: {
          id: true,
          name: true
        }
      });
  
      // console.log('Chatted users:', users);
      return res.json(users);
    // } catch (error) {
    //     return res.status(400).json({error})
    // } 
  }


async function getMessages(req,res) {
  var userId = req.userId;
  var otherId = req.body.id;
  
  const prismaClient = new PrismaClient();


// try {

const messages = await prismaClient.message.findMany({
  where: {
    OR: [
      { sender: userId,receiver:otherId },
      { receiver: userId,sender:otherId }
    ]
  },
  
});



// Convert the Set to an Array
console.log(otherId,"OTher id");
const user = await prismaClient.user.findFirst({
  where: {
    id:otherId
  },
  select: {
    id: true,
    name: true
  }
});

// console.log('Chatted users:', users);
return res.json({messages,user});
// } catch (error) {
//     return res.status(400).json({error})
// } 
}
  



export {sendMessage,getChattedUsers,getMessages};