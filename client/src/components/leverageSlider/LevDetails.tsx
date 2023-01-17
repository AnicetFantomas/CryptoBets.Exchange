import React, { useState } from 'react'
import Axios from 'axios'
import { utils } from 'ethers'
import { Box, Container } from '@mui/material'

export const LevDetails = (props: any) => {
  //state to handle data submited
  const [data, setData] = useState({
    _path: [''],
    _amountIn: '',
    _indexToken: '',
    _minOut: 0,
    _sizeDelta: '',
    _collateralToken: '',
    _isLong: true,
    _triggerPrice: '',
    _triggerAboveThreshold: true,
    _executionFee: '',
    _shouldWrap: true,
  })

  //url to handle enpoints from the backend
  const url = 'http://localhost:3002/api/long'

  //function to set the form data
  function handle(e: any) {
    console.log(data)
    const newData: any = { ...data }
    newData[e.target.id] = e.target.value
    setData(newData)
    console.log(newData)
  }

  //function to submit form data when button is clicked
  function handleSubmit(e: any) {
    e.preventDefault()

    setData({
      _path: [
        '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
        '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
      ],
      _amountIn: '8300000000000000',
      _indexToken: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
      _minOut: 0,
      _sizeDelta: '95168869350000000000000000000000',
      _collateralToken: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
      _isLong: true,
      _triggerPrice: '16791000000000000000000000000000000',
      _triggerAboveThreshold: true,
      _executionFee: '100000000000000',
      _shouldWrap: true,
    })

    console.log(data)

    Axios.post(url, {
      _path: data._path,
      _amountIn: data._amountIn,
      _indexToken: data._indexToken,
      _minOut: data._minOut,
      _sizeDelta: data._sizeDelta,
      _collateralToken: data._collateralToken,
      _isLong: data._isLong,
      _triggerPrice: data._triggerPrice,
      _triggerAboveThreshold: data._triggerAboveThreshold,
      _executionFee: data._executionFee,
      _shouldWrap: data._shouldWrap,
    }).then(async (res) => {
      console.log(res.data)
    })
  }

  return (
    <Box>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className=" w-full flex flex-col">
          <div>
            <div className="flex w-full justify-between">
              <span className="text-white">Available liquidity</span>
              <span className="text-sky-500">3,873.56</span>
            </div>
            <div className="flex w-full justify-between">
              <span className="text-white">Leverage</span>
              <span className="text-sky-500">{props.sliderValue}x</span>
            </div>
            <div className="flex w-full justify-between">
              <span className="text-white">Entry Price</span>
              <span className="text-sky-500">$16,048.21</span>
            </div>
            <div className="flex w-full justify-between">
              <span className="text-white">Liq Price</span>
              <span className="text-sky-500">_</span>
            </div>
            <div className="flex w-full justify-between">
              <span className="text-white">Fees</span>
              <span className="text-sky-500">_</span>
            </div>
          </div>
          <button
            className=" bg-sky-500 my-5 text-white text-xl p-3 rounded-md"
            type="submit"
          >
            Place Order
          </button>
        </div>
      </form>
    </Box>
  )
}
