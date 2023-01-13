import React, { useState } from 'react';
import { orders } from './positionsObj';
import { toast } from 'react-toastify';
import AppModal from '../GlobalModal/AppModal';
import { ConfirmCancel } from './ConfirmCancel';

const Orders = () => {
  const [myorders, setOrders] = useState(orders)


  const [id, setId] = useState(0)

  const handleRemove = (id: any) => {
    const newOrders = myorders.filter((order) => order.id !== id);
    setOrders(newOrders);
    toast.info('Order canceled')
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
              <div className=''>Status</div>
              <div className='pl-8 '>Side</div>
              <div className='pl-8 '>Price</div>
              <div className='pl-8 '>Amount</div>
              <div className='pl-8'></div>
            </div>

            {
              myorders.length === 0 ? <div className='text-xl font-bold text-red-600'><td>No order yet !</td></div> :
                myorders.map(order =>
                  <div key={order.id} className='text-gray-500 my-0.5 w-full grid gap-4 grid-cols-5 items-center hover:text-gray-200'>
                    <div className=''>Market</div>
                    <div className='pl-8 '>Buy</div>
                    <div className='pl-8 '>Market</div>
                    <div className='pl-8 '>${order.currentPNL}</div>
                    <div className='pl-8 '><button onClick={() => handleCancel(order.id)} className='p-2 my-2 font-semibold text-gray-200 transition duration-500 bg-red-500 rounded-lg hover:bg-slate-700'>Close</button></div>
                  </div>)
            }
          </div>
        </div>
      </div>
    </>

  )
}


export default Orders;