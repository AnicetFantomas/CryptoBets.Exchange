import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import AppModal from '../GlobalModal/AppModal'
import ConfirmBet from './ConfirmPosition'
// import { utils } from 'ethers'
import { Box } from '@mui/material'
import { Config } from '../../config/config'
import { BigNumber, utils } from 'ethers'

export const LevDetails = (props: any) => {
  // const [tokens, setTokens] = useState<any>([]);
  const [show, setShow] = useState(false)
  // state to handle data submited
  const [data, setData] = useState({
    _path: [''],
    _indexToken: '',
    _amountIn: '',
    _minOut: 0,
    _sizeDelta: '',
    _isLong: true,
    _acceptablePrice: '',
    _executionFee: '',
    _referralCode: '',
    _callbackTarget: '',
  })

  const handleBet = async () => {
    setShow(true)
  }

  //url to handle enpoints from the backend
  const url = 'http://localhost:3002/api/long'

  // const [paths, setPaths] = useState(addressesObj)

  const [tokenMarket, setTokenMarket] = useState([])

  const getMarketsPrices = async () => {
    try {
      const response = fetch('https://api.gmx.io/prices')
      const data = await (await response).json()

      setTokenMarket(data)
      // console.log(data);
    } catch (error) {
      console.error(onmessage)
    }
  }

  useEffect(() => {
    getMarketsPrices()
  }, [])

  //console.log(tokenMarket)

  //function to submit form data when button is clicked
  function handleSubmit(e: any) {
    //getMarkets();

    setData({
      _path: [Config.FROM_TOKEN, `${props.selectedAddress}`],
      _indexToken: `${props.selectedAddress}`,
      _amountIn: `${utils.parseUnits(props.result, 6)}`,
      _minOut: Config.MIN_OUT,
      _sizeDelta: '10962587295000000000000000000000',
      _isLong: props.chooseLong ? true : false,
      _acceptablePrice: `${utils.parseUnits(props.tokenPrice.toString())}`,
      _executionFee: Config.EXECUTION_FEE,
      _referralCode: Config.REFERRAL_CODE,
      _callbackTarget: Config.CALLBACK_TARGET,
    })

    console.dir(data)

    Axios.post(url, {
      _path: data._path,
      _indexToken: data._indexToken,
      _amountIn: data._amountIn,
      _minOut: data._minOut,
      _sizeDelta: data._sizeDelta,
      _isLong: data._isLong,
      _acceptablePrice: data._acceptablePrice,
      _executionFee: data._executionFee,
      _referralCode: data._referralCode,
      _callbackTarget: data._callbackTarget,
    }).then(async (res) => {
      console.log(res.data)
    })

    setShow(false)
  }

  return (
    <Box>
      <AppModal
        show={show}
        close={() => setShow(false)}
        title="Create position"
      >
        <ConfirmBet
          result={props.result}
          handleSubmit={handleSubmit}
          close={() => setShow(false)}
        />
      </AppModal>
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
            <span className="text-sky-500">_</span>
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
