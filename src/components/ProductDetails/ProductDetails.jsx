import React, { useEffect, useState } from 'react';
import Style from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Slider from "react-slick";

export default function ProductDetails() {

  let {id,category} = useParams()

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);


  function getProductDetails(id){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then(({data})=>{
      setProductDetails(data.data)
    })
    .catch(()=>{

    })
  }

  function getRelatedProducts(category){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then(({data})=>{
      let allProducts= data.data
      let related = allProducts.filter((product)=> product.category.name == category)
      setRelatedProducts(related)
    })
    .catch(()=>{

    })
  }
    useEffect(()=>{
      getProductDetails(id)
      getRelatedProducts(category)
    } , [id,category]);
    
  return <>
  <div className='row'>
    <div className='w-1/4'>
    <Slider {...settings}>
    
    {productDetails?.images.map((src)=> <img className='w-full' src={src} alt={productDetails?.title} /> )}
    </Slider>
    </div>
    <div className='w-3/4'>
    <h1 className='text-lg font-normal text-gray-950'>{productDetails?.title}</h1>
    <p className='text-gray-700 mt-4 font-light'>{productDetails?.description}</p>
    <div className='flex my-4 justify-between'>
            <span>{productDetails?.price} EGP</span>
            <span className='flex justfiy-between'>{productDetails?.ratingsAverage} 
              <span className='px-2 text-yellow-600'><FaStar /></span></span>
          </div>

          <button className='btn'>add to cart</button>
    </div>
  </div>

  <div className='row'>
    {relatedProducts.map((product)=>
    <div className='w-1/6' key={product.id}>
      <div className='product py-4'>
          <Link to={`/productdetails/${product.id}/${product.category.name}`}>
          
          <img className='w-full' src={product.imageCover} alt={product.title} />
          <span className='text-lg font-light text-green-600 mt-4'>{product.category.name}</span>
          <h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
          
          <div className='flex justify-between'>
            <span>{product.price} EGP</span>
            <span className='flex justfiy-between'>{product.ratingsAverage} <span className='px-2 text-yellow-600'><FaStar /></span></span>
          </div>

          <button className='btn'>add to cart</button>
          </Link>
        </div>
    </div>
    )}
  </div>
  </>
}
