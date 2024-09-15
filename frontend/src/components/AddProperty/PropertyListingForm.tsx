import React, { useState, useEffect } from 'react';
import { XCircle, Upload } from 'lucide-react';
import axios from 'axios';
import { userStore } from '@/store/userStore';
import { useCreateListingMutation, useGetAllListingsQuery, useUpdateListingMutation, useDeleteListingMutation, useListListingsQuery } from '@/api/apiSlice';
import { Listing } from '@/api/apiSlice';
import { useNavigate } from 'react-router-dom';


const PropertyListingForm = () => {

  
  const [listing, setListing] = useState<Listing>({
    name: '',
    description: '',
    address: '',
    type: 'SELL',
    parkingSpot: false,
    furnished: false,
    beds: "0",
    baths: "0",
    price: "0",
    photos: [],
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  // const [file, setFile] = useState();
  const navigate = useNavigate()




  // const [uploadFiles] = useUploadFilesMutation();
  const [createListing,{isError,isSuccess,isLoading}] = useCreateListingMutation();



  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const data = new FormData();
    // data.append("fi",e.target.files[0] );
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 10);
      setSelectedFiles(filesArray);
    }
  };




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    // data.append('id', listing.id);
 // Append images if any
 if (listing.photos) {
  Array.from(listing.photos).forEach(file => {
    data.append('images', file);
  });
}
    data.append('name', listing.name);
    data.append('description', listing.description);
    data.append('address', listing.address);
    data.append('type', listing.type);
    data.append('parkingSpot', listing.parkingSpot + '');
    data.append('furnished', listing.furnished + '');
    data.append('beds', listing.beds + '');
    data.append('baths', listing.baths + '');
    data.append('price', listing.price + '');
// 
try {
  const result = await createListing(data).unwrap(); // Use unwrap() for RTK Query
  // console.log('Property added:', result);
} catch (error) {
  console.error('Error:', error);
}

  };

  if(isSuccess){
      navigate("/")
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black mb-4 sm:mb-0">GharKhojeProperties</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto">Add Property</button>
      </div>
      <form onSubmit={handleSubmit}  action='http://localhost:3000/api/listing' method='POST' className="space-y-6" encType="multipart/form-data">
        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="name"
                value={listing.name}
                onChange={(e) => setListing({ ...listing, name: e.target.value })}
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>
            <div className="w-full px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={listing.description}

                onChange={(e) => setListing({ ...listing, description: e.target.value })}
                className="w-full p-2 border rounded text-black"
                rows={3}
                required
              />
            </div>
            <div className="w-full px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={listing.address}
                onChange={(e) => setListing({ ...listing, address: e.target.value })}
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full sm:w-1/2 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="type"
                    value="SELL"
                    checked={listing.type === 'SELL'}
                    onChange={(e) => setListing({ ...listing, type: e.target.value == "SELL" ? "SELL" : "RENT" })}

                    className="form-radio"
                  />
                  <span className="text-black">Sell</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="type"
                    value="RENT"
                    checked={listing.type === 'RENT'}
                    onChange={(e) => setListing({ ...listing, type: e.target.value == "SELL" ? "SELL" : "RENT" })}

                    className="form-radio"
                  />
                  <span className="text-black">Rent</span>
                </label>
              </div>
            </div>
            <div className="w-full sm:w-1/4 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Parking spot</label>
              <input
                type="checkbox"
                name="parkingSpot"
                checked={listing.parkingSpot}
                onClick={(e) => setListing({ ...listing, parkingSpot: e.target.checked })}

                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
            <div className="w-full sm:w-1/4 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Furnished</label>
              <input
                type="checkbox"
                name="furnished"
                checked={listing.furnished}
                onClick={(e) => setListing({ ...listing, furnished: e.target.checked })}

                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full sm:w-1/3 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Beds</label>
              <input
                type="number"
                name="beds"
                value={listing.beds}
                onChange={(e) => setListing({ ...listing, beds: e.target.value })}

                className="w-full p-2 border rounded text-black"
                min="0"
                required
              />
            </div>
            <div className="w-full sm:w-1/3 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Baths</label>
              <input
                type="number"
                name="baths"
                value={listing.baths}
                onChange={(e) => setListing({ ...listing, baths: e.target.value })}

                className="w-full p-2 border rounded text-black"
                min="0"
                required
              />
            </div>
            <div className="w-full sm:w-1/3 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={listing.price}
                onChange={(e) => setListing({ ...listing, price: e.target.value })}

                className="w-full p-2 border rounded text-black"
                min="0"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Photos</label>
            <input
              type="file"
              name='images'
              accept='images/*'
              multiple
              onChange={(e) => setListing({ ...listing, photos: e.target.files })}

              className="mb-2"
            />
        
          </div>
          <button
          disabled={isLoading}
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyListingForm;







