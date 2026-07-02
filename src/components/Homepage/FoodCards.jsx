import React from 'react'
import { useEffect,useState } from 'react'
import { getDATA } from '../../FetchBackend'
const FoodCards = () => {
const [products, setProducts] = useState([])

  var fetchproducts = async()=>{
    var res = await getDATA("api/products")
    var result = res.products
    console.log("Products fetched from backend:", result)
    setProducts(result)
  }

  useEffect(()=>{
    fetchproducts()
  },[])



  var Foodcards = ()=>{
    return(
      <>
         {products.map((product) => (
          <div key={product.id} className='bg-white h-[40vh] w-[60vw] p-4 rounded-lg shadow-md'>
            <h3 className='text-lg font-bold'>{product.name}</h3>
            <p className='text-gray-600'>{product.description}</p>
            <p className='text-xl font-bold'>${product.price}</p>
          <img src={product.image_url} alt={product.name} className='w-full h-32 object-cover mt-2 rounded-md' />
          </div>
        ))}
      </>
    )
  }

  return (
    <div className='w-[95%] md:w-[90%] h-[30vh] md:h-[40vh] flex flex-col  gap-3 items-center bg-amber-300 justify-around'>
      {Foodcards()}
    </div>
  )
}

export default FoodCards
