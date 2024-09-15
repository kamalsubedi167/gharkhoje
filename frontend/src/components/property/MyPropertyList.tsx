
import {  useDeleteListingMutation, useDeleteMyListingMutation, useGetAllMyListingsQuery, useLoginMutation } from "@/api/apiSlice";
import ListProperty from './ListProperty';
import PropertyCard from "./PropertyCard";
import { Button } from "../ui/button";





const PropertyList = () => {


        const [deleteListing] = useDeleteMyListingMutation();
        const {isError,isLoading,isSuccess,data:listings} = useGetAllMyListingsQuery();



  if(isLoading){
    return <div>Search Properties are Loading</div>
  }
  if(isError){
    return <div>Somethig went wrong while fetching search properties</div>
  }

  return (
    <div className="p-8 ">
      <h1 className="text-3xl text-black bg-gray-200 font-bold text-center mb-8">My Listings</h1>

 

      {/* Property Cards */}
      <div className="grid grid-cols-2s  gap-8 md:grid-cols-2 lg:grid-cols-2">
        {listings?.length ?? -2 > 0 ? (
          listings?.map((property) => (
            <div className="div">
            <PropertyCard key={property.id} {...property} />
              <Button onClick={()=>  deleteListing({id:property.id} )  } className="mt-10">Delete</Button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No properties match your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
