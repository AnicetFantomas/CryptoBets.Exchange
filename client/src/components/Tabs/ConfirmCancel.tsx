import React, { useState } from 'react'
import { toast } from 'react-toastify'

export const ConfirmCancel = (props: any) => {
  const [position, setPosition] = useState([])

  const handleRemove = async (id: any) => {
    const url = `http://localhost:3002/api/activeOrder/${id}`
    console.log(url)
    try {
      await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      setPosition(position.filter((item: any) => item._id !== id))
    } catch (error) {
      console.error(error)
    }
    
    const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
      toast.promise(
        resolveAfter3Sec,
        {
          pending: 'Your order is being closed!',
          success: 'Your order has been closed successfully! 👌',
          error: 'Unable to create order 🤯'
        }
      )
  }


  return (

    <>
      <div className='flex w-full space-x-2'>
        <button onClick={() => {
          handleRemove(props.id)
          props.close()
        }} className='flex items-center justify-center flex-auto p-2 space-x-1 font-bold text-gray-200 bg-red-500 rounded'>CONFIRM</button>
      </div>
    </>
  )
}
