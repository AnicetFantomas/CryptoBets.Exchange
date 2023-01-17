import React, { useState } from 'react'


export const LevDetails = (props: any) => {


    return (
        <div className=' w-full flex flex-col'>
            <div >
                <div className='flex w-full justify-between'>
                    <span className='text-white'>Available liquidity</span>
                    <span className='text-sky-500'>3,873.56</span>
                </div>
                <div className='flex w-full justify-between'>
                    <span className='text-white' >Leverage</span>
                    <span className='text-sky-500'>{props.sliderValue}x</span>
                </div>
                <div className='flex w-full justify-between'>
                    <span className='text-white'>Entry Price</span>
                    <span className='text-sky-500'>$ 16,048.21</span>
                </div>
                <div className='flex w-full justify-between'>
                    <span className='text-white'>Liq Price</span>
                    <span className='text-sky-500'>$ {props.result}</span>
                </div>
                <div className='flex w-full justify-between'>
                    <span className='text-white'>Fees</span>
                    <span className='text-sky-500'>_</span>
                </div>
            </div>
            <button className=' bg-sky-500 my-5 text-white text-xl p-3 rounded-md'>Place Order</button>
        </div>

    )
}
