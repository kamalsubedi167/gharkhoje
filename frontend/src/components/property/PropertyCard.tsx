import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import house from "../../assets/house.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { ListingResponse } from "@/api/apiSlice";
import { nanoid } from "@reduxjs/toolkit";

interface Property{
    id: string
    title:string,
    description:string,
    bedroom:number,
    price:number,
}

function PropertyCard({id,name,description,beds,photos,address,baths,furnished,parkingSpot,type,price}:ListingResponse) {
    const navigate = useNavigate();

  return (
    // <Link to={"/property/"+id}>
    <a href={"/property/"+id }>

    <Card  className="w-[500px] hover:scale-105 transition-transform cursor-pointer overflow-hidden">
    <CardHeader>
   
    <img className="h-[300px] rounded-lg" src={ (photos && photos?.length>0) ? 'http://localhost:3000/uploads/'+photos[0] : house } />
      <CardTitle>
        {name}
      </CardTitle>
      <CardDescription>{description.substring(0,50)+"..."}</CardDescription>
    </CardHeader>
    <CardContent>
        <div className="details flex gap-6">
        <span>Rs. {price}</span>
        <span>Bed Room: {beds}</span>
     

        </div>
        <span>Addr: {address}</span>

    </CardContent>
 
  </Card>
  </a>


  // </Link>

  )
}

export default PropertyCard
