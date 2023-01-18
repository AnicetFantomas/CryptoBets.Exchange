import React, { useState } from 'react'
import Axios from 'axios'
import AppModal from '../GlobalModal/AppModal'
import ConfirmBet from './ConfirmPosition'
import { utils } from 'ethers'
import { Box } from '@mui/material'

export const LevDetails = (props: any) => {
  const [tokens, setTokens] = useState<any>([]);
  const [show, setShow] = useState(false);
  // state to handle data submited
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

  const handleBet = async () => {
    setShow(true)

 }  

  //url to handle enpoints from the backend
  const url = 'http://localhost:3002/api/long'

  // const [paths, setPaths] = useState(addressesObj)
  

  //function to submit form data when button is clicked
  function handleSubmit(e: any) {
    setData({
      _path: [
        '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
        `${0x82aF49447D8a07e3bd95BD0d56f35241523fBab1}`
      ],
      _amountIn: `${props.result}`,
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

    setShow(false)
  }

  return (
    <Box>
      <AppModal show={show} close={()=>setShow(false)} title='Create position'><ConfirmBet result={props.result} handleSubmit={handleSubmit} close={()=>setShow(false)} /></AppModal>
        <div className="flex flex-col w-full ">
          <div>
            <div className="flex justify-between w-full">
              <span className="text-white">Available liquidity</span>
              <span className="text-sky-500">3,873.56</span>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-white">Leverage</span>
              <span className="text-sky-500">{props.sliderValue}x</span>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-white">Entry Price</span>
              <span className="text-sky-500">$16,048.21</span>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-white">Liq Price</span>
              <span className="text-sky-500">${props.result}</span>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-white">Fees</span>
              <span className="text-sky-500">_</span>
            </div>
          </div>
          <button
            onClick={handleBet}
            className="p-3 my-5 text-xl text-white rounded-md bg-sky-500"
            type="submit"
          >
            Place Order
          </button>
        </div>
    </Box>
  )
}
