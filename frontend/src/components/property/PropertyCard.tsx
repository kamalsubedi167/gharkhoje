import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import house from "../../assets/house.jpeg";
import { Link } from "react-router-dom";

interface Property{
    title:string,
    description:string,
    bedroom:number,
    price:number,
}

function PropertyCard({title,description,bedroom,price}:Property) {

  return (
    <Link to={"/property/id"}>
    <Card className="w-[300px] hover:scale-105 transition-transform cursor-pointer overflow-hidden">
    <CardHeader>
    <img className="h-[250px] rounded-lg" src={house} />
      <CardTitle>
        {title}
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
        <div className="details flex gap-6">
        <span>Rs. {price}</span>
        <span>Bed Room: {bedroom}</span>

        </div>
    </CardContent>
 
  </Card>

  </Link>

  )
}

export default PropertyCard
