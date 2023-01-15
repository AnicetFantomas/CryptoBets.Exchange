import React, { useState } from 'react';
import { orders } from './positionsObj';
import { toast } from 'react-toastify';
import AppModal from '../GlobalModal/AppModal';
import { ConfirmCancel } from './ConfirmCancel';

const Orders = () => {
  const [myPositions, setPositions] = useState(orders)


  const [id, setId] = useState(0)

  const handleRemove = (id: any) => {
    const newOrders = myPositions.filter((position) => position.id !== id);
    setPositions(newOrders);
    toast.info('Position closed')
  }

  const [show, setShow] = useState(false)

  const handleCancel = (id: any) => {
    setId(id)
    setShow(true)
  }



  return (
    <>
      <AppModal show={show} close={() => setShow(false)} title='Do you want to close this position ?'><ConfirmCancel close={() => setShow(false)} handleRemove={() => handleRemove(id)} /></AppModal>
      <div className='flex justify-center w-full'>
        <div className='flex flex-col w-full'>

          <div className='flex flex-col w-full text-gray-200 '>

            {
              myPositions.length === 0 ? <div className='text-xl font-bold text-red-600'><td>No open positions yet !</td></div> :
                myPositions.map(position =>

                  <table className='text-gray-200 '>
                    <tbody>
                      <tr className='mb-6 font-bold text-center '>
                        <td className=' whitespace-nowrap'>Position</td>
                        <td className='pl-8 whitespace-nowrap'>Net Value</td>
                        <td className='pl-8 whitespace-nowrap'>Size</td>
                        <td className='pl-8 whitespace-nowrap'>Collateral</td>
                        <td className='pl-8 whitespace-nowrap'>Mark Price</td>
                        <td className='pl-8 whitespace-nowrap'>Entry Price</td>
                        <td className='pl-8 whitespace-nowrap'>Liq. Price</td>
                      </tr>

                      <tr className='text-gray-500 my-0.5 text-center hover:text-gray-200'>
                        <td className='whitespace-nowrap '>100.0</td>
                        <td className='pl-8 whitespace-nowrap'>100.0</td>
                        <td className='pl-8 whitespace-nowrap'>10</td>
                        <td className='pl-8 whitespace-nowrap'>10</td>
                        <td className='pl-8 whitespace-nowrap'>12</td>
                        <td className='pl-8 whitespace-nowrap'>30.9</td>
                        <td className='pl-8 whitespace-nowrap'>30.9</td>
                        <td className='pl-8 '><button onClick={() => handleCancel(position.id)} className='p-2 my-2 font-semibold text-gray-200 transition duration-500 bg-red-500 rounded-lg hover:bg-slate-700'>Close</button></td>
                      </tr>

                    </tbody>
                  </table>

                )

            }
          </div>
        </div>
      </div>
    </>

  )
}


export default Orders;