import React, { useEffect, useState, useContext } from 'react';
import Style from './Home.module.css';
import { CounterContext } from '../../context/CounterContext';
import RecentProducts from '../RecentProducts/RecentProducts';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from "../MainSlider/MainSlider";


export default function Home() {
    useEffect(()=>{

    } , []);

    let {counter , userName , setCounter} = useContext(CounterContext)

  return <>
  <MainSlider/>
    <CategoriesSlider/>
  <RecentProducts/>
  </>
}
