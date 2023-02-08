import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AppModal from '../GlobalModal/AppModal'
import { ConfirmCancel } from './ConfirmCancel'

const Orders = (props: any) => {
  const [show, setShow] = useState(false)
  const [id, setId] = useState(0)
  const [allOrders, setAllOrders] = useState([]);

  const getUrl = 'http://localhost:3002/api/orders'

  const handleCancel = (id: any) => {
    setId(id)
    setShow(true)
  }

  const getOrders = async () => {
    try {
      const response = await fetch(getUrl)
      const data = await (await response).json()
      setAllOrders(data)
    } catch (error) {
      console.error(error)
    }

    
  }

  console.log(allOrders);

  useEffect(() => {
    getOrders()
  }, []);

  return (
    <>
      <AppModal
        show={show}
        close={() => setShow(false)}
        title="Do you want to close this position ?"
      >
        <ConfirmCancel id={id} close={() => setShow(false)} />
      </AppModal>
      <div className="flex justify-center w-full">
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full text-gray-200 ">
            {allOrders.length === 0 ? (
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

                  {allOrders.map((position: any) => (
                    <tr
                      key={position._id}
                      className="text-gray-500 my-0.5 text-center hover:text-gray-200"
                    >
                      <td className="whitespace-nowrap ">
                        {position.amountIn}
                      </td>
                      <td className="pl-8 whitespace-nowrap">
                        {position.sizeDelta}
                      </td>
                      <td className="pl-8 whitespace-nowrap">
                       $ {(position.acceptablePrice * Math.pow(10, -18)).toFixed(2)}
                      </td>
                      <td className="pl-8 ">
                        <button
                          onClick={() => handleCancel(position._id)}
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
