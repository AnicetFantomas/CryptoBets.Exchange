import React from 'react'

export const ConfirmCancel = (props:any) => {
  return (
    <>
	<div className='flex w-full space-x-2'>
	  <button onClick={()=>{
        props.handleRemove()
        props.close()
      }} className='flex items-center justify-center font-bold text-gray-200 rounded flex-auto p-2 space-x-1 bg-red-500'>CONFIRM</button>
	</div>
	</>
  )
}
