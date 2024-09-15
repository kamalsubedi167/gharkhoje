import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useGetListingByIdQuery,useGetUserQuery, useRecommendQuery } from '@/api/apiSlice';
import { NavLink, useParams } from 'react-router-dom';
import PropertyCard from '../property/PropertyCard';



const PropertyDetail1 = () => {
  const [showContact, setShowContact] = useState(false);
  const {id}=useParams()
  const [showChat, setShowChat] = useState(false);
  const [modalImage, setModalImage] = useState(null); // State for modal image
  // alert(id)
  const {data:listings} = useRecommendQuery(id as string);

  const {isError,isLoading,isSuccess,data:listing= []} = useGetListingByIdQuery(id as string);
  const {data:user} = useGetUserQuery("");
  const [currentImage, setCurrentImage] = useState(0); // State for current image in the slider
  // const images = [...Array(10)].map((_, idx) => `https://via.placeholder.com/600x400?text=Photo+${idx + 1}`);
  const images = listing?.photos?.map(photo=>"http:///localhost:3000/uploads/"+photo) ?? [];

  const toggleContactPopup = () => setShowContact(!showContact);
  const toggleChat = () => setShowChat(!showChat);

  const handlePrevImage = () => {
    if(images.length!=0)
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if(images.length!=0)
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  //modal image enlarge

  const openModal = (imageSrc: React.SetStateAction<null>) => {
    setModalImage(imageSrc);
  };

  const closeModal = () => {
    setModalImage(null);
  };
 if (isError){
  return  <div>Something went wrong Loading singlepage</div>

 }
 if(isLoading)
  return <div>Loading</div>
  return ( 
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto p-4">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-6">
          {/* Image Slider */}
          <div className="relative mb-6">
            <img src={images[currentImage]} alt={`Photo ${currentImage + 1}`} className="w-full object-cover h-64 rounded-lg"  onClick={() => openModal(images[currentImage])}/>
            
            {/* Arrows for Image Slider */}
            <button onClick={handlePrevImage} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-600 bg-opacity-50 text-white px-2 py-1 rounded-l-lg">&lt;</button>
            <button onClick={handleNextImage} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-600 bg-opacity-50 text-white px-2 py-1 rounded-r-lg">&gt;</button>

            {/* Share Button */}
            <button className="absolute top-2 right-2 bg-gray-600 bg-opacity-50 text-white px-2 py-1 rounded-lg"></button>
          </div>

          {/* Property Info */}
          <h1 className="text-3xl font-bold mb-2">{listing?.name}</h1>
          <p className="text-lg mb-4">{listing?.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p><strong>Bedrooms:</strong>{listing?.beds}</p>
              <p><strong>Bathrooms:</strong>{listing?.baths}</p>
              <p><strong>Adress: </strong>{listing?.address}</p>
              {/* <p><strong>Furnished?: </strong>{listing?.furnished ? 'Included' : 'Not Included'}</p>
              <p><strong>Parking Spot?: </strong>{listing?.parkingSpot ? 'Included' : 'Not Included'}</p> */}
              <p><strong>Type: </strong>{listing?.type}</p>
              
       





            </div>
            <div>
              <p className="font-bold text-xl text-yellow-500">Price: Rs {listing?.price}</p>
            </div>
          </div>

          {/* Buttons  this one is to redirect user to seller's profile */}
          <div className="flex gap-4 mt-4">
            <NavLink to={"/profile/"+listing?.userId} className="mr-4 hover:text-gray-400 cursor-pointer">

            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">About Seller</button></NavLink>
            <NavLink to={"/messages/"+listing?.userId} className="mr-4 hover:text-gray-400 cursor-pointer">

            <button onClick={toggleChat} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Message Seller</button></NavLink>

          </div>

         {/* Modal for enlarge images */}
          {modalImage && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center" onClick={closeModal}>
            <img src={modalImage} alt="Enlarged" className="max-w-full max-h-full object-contain" />
          </div>
        )}

          
        </div>
        <h1 className='text-2xl font-bold'>Similar Posts</h1>

        <div className="lists border flex gap-5 flex-wrap">
        {
          listings?.map(property=>{
            if(property.id !=id)
            return <PropertyCard {...property} />
          })
        }
        </div>
      

      </div>
    </div>
  );
};

export default PropertyDetail1;


