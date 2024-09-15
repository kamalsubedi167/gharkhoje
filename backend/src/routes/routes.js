import express from "express";
// import { verifyToken } from "../helpers/verifyToken";
import { login, register } from "../controllers/authController.js";
import { verifyToken } from "../helpers/verifyToken.js";
import { getUser } from "../controllers/userController.js";
import {updateUserProfile } from "../controllers/profileContorller.js"
import {deleteUser,rejectListing,approveListing} from "../controllers/adminController.js"
import { sendMessage,getChattedUsers,getMessages } from "../controllers/messageController.js";
import {  createListing,getListings,getListingById,updateListing,deleteListing, getListingByUserId, searchListings, getMyAllProperties, deleteMyProperty} from "../controllers/listingController.js" //changed after snts
import upload from "../helpers/upload.js";
import multer from "multer";
import { recommend } from "../controllers/recommendController.js";

const router = express.Router();

router.post('/auth/register',register);
router.post('/auth/login',login);


router.get("/user/:id?",verifyToken,getUser);


router.post("/message/send",verifyToken,sendMessage);

router.get("/message/users",verifyToken,getChattedUsers);
router.post("/message/get",verifyToken,getMessages);

// const upload2 = multer({ dest: 'public/' })
//changed after snts
router.post('/listing',verifyToken,upload.array('images',10), createListing);

router.get('/listings/get', getListings);

router.get('/listings/search', searchListings);
router.get('/my_listings',verifyToken, getMyAllProperties);
router.post('/delete_listing',verifyToken, deleteMyProperty);

router.get('/listing/:id', getListingById)
router.get('/listing/user/:userId', getListingByUserId)
;

router.get('/recommend/:id', recommend)


// Route to update user profile
router.post('/user/profile',verifyToken,upload.single("avatar"), updateUserProfile);


// router.put('/listing/update/:id', updateListing);
router.delete('/listing/delete/:id', deleteListing);
// 

//admin pannel routes 

// Route to approve a listing
router.post('/admin/listings/:id/approve', approveListing);

// Route to reject a listing
router.post('/admin/listings/:id/reject', rejectListing);

// Route to delete a listing
// router.post('/admin/listings/:id', deleteListing);

// Route to delete a user
router.post('/users/:id', deleteUser);

export default router;