import { PrismaClient } from "@prisma/client";
import upload from "../helpers/upload.js";

const prismaClient = new PrismaClient();

async function createListing(req, res) {
  const data = req.body;


  const photoFilenames = req.files.map(file => file.filename);
  
  data['photos'] = photoFilenames;
  delete data['images'];


  data['userId'] = req.userId;

  if(data['parkingSpot'=="true"]){
    data['parkingSpot'] = true;
  }
  else{
    data['parkingSpot'] = false;
  }

  if(data['furnished'=="true"]){
    data['furnished'] = true;
  }
  else{
    data['furnished'] = false;
  }

  data['beds'] = parseInt(data.beds);
  data['baths'] = parseInt(data.baths);
  data['price'] = parseFloat(data.price);

  // delete data['images'];

  try {
    // Create a new listing
    const listing = await prismaClient.listing.create({ data });

    return res.status(201).json(listing);
  } catch (error) {
    console.error("Error creating listing:", error);
    return res.status(500).json({ message: "Something went wrong re baba", error });

  }
}


export const getMyAllProperties = async (req,res)=>{
    try{

      const userId = req.userId;

      const prisma = new PrismaClient();
      const properties  = await prisma.listing.findMany({
        where:{
          userId
        }
      })//find all userId

      // console.log(userId,properties)

      return res.json(properties);


    }
    catch(err){
      res.status(400).json({err})
      console.log(err);
    }
}


export const deleteMyProperty = async (req,res)=>{
  try{

    const userId = req.userId;
    const id = req.body.id;

    const prisma = new PrismaClient();
    await prisma.listing.delete({
      where:{
        userId,
        id
      }
    })//find all userId

    return res.send();


  }
  catch(err){
    res.status(400).json({err})
    console.log(err);
  }
}


const searchListings = async (req, res) => {
  try {
    const { search, address, type,price } = req.query;
   
    // Build Prisma filter conditions
    let whereConditions = {};

    // Search across name, description, and address
    if (search ) {
    // console.log(search)
      whereConditions.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Filter by address
    if (address) {
      whereConditions.address = { contains: address, mode: 'insensitive' };
    }

    // Filter by type (RENT or SELL)
    if (type) {
      whereConditions.type = { equals: type};
    }

    if (price) {
     const [minPrice, maxPrice] = price.split('-').map(Number);

      whereConditions.price = {
        gte: minPrice, 
        lte: maxPrice 
      };
    }
    
    console.log(whereConditions);

    const prisma = new PrismaClient();
    // Query the database with the constructed filters
    console.log(whereConditions)
    if( Object.keys(whereConditions)==0 ){
      var listings = await prisma.listing.findMany();
    }
    else
    var listings = await prisma.listing.findMany({
      where: whereConditions,
    });
//price querey
    

    // Return the result to the client
    res.status(200).json(listings);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'An error occurred while searching listings' });
  }
};



async function getListings(req, res) {
  try {
    // Fetch all listings
    const listings = await prismaClient.listing.findMany();
    console.log(listings)
    return res.json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
}

async function getListingById(req, res) {
  const { id } = req.params;

  try {
    console.log(id)
    // Fetch a single listing by ID
    const listing = await prismaClient.listing.findUnique({
      where: { id },
    });

    console.log(listing)

    if (!listing) {
      return res.status(400).json({ message: "Listing not found" });
      console.log("budbak")    }

    return res.json(listing);

  } catch (error) {
    console.error("Error fetching listing by ID:", error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
}


async function getListingByUserId(req, res) {
  const { userId } = req.params;

  try {
    // Fetch a single listing by ID
    const listing = await prismaClient.listing.findUnique({
      where: { userId },
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
      console.log("budbak")    }

    return res.json(listing);
  } catch (error) {
    console.error("Error fetching listing by ID:", error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
}





async function updateListing(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  const data = req.body;

  try {
    // Update a listing by ID
    const updatedListing = await prismaClient.listing.update({
      where: { id,userId },
      data,
    });

    return res.json(updatedListing);
  } catch (error) {
    console.error("Error updating listing:", error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
}

async function deleteListing(req, res) {
  const { id } = req.params;
  // const userId = req.userId;

  try {
    // Delete a listing by ID
    await prismaClient.listing.delete({
      where: { id },
    });

    return res.status(204).send(); // No content
  } catch (error) {
    console.error("Error deleting listing:", error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
}

export { createListing,searchListings, getListingByUserId,getListings, getListingById, updateListing, deleteListing };
