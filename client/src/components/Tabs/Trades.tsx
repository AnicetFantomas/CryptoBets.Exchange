import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ITrade } from '../../types/trade'

const OrdersHist = () => {
  const [trades, setTrades] = useState([])
  const apiUrl = 'https://api.gmx.io/actions'

  const getTrades = async () => {
    try {
      const { data } = await axios.get(apiUrl)
      console.log(data)
      const newData = data.map((item: any) => ({
        ...item,
        data: {
          ...item.data,
          params: JSON.parse(item.data.params)
        }

      }))


      setTrades(newData)
      console.log(newData)

    } catch (error: any) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getTrades()
  }, [])

  return (
    <div className='flex flex-col justify-center'>
      {
        trades.length === 0 ? <div className='text-xl font-bold text-red-600'><td>No open trades yet !</td></div> :
          trades.map((trade: ITrade) =>
            <div className='p-3 mb-3 border-2 border-black border-solid' key={trade.id}>

              <div className='text-red-600'>Action: {trade.data.action}</div>
              <div className='overflow-hidden text-slate-300'>
                <div className=''>Acceptable price: { trade.data.params.acceptablePrice } USD</div>
                <div className=''>Side: {trade.data.params.isLong ? "LONG" : "SHORT"}</div>
                <div className=''>Index Token: USDC</div>
              </div>

            </div>)
      }
    </div>
  )
}


export default OrdersHist;