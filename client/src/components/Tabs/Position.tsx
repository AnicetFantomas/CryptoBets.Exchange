// Orders.js
import React, { useEffect, useState } from 'react';
import AppModal from '../GlobalModal/AppModal';
import { ConfirmCancel } from './ConfirmCancel';

const Orders = (props: any) => {
  const [show, setShow] = useState(false);
  const [id, setId] = useState(0);
  const [allOrders, setAllOrders] = useState([]);
  const [shouldFetchOrders, setShouldFetchOrders] = useState(false);

  const getUrl = 'http://localhost:3002/api/orders';

  const handleCancel = (id: any) => {
    setId(id);
    setShow(true);
  };

  const handleDeleteOrder = (id: any) => {
    setAllOrders(allOrders.filter((order: any) => order._id !== id));
  };

  const getOrders = async () => {
    try {
      const response = await fetch(getUrl);
      const data = await response.json();
      setAllOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (shouldFetchOrders) {
      getOrders();
      setShouldFetchOrders(false);
    }
  }, [shouldFetchOrders]);

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    // Perform any necessary actions with the updated orders
    console.log('Updated orders:', allOrders);
  }, [allOrders]);

  const updateOrders = () => {
    setShouldFetchOrders(true);
  };

  return (
    <>
      <AppModal
        show={show}
        close={() => setShow(false)}
        title="Do you want to close this position ?"
      >
        <ConfirmCancel id={id} close={() => setShow(false)} onDeleteOrder={handleDeleteOrder} />
      </AppModal>
      <div className="flex justify-center w-full">
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full text-gray-200 ">
            {allOrders.length === 0 ? (
              <div className="text-xl font-bold text-red-600">
                No open positions yet!
              </div>
            ) : (
              <table className="p-0 mb-5 text-sm text-gray-200">
                <tbody>
                  <tr className="mb-6 font-bold text-center ">
                    <td className=" whitespace-nowrap">Position</td>
                    <td className="pl-8 whitespace-nowrap">Size</td>
                    <td className="pl-8 whitespace-nowrap">Entry Price</td>
                  </tr>

                  {allOrders.map((position: any) => (
                    <tr
                      key={position._id}
                      className="text-gray-500 my-0.5 text-sm text-center hover:text-gray-200"
                    >
                      <td className="whitespace-nowrap p-[-5px]">
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
      <button
        onClick={updateOrders}
        className="p-2 my-2 font-semibold text-gray-200 transition duration-500 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 hover:bg-slate-700"
      >
        See my Latest Orders
      </button>
    </>
  );
};

export default Orders;
