import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AppModal from '../GlobalModal/AppModal'
import { ConfirmCancel } from './ConfirmCancel'

const Orders = (props: any) => {
  const myPositions = props.data
  const [show, setShow] = useState(false)
  const [id, setId] = useState(0)

  console.log('This is the data from the orders component: ', myPositions)

  const handleCancel = (id: any) => {
    setId(id)
    setShow(true)
  }

  return (
    <>
      <AppModal
        show={show}
        close={() => setShow(false)}
        title="Do you want to close this position ?"
      >
        <ConfirmCancel close={() => setShow(false)} />
      </AppModal>
      <div className="flex justify-center w-full">
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full text-gray-200 ">
            {myPositions.length === 0 ? (
              <div className="text-xl font-bold text-red-600">
                No open positions yet !
              </div>
            ) : (
              <table className="text-gray-200 ">
                <tbody>
                  <tr className="mb-6 font-bold text-center ">
                    <td className=" whitespace-nowrap">Position</td>
                    <td className="pl-8 whitespace-nowrap">Size</td>
                    <td className="pl-8 whitespace-nowrap">Entry Price</td>
                  </tr>

                  {myPositions.map((position: any) => (
                    <tr
                      key={position._id}
                      className="text-gray-500 my-0.5 text-center hover:text-gray-200"
                    >
                      <td className="whitespace-nowrap ">
                        {position._amountIn}
                      </td>
                      <td className="pl-8 whitespace-nowrap">
                        {position._sizeDelta}
                      </td>
                      <td className="pl-8 whitespace-nowrap">
                        {position._acceptablePrice * Math.pow(10, -40)}
                      </td>
                      <td className="pl-8 ">
                        <button
                          onClick={() => handleCancel(position.id)}
                          className="p-2 my-2 font-semibold text-gray-200 transition duration-500 bg-red-500 rounded-lg hover:bg-slate-700"
                        >
                          Close
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Orders
