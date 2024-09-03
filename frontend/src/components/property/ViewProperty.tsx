import React from 'react'
import { useParams } from 'react-router-dom'
import hosue from './../../assets/house.jpeg';
import { Button } from '../ui/button';

function ViewProperty() {
    const {id} = useParams();
  return (
    <div className='px-32'>
        <div className="images flex justify-center items-center">
         <img className='h-[300px] w-[70%] object-cover' src={hosue}/>
        </div>

        <div className="col2 flex">
            <div className="col w-1/2">
                <div>Title {id}</div>
                <div>Description</div>
                <div>Price</div>
                <div>Location</div>
                <div>Price</div>
                <div>BedRoom</div>
            </div>
            <div className="col w-1/2">
                    Here we will use maps.
            </div> 
        </div>

        <div className="link border-t flex gap-10 mt-10">
                <Button>Book Property</Button>
                <Button>Visit User Profile</Button>
                <Button>Message</Button>
            </div>

    </div>
  )
}

export default ViewProperty
