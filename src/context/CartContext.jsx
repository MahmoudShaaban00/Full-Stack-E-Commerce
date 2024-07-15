import React from 'react'
import axios from "axios";
import { createContext } from "react";

 export let CartContext = createContext()
 
 export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem('userToken')
  }

    function getLoggedUserCart(){
     return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
      headers
      })
      .then((response)=> response)
      .catch((error)=> error)

    }

    function addProductToCart(productId){
     return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
        productId : productId
      },{
        headers
      })
      .then((response)=> response)
      .catch((error)=> error)

    }

    
    function deleteProductItem(productId){
      return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
         headers
       })
       .then((response)=> response)
       .catch((error)=> error)
 
     }

    function updateCartItemCount(productId ,count){
      return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
         count : count
       },{
         headers
       })
       .then((response)=> response)
       .catch((error)=> error) 
     }

     function deleteAll(productId ){
      return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
         headers
       })
       .then((response)=> response)
       .catch((error)=> error) 
     }

     function demandOrder(cartId,values ){
      return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
        shippingAddress:values,
      },{
         headers
       })
       .then((response)=> response)
       .catch((error)=> error) 
     }

   return <CartContext.Provider value={{  demandOrder , deleteProductItem , getLoggedUserCart ,  addProductToCart , updateCartItemCount , deleteAll}}>
    {props.children}
   </CartContext.Provider>
 }
 