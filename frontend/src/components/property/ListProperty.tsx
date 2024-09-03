import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
  } from "../ui/select";
  import { SelectTrigger, SelectValue } from "@radix-ui/react-select";
  import PropertyCard from "./PropertyCard";
import { Input } from "../ui/input";
import { useEffect, useRef } from "react";

interface Property{
    title:string,
    description:string,
    bedroom:number,
    price:number,
}


function ListProperty({isFocused}:{isFocused:boolean}) {

    const searchRef = useRef<HTMLInputElement>(null);
  
    useEffect(()=>{
      console.log(isFocused);
      isFocused && searchRef.current?.focus();
    },[isFocused])

    const properties:Property[] = [
    {
        title:"Beatiful home",
        price:45000,
        bedroom:100,
        description:"This is teh beautiful house of my lfie"
    },
    {
        title:"Beatiful home",
        price:45000,
        bedroom:100,
        description:"This is teh beautiful house of my lfie"
    },
    {
        title:"Beatiful home",
        price:45000,
        bedroom:100,
        description:"This is teh beautiful house of my lfie"
    },
    {
        title:"Beatiful home",
        price:45000,
        bedroom:100,
        description:"This is teh beautiful house of my lfie"
    },
    {
        title:"Beatiful home",
        price:45000,
        bedroom:100,
        description:"This is teh beautiful house of my lfie"
    },
    {
        title:"Beatiful home",
        price:45000,
        bedroom:100,
        description:"This is teh beautiful house of my lfie"
    },

]

  return (
    <div className="second p-10">

    <div className="search justify-center items-center flex gap-2">
      <Input  ref={searchRef} className="w-[30%]" placeholder="Search" />
      <Input className="w-[10%]" placeholder="City" />

      <Select>
        <SelectTrigger className="w-[180px] py-1 border rounded-sm">
          <SelectValue placeholder="Type of property" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Property</SelectLabel>
            <SelectItem value="apple">Any Property</SelectItem>
            <SelectItem value="apple2">House</SelectItem>
            <SelectItem value="banana">Apartment</SelectItem>
            <SelectItem value="blueberry">Rent</SelectItem>
            <SelectItem value="grapes">Room</SelectItem>
            <SelectItem value="pineapple">Swimming Pool</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

  
    </div>

    <h1 className="mt-10  mb-5">Latest Property</h1>
    <div className="list_parent flex gap-5 flex-wrap">
        
    {
        properties.map( (property,index)=>{
            return <PropertyCard key={index} bedroom={property.bedroom} description={property.description} title={property.title} price={property.price} />
        })   
    }
    </div>

   

  </div>
  )
}

export default ListProperty
