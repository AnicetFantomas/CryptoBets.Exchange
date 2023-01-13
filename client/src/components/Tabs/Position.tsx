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
    toast.info('Position closed!')
  }

  const [show, setShow] = useState(false)

  const handleCancel = (id: any) => {
    setId(id)
    setShow(true)
  }



  return (
    <>
      <AppModal show={show} close={() => setShow(false)} title='Do you want to close this position ?'><ConfirmCancel close={() => setShow(false)} handleRemove={() => handleRemove(id)} /></AppModal>
      <div className='flex justify-center'>
        <div className='flex flex-col w-full'>

          <div className='flex flex-col w-full text-gray-200 '>

            <div className='grid w-full grid-cols-5 gap-4 font-bold '>
              <div className=''>Position</div>
              <div className='pl-8 '>Net Value</div>
              <div className='pl-8 '>Size</div>
              <div className='pl-8 '>Collateral</div>
              <div className='pl-8 '>Mark Price</div>
              <div className='pl-8 '>Entry Price</div>
              <div className='pl-8 '>Liq. Price</div>
              <div className='pl-8'></div>
            </div>

            {
              myPositions.length === 0 ? <div className='text-xl font-bold text-red-600'><td>No open positions yet !</td></div> :
              myPositions.map(position =>
                  <div key={position.id} className='text-gray-500 my-0.5 w-full grid gap-4 grid-cols-5 items-center hover:text-gray-200'>
                    <div className=''>Market</div>
                    <div className='pl-8 '>Buy</div>
                    <div className='pl-8 '>Market</div>
                    <div className='pl-8 '>${position.currentPNL}</div>
                    <div className='pl-8 '><button onClick={() => handleCancel(position.id)} className='p-2 my-2 font-semibold text-gray-200 transition duration-500 bg-red-500 rounded-lg hover:bg-slate-700'>Close</button></div>
                  </div>)
            }
          </div>
        </div>
      </div>
    </>

  )
}


export default Orders;