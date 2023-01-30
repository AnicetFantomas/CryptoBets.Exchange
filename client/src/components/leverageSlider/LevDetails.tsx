import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import AppModal from '../GlobalModal/AppModal'
import ConfirmBet from './ConfirmPosition'
// import { utils } from 'ethers'
import { Box } from '@mui/material'
import { Config } from '../../config/config'
import { BigNumber, utils } from 'ethers'
import TabsLayout from '../Tabs/TabsLayout'

export const url = 'http://localhost:3002/api/long'

const LevDetails = (props: any) => {
  const [show, setShow] = useState(false)
  const [tokenMarket, setTokenMarket] = useState([])

  // state to handle data submited
  const [data, setData] = useState([
    {
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
    },
  ])

  const handleBet = async () => {
    setShow(true)
  }

  const getMarketsPrices = async () => {
    try {
      const response = fetch('https://api.gmx.io/prices')
      const data = await (await response).json()

      setTokenMarket(data)
    } catch (error) {
      console.error(onmessage)
    }
  }

  useEffect(() => {
    getMarketsPrices()
  }, [])

  //function to submit form data when button is clicked
  function handleSubmit(e: any) {
    const newMyPosition = {
      _path: [Config.FROM_TOKEN, `${props.selectedAddress}`],
      _indexToken: `${props.selectedAddress}`,
      _amountIn: `${utils.parseUnits(props.inputValue, 6)}`,
      _minOut: Config.MIN_OUT,
      _sizeDelta: `${utils.parseUnits(props.result.toString(), 30)}`,
      _isLong: props.chooseLong ? true : false,
      _acceptablePrice: `${props.tokenPrice.toString()}`,
      _executionFee: Config.EXECUTION_FEE,
      _referralCode: Config.REFERRAL_CODE,
      _callbackTarget: Config.CALLBACK_TARGET,
    }
    const newOrders = [...data, newMyPosition]
    setData(newOrders)

    console.log(data)

    Axios.post(url, data).then(async (res) => {
      console.log(res.data)
    })

    setShow(false)
  }

  return (
    <>
      <Box>
        <AppModal
          show={show}
          close={() => setShow(false)}
          title="Create position"
        >
          <ConfirmBet
            result={props.result}
            inputValue={props.inputValue}
            tokenPriceUsd={props.tokenPriceUsd}
            handleSubmit={handleSubmit}
            // handleAddPosition={handleAddPosition}
            close={() => setShow(false)}
          />
        </AppModal>
        <div className="flex flex-col w-full ">
          <div>
            <div className="flex justify-between w-full">
              <span className="text-white">Leverage</span>
              <span className="text-sky-500">{props.sliderValue}x</span>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-white">Entry Price</span>
              <span className="text-sky-500">$ {props.tokenPriceUsd}</span>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-white">Total Price</span>
              <span className="text-sky-500">$ {props.result}</span>
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
      <TabsLayout data={data} />
    </>
  )
}

export default LevDetails
