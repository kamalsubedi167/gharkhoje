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
import { useEffect, useRef, useState } from "react";
import { useGetAllListingsQuery, useLazySearchListingQuery } from "@/api/apiSlice";
interface Property{
    id:string
    title:string,
    description:string,
    bedroom:number,
    price:number,
}


function ListProperty({isFocused}:{isFocused:boolean}) {

    const searchRef = useRef<HTMLInputElement>(null);

    const [searchText,setSearchText] = useState("");
    const [cityText,setCityText] = useState("");
    const [typeText,setTypeText] = useState("");
    const [price,setPrice] = useState("");

    // const {isError,isSuccess,isLoading,data:GharKhojeProperties} = useGetAllListingsQuery();
    const [search,{isError,isSuccess,isLoading,data:GharKhojeProperties}] = useLazySearchListingQuery();
    const [isSearchLoading,setSearchLoading]= useState(false)


    useEffect(()=>{
      search({});
    },[])


    async function handleSearch(){
      
      // alert(cityText)
        setSearchLoading(true)
        const res = await search({search:searchText,city:cityText,price:price,type:typeText=="any"? "":typeText }).unwrap();
        setSearchLoading(false)
        // var data =
        // console.log(res) 
        if(res==null)return;
    }//handleSearch

    useEffect(()=>{
      // if(searchText.length>2){
        handleSearch();
        // alert("Heell")
      // }
    },[searchText,cityText,typeText,price])


    useEffect(()=>{
      // console.log(isFocused);
      isFocused && searchRef.current?.focus();
    },[isFocused])

    

if(isLoading){
  return <div>Properties are Loading</div>
}
if(isError){
  return <div>Something went wrong while fetching properties</div>
}
  return (
    <div className="second p-10">

    <div className="search justify-center items-center flex gap-2">
      <Input value={searchText} onChange={(e)=>setSearchText(e.target.value)}  ref={searchRef} className="w-[30%]" placeholder="Search" />
      <Input className="w-[10%]" value={cityText}  onChange={(e)=>setCityText(e.target.value)} placeholder="City" />

    <Select onValueChange={(value)=>setTypeText(value)}>
        <SelectTrigger className="w-[180px] py-1 border rounded-sm">
          <SelectValue  className="text-black" placeholder="Type of property" />
          
        </SelectTrigger>
        <SelectContent >
          <SelectGroup >
            <SelectLabel>Property</SelectLabel>
            <SelectItem value="any">Any Property</SelectItem>
            {/* <SelectItem value="apple2">House</SelectItem>
            <SelectItem value="banana">Apartment</SelectItem> */}
            <SelectItem value="RENT">Rent</SelectItem>
            <SelectItem value="SELL">Sell</SelectItem>
            {/* <SelectItem value="pineapple">Swimming Pool</SelectItem> */}
          </SelectGroup>
        </SelectContent>
     

      </Select>
      <Select onValueChange={(value)=>setPrice(value)}>
        <SelectTrigger className="w-[180px] py-1 border rounded-sm">
          <SelectValue  className="text-black" placeholder="Price" />
          
        </SelectTrigger>
        <SelectContent >
          <SelectGroup >
            <SelectLabel>Price Range</SelectLabel>
            <SelectItem value="0-10000000000">Any Price</SelectItem>
            {/* <SelectItem value="apple2">House</SelectItem>
            <SelectItem value="banana">Apartment</SelectItem> */}
            <SelectItem value="0-1000000">0-TenLakh</SelectItem>
            <SelectItem value="1000000-10000000">10Lakh-1Cr</SelectItem>
            <SelectItem value="10000000-100000000">1Cr-10Cr</SelectItem>
            <SelectItem value="100000000-500000000">10Cr-50Cr</SelectItem>


            {/* <SelectItem value="pineapple">Swimming Pool</SelectItem> */}
          </SelectGroup>
        </SelectContent>
     

      </Select>

  
    </div>

    <h1 className="mt-10  mb-5"> {isSearchLoading ? "Searching...":"Latest Property"}</h1>
    <div className="list_parent flex gap-5 flex-wrap">
      
        
    {
        GharKhojeProperties?.map( (property)=>{
          
            return <PropertyCard  key={property.id} {...property} />
        })   
    }
    </div>

   

  </div>
  )
}

export default ListProperty
