import React from 'react'

export const LevDetails = () => {
    return (
        <div className=' w-full flex flex-col'>
            <div >
                <div className='flex w-full justify-between'>
                    <span className='text-white'>Available liquidity</span>
                    <span className='text-sky-500'>3,873.56</span>
                </div>
                <div className='flex w-full justify-between'>
                    <span className='text-white' >Leverage</span>
                    <span className='text-sky-500'>13.00x</span>
                </div>
                <div className='flex w-full justify-between'>
                    <span className='text-white'>Liq Price</span>
                    <span className='text-sky-500'>$16,048.21</span>
                </div>
            </div>
            <button className=' bg-sky-500 my-5 text-white text-xl p-3 rounded-md'>Place Order</button>
        </div>

    )
}
