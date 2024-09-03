import { useState } from "react";
import { create } from "zustand";

interface UserInterface{
    token:string|null,
    setToken:(token:string)=>void,
    id:string|null,
    setId:(id:string)=>void,
}

function storeTokenToLocal(token:string){
    localStorage.setItem("token",token);
}

function storeIDToLocal(id:string){
    localStorage.setItem("id",id);
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
