import React, { useContext, useEffect, useState } from 'react';
import Style from './Cart.module.css';
import { CartContext } from '../../context/CartContext';
import { useFormik } from 'formik';



export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null)

  let { demandOrder, deleteProductItem, getLoggedUserCart, updateCartItemCount, deleteAll } = useContext(CartContext)

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    onSubmit: createOrder
  });

  async function createOrder(cartId, values) {
    let response = await demandOrder(cartId, values)
    console.log(response)
    console.log(cartId)
    console.log(values)
  }


  async function getCartItems() {

    let response = await getLoggedUserCart()
    console.log(response.data.data)
    setCartDetails(response.data.data)
  }


  async function deleteProducts() {

    let response = await deleteAll()
    //console.log(response.data.data)
    setCartDetails(response.data.data)
  }

  async function deleteProduct(productId) {

    let response = await deleteProductItem(productId)
    //console.log(response.data.data)
    setCartDetails(response.data.data)
  }

  async function getUpdateCartCount(productId, count) {

    let response = await updateCartItemCount(productId, count)
    //console.log(response.data.data)
    setCartDetails(response.data.data)
  }

  useEffect(() => {
    getCartItems();
  }, []);
  return <>

    <div>
      <div className="relative overflow-x-auto  sm:rounded-lg">
        <h2 className='text-3xl text-center text-green-500 py-6'>Shopping Cart</h2>
        <h3 className='text-center text-lg font-light text-slate-600'>Total Cart Price :{cartDetails?.totalCartPrice} EGP</h3>
        <table className="w-3/4 mx-auto my-6 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                puyment
              </th>
            </tr>
          </thead>
          <tbody>
            {cartDetails?.products.map((product) =>
              <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">
                  <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.product.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button onClick={() => getUpdateCartCount(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                      <span className="sr-only">Quantity button</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                      </svg>
                    </button>
                    <div>
                      <span>{product.count}</span>
                    </div>
                    <button onClick={() => getUpdateCartCount(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                      <span className="sr-only">Quantity button</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  <span>{product.price} GEP</span>
                </td>
                <td className="px-6 py-4">
                  <span onClick={() => deleteProduct(product.product.id)} className=" cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
                </td>
                <td className="px-6 py-4">



                  <form onSubmit={formik.handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="details" id='details' value={formik.values.details} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Details</label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" name="phone" id='phone' value={formik.values.phone} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Phone</label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="city" id='city' value={formik.values.city} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                      <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter City</label>
                    </div>
                    <span onClick={() => createOrder(product._id)} type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</span>
                  </form>

                </td>
              </tr>
            )}
            <span onClick={() => deleteProducts()} style={{ display: 'block', marginLeft: '450px', backgroundColor: '#06a94d', color: 'white', marginTop: '20px', padding: '7px', borderRadius: '6px' }}>DeleteAllProducts</span>
          </tbody>

        </table>
      </div>

    </div>


  </>
}
