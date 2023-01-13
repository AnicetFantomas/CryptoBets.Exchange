import React from 'react'

 const OrdersHist = () => {
  return (
    <div className='flex justify-center'>
    <div className='flex flex-col w-full'>
    <div className='text-xl font-bold text-red-600'><td>No open trades yet !</td></div>
      {/* <table className='text-gray-200 '>
        <tbody>
          <tr className='mb-6 font-bold text-center '>
            <td className=' whitespace-nowrap'>absol Pnl</td>
            <td className='pl-8 whitespace-nowrap'>perc Pnl</td>
            <td className='pl-8 whitespace-nowrap'>absol Rank</td>
            <td className='pl-8 whitespace-nowrap'>perc Rank</td>
            <td className='pl-8 whitespace-nowrap'>start At</td>
            <td className='pl-8 whitespace-nowrap'>end edAt</td>
          </tr>
            
                <tr className='text-gray-500 my-0.5 text-center hover:text-gray-200'>
                  <td className='whitespace-nowrap '>100.0</td>
                  <td className='pl-8 whitespace-nowrap'>100.0</td>
                  <td className='pl-8 whitespace-nowrap'>10</td>
                  <td className='pl-8 whitespace-nowrap'>10</td>
                  <td className='pl-8 whitespace-nowrap'>2021-08-01</td>
                  <td className='pl-8 whitespace-nowrap'>2021-08-01</td>
                </tr>

        </tbody>
      </table> */}
    </div>
  </div>
  )
}

export default OrdersHist;