import { PrismaClient } from "@prisma/client"
import axios from "axios";


export const recommend = async(req,res)=>{

    const {id} = req.params;
    var prisma = new PrismaClient()
    const listings = await prisma.listing.findMany();

    console.log(id);
    const current =await prisma.listing.findUnique({where:{id}});
    const respose =await axios.post("http://localhost:5000/similar",{x:listings,y:current});

    // console.log( respose.data);
    return res.json(respose.data);

}