import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import AppModal from '../GlobalModal/AppModal';
import ConfirmBet from './ConfirmPosition';
import { Box } from '@mui/material';
import { Config } from '../../config/config';
import { utils } from 'ethers';
import TabsLayout from '../Tabs/TabsLayout';
import { toast } from 'react-toastify';

export const url = 'http://localhost:3002/api/long';

const LevDetails = (props: any) => {
  const [show, setShow] = useState(false);
  const [tokenMarket, setTokenMarket] = useState([]);
  const [data, setData] = useState(null);

  const handleBet = async () => {
    setShow(true);
  };

  const getMarketsPrices = async () => {
    try {
      const response = await fetch('https://api.gmx.io/prices');
      const data = await response.json();

      setTokenMarket(data);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   getMarketsPrices();
  // }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const postData = {
      _path: [Config.FROM_TOKEN, props.selectedAddress],
      _indexToken: props.selectedAddress,
      _amountIn: utils.parseUnits(String(props.inputValue), 6).toString(),
      _minOut: Config.MIN_OUT,
      _sizeDelta: props.result * (10 ** 6),
      _isLong: props.chooseLong ? true : false,
      _acceptablePrice: utils.parseUnits(props.tokenPriceUsd).toString(),
      _executionFee: Config.EXECUTION_FEE,
      _referralCode: Config.REFERRAL_CODE,
      _callbackTarget: Config.CALLBACK_TARGET,
    };

    try {
      const response = await Axios.post(url, postData);
      const responseData = response.data;
      console.log(responseData);

      setData({ postData, ...responseData });

      const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000));
      toast.promise(resolveAfter3Sec, {
        pending: 'Your order is being placed!',
        success: 'Your order has been placed successfully! 👌',
        error: 'Unable to place order 🤯',
      });

      setShow(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data) {
      // Perform any necessary actions with the updated order data
      console.log('Updated order data:', data);
    }
    getMarketsPrices();
  }, [data]);

  return (
    <>
      <Box>
        <AppModal show={show} close={() => setShow(false)} title="Create position">
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
  );
};

export default LevDetails;
