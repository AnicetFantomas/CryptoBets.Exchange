import React from 'react'

export const LevDetails = () => {
    return (
        <div className=' w-full flex flex-col'>
            <div >
                <div className='flex w-full justify-between'>
                    <span>Available liquidity</span>
                    <span className='text-blue-500'>3,873.56</span>
                </div>
                <div className='flex w-full justify-between'>
                    <span >Leverage</span>
                    <span className='text-blue-500'>13.00x</span>
                </div>
                <div className='flex w-full justify-between'>
                    <span>Liq Price</span>
                    <span className='text-blue-500'>$16,048.21</span>
                </div>
            </div>
            <button className=' bg-blue-400 my-5 text-xl p-3 rounded-md'>Place Order</button>
        </div>

    )
}
