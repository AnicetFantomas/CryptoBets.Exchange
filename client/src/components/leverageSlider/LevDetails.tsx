import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import AppModal from '../GlobalModal/AppModal'
import ConfirmBet from './ConfirmPosition'
// import { utils } from 'ethers'
import { Box } from '@mui/material'
import { Config } from '../../config/config'
import { utils } from 'ethers'
import TabsLayout from '../Tabs/TabsLayout'
import { toast } from 'react-toastify'

export const url = 'http://localhost:3002/api/long'

const LevDetails = (props: any) => {
  const [show, setShow] = useState(false)
  const [tokenMarket, setTokenMarket] = useState([])


  console.log("Props ", props)


  // state to handle data submited
  const [data, setData] = useState(
    {
      _path: [''],
      _indexToken: '',
      _amountIn: '',
      _minOut: 0,
      _sizeDelta: 0,
      _isLong: true,
      _acceptablePrice: 0,
      _executionFee: '',
      _referralCode: '',
      _callbackTarget: '',
    },
  )

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

  const [postData, setPostData] = useState({});

  const handleSubmit = (e: any) => {
    e.preventDefault()

    setPostData(
      {
        _path: [Config.FROM_TOKEN, `${props.selectedAddress}`],
        _indexToken: `${props.selectedAddress}`,
        _amountIn: `${utils.parseUnits(props.inputValue, 6)}`,
        _minOut: Config.MIN_OUT,
        _sizeDelta: props.result * (10 ** 6),
        _isLong: props.chooseLong ? true : false,
        _acceptablePrice: `${utils.parseUnits(props.tokenPrice)}`,
        _executionFee: Config.EXECUTION_FEE,
        _referralCode: Config.REFERRAL_CODE,
        _callbackTarget: Config.CALLBACK_TARGET,
      }
    )

    const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
    toast.promise(
      resolveAfter3Sec,
      {
        pending: 'Your order is being placed!',
        success: 'Your order has been placed successfully! 👌',
        error: 'Unable to place order 🤯'
      }
    )

    setShow(false)
  }

  useEffect(() => {
    if (Object.keys(postData).length) {
      Axios.post(url, postData)
        .then(async (res) => {
          console.log(res.data);
          setData({ postData, ...res.data });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [postData]);


  console.log(data);

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
