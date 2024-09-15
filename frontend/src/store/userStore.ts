import { useState } from "react";
import { create } from "zustand";

interface UserInterface{
    token:string|null|undefined,
    setToken:(token:string|null|undefined)=>void,
    id:string|null,
    setId:(id:string|null)=>void,
}

function storeTokenToLocal(token:string){
    if(token==null){
        localStorage.removeItem('token');
    }
    else{
        localStorage.setItem("token",token);
    }
}

function storeIDToLocal(id:string){
    if(id==null){
        localStorage.removeItem('id');
    }
    else{
        localStorage.setItem("id",id);
    }
}

function readToken(){
    return localStorage.getItem("token");
}

function readId(){
    return localStorage.getItem("id");
}


const userStore = create<UserInterface>((set)=>({
        id:readId(),
        token:readToken(),

        setToken(token){

            set(state=>{
                storeTokenToLocal(token);
                return {token};
            })//set

        },//setToken


        setId(id) {
            set(state=>{
                storeIDToLocal(id);
                return {id};
            })//set
        },
    }))


export {userStore};
