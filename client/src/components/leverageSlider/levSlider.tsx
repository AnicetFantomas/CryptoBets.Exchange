import React, { useState, useEffect } from 'react';
import LevDetails from './LevDetails';
import SliderBox from './SliderBox';
import Trading from '../trading/Trading';
import Tokens from '../trading/data';
import { ethers } from 'ethers';

const LevSlider = (props:any) => {

    const [sliderValue, setSliderValue] = useState(0);
    const [chooseLong, setChooseLong] = useState(false);

    const [inputValue, setInputValue] = useState(0);
    const [result, setResult] = useState(0);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [usdPerEth, setUsdPerEth] = useState(1000);

    // try get price value

    const [apiData, setApiData] = useState([]);
    // const [value, setValue] = useState(null);

    useEffect(() => {
        // Fetch data from the API and update state
        fetch('https://api.gmx.io/prices')
            .then(res => res.json())
            .then(data => setApiData(data))
            .catch(err => console.log(err));
    }, []);

    function getValueFromKey(obj: any, key: any) {
        const found = Object.entries(obj).find(([k, v]) => k === key);
        return found ? found[1] : null;
    }
    const tokenPrice: any = getValueFromKey(apiData, selectedAddress);

    let tokenPriceUsd: any = 0;

    if (tokenPrice) {
        const tokenPriceInEth: any = ethers.utils.parseEther(tokenPrice);
        const tokenUsd: any = ethers.utils.formatEther(tokenPriceInEth);
        
        if (selectedAddress === '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1' || 
            selectedAddress === '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f') 
            {  
            const tokenToUsd = ((tokenUsd * usdPerEth) * Math.pow(10, -33)).toFixed(2);     
            tokenPriceUsd = (tokenToUsd.slice(0, tokenToUsd.indexOf('0') + 7));
        }

        else {
            const tokenToUsd : any = ((tokenUsd * usdPerEth) * Math.pow(10, -33)).toFixed(2);
            tokenPriceUsd = (tokenToUsd.slice(0, tokenToUsd.indexOf('0') + 20));
        }
    }


    // end try get value
    const handleSelectedSymbol = (symbol: string) => {
        const selectedToken: any = Tokens.find(token => token.symbol === symbol)
        setSelectedAddress(selectedToken ? selectedToken.address : "");
    }

    console.log(selectedAddress)

    const handleInputChange = (e: any) => {
        const { target } = e
        const { value } = target;
        setInputValue((prev: number) => Number(value));
        setInputValue(e.target.value);

    };


    const handleSliderChange = (e: any, newValue: number) => {
        setSliderValue(newValue);
    };

    useEffect(() => {
        if (sliderValue === 0) {
            return setResult(inputValue)
        }
        setResult(inputValue * sliderValue)

    }, [inputValue, sliderValue])


    return (
      <>
        <div className=" sm:flex-col sm:m-12 sm:mt-14">
          <Trading
            handleSelectedSymbol={handleSelectedSymbol}
            handleSliderChange={handleSliderChange}
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            chooseLong={chooseLong}
            onChooseLong={setChooseLong}
          />
          <div className="flex flex-col m-5" >
            <h2 className="self-start my-5 text-white">Leverage</h2>
            <div className="flex self-center ml-3">
              <div className="flex flex-col items-center mr-5 cursor-pointer hover:text-blue-200">
                <span className="text-white">0</span>
              </div>
              <div className="flex flex-col items-center mr-3 cursor-pointer hover:text-blue-200">
                <span className="text-white">5</span>
              </div>
              <div className="flex flex-col items-center mx-2 cursor-pointer hover:text-blue-200">
                <span className="text-white">10</span>
              </div>
              <div className="flex flex-col items-center mx-2 cursor-pointer hover:text-blue-200">
                <span className="text-white">15</span>
              </div>
              <div className="flex flex-col items-center mx-2 cursor-pointer hover:text-blue-200">
                <span className="text-white">20</span>
              </div>
              <div className="flex flex-col items-center mx-2 cursor-pointer hover:text-blue-200">
                <span className="text-white">25</span>
              </div>
              <div className="flex flex-col items-center mx-2 cursor-pointer hover:text-blue-200">
                <span className="text-white">30</span>
              </div>
              <div className="flex flex-col items-center mx-2 ml-2 cursor-pointer hover:text-blue-200">
                <span className="text-white">35</span>
              </div>
              <div className="flex flex-col items-center mx-2 ml-2 cursor-pointer hover:text-blue-200">
                <span className="text-white">40</span>
              </div>
              <div className="flex flex-col items-center mx-2 cursor-pointer hover:text-blue-200">
                <span className="text-white">45</span>
              </div>
              <div className="flex flex-col items-center mx-2 cursor-pointer hover:text-blue-200">
                <span className="text-white">50</span>
              </div>
            </div>

            <SliderBox
              handleSliderChange={handleSliderChange}
              inputValue={inputValue}
              handleInputChange={handleInputChange}
            />

            <div>
              <LevDetails
                tokenPrice={tokenPrice}
                tokenPriceUsd={tokenPriceUsd}
                selectedAddress={selectedAddress}
                handleBet={props.handleBet}
                inputValue={inputValue}
                sliderValue={sliderValue}
                result={result}
                chooseLong={chooseLong}
              />
            </div>
          </div>
        </div>
      </>
    );
}

export default LevSlider;







//  Layout ----> Lev slider ----> Lev details , trading  