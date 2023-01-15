import axios from 'axios'
import React, { useState } from 'react'


export const LevDetails = (props: any) => {
    const [responseData, setResponseData] = useState({});
    
    const handlePlaceOrder = async () => {
        try {
            const response = await axios.post("http://localhost:3002/api/long", 
            {data: 'my data'});
            setResponseData(response.data);
            console.log(response.data)
        } catch (error) {
            console.log("Error Creating Order", error)
        }
    }
    
  

    return (
        <div className='flex flex-col w-full '>
            <div >
                <div className='flex justify-between w-full'>
                    <span className='text-white'>Available liquidity</span>
                    <span className='text-sky-500'>3,873.56</span>
                </div>
                <div className='flex justify-between w-full'>
                    <span className='text-white' >Leverage</span>
                    <span className='text-sky-500'>{props.sliderValue}x</span>
                </div>
                <div className='flex justify-between w-full'>
                    <span className='text-white'>Entry Price</span>
                    <span className='text-sky-500'>$16,048.21</span>
                </div>
                <div className='flex justify-between w-full'>
                    <span className='text-white'>Liq Price</span>
                    <span className='text-sky-500'>_</span>
                </div>
                <div className='flex justify-between w-full'>
                    <span className='text-white'>Fees</span>
                    <span className='text-sky-500'>_</span>
                </div>
            </div>
            <button onClick={handlePlaceOrder} className='p-3 my-5 text-xl text-white rounded-md bg-sky-500'>Place Order</button>
        </div>

    )
}
