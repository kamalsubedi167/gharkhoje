// import { Listing, User } from ('../models'); // Import your models

import { PrismaClient } from "@prisma/client";

// Approve a listing
const approveListing = async (req, res) => {
  try {
    const { id } = req.params;

    const prisma = new PrismaClient()
    const listing = await prisma.listing.update({where:{id},data:{status:"ACTIVE"}});;
 

    res.status(200).json({ message: 'Listing approved successfully', listing });
  } catch (error) {
    console.error('Error approving listing:', error);
    res.status(500).json({ message: 'Internal Server Error'+error });
  }
};

// Reject a listing
const rejectListing = async (req, res) => {
  try {
    const { id } = req.params;
    const prisma = new PrismaClient()

    const listing = await prisma.listing.update({where:{id},data:{status:"REJECTED"}});;


    res.status(200).json({ message: 'Listing rejected successfully', listing });
  } catch (error) {
    console.error('Error rejecting listing:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a listing
const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;
    const prisma = new PrismaClient()
    const listing = await prisma.listing.delete({where:{id}});



    res.status(200).json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Error deleting listing:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await user.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export {
  approveListing,
  rejectListing,
  deleteListing,
  deleteUser,
};
