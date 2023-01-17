import React, { useState, useEffect } from 'react';


const Trading = (props: any) => {

    const [chooseLong, setChooseLong] = useState(false);
    const [tokens, setTokens] = useState<any>([]);


    const handleChooseLong = (e: any) => {
        setChooseLong(true);
      }
    
      const handleChooseShort = (e: any) => {
        setChooseLong(false);
      }

      const getMarkets = async () => {
        try {
            const response = fetch("https://api.gmx.io/tokens");
            const data = await (await response).json();

            setTokens(data);
        } catch (error) {
            console.error(onmessage)
        }
      }

      useEffect(() => {
        getMarkets();
    }, []);   

    console.log(tokens);

    const handleChange = (e: any) => {
        const marketTokens = [...tokens]
        setTokens(marketTokens)
        
    }

    return (
        <div className='flex flex-col w-full p-2 pt-4 space-y-4'>
            <div className="flex mb-4 justify-center w-full space-x-6">
                <select onChange={handleChange} className='block w-2/5 px-4 text-xs leading-tight text-white cursor-pointer bg-cyan-600 focus:outline-none '>
                    {
                        tokens.map((data:any) => (<option key={data.data.address} defaultValue={data.data.symbol}>
							{'ETH / '}{`${data.data.symbol} `}
							</option>))
                    }
                   
                </select>
                <div className='flex justify-center w-2/5 p-2 text-sm font-semibold text-white bg-red-500'>PNL:80USD</div>
            </div>
            <div className="flex justify-center w-full space-x-6">
                <button style={{backgroundColor: chooseLong? 'transparent' : '', }} onClick={handleChooseLong} className='long-btn flex items-center justify-center w-1/2 p-3 text-sm font-extrabold text-white rounded-lg bg-sky-500'>
                    <span>LONG</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                    </svg>
                </button>
                <button style={{backgroundColor: chooseLong? '' : 'transparent', }} onClick={handleChooseShort} className='short-btn flex items-center justify-center w-1/2 p-3 text-sm font-extrabold text-white bg-red-500 rounded-lg'>
                    <span>SHORT</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                    </svg>
                </button>
            </div>
            <div className="flex justify-center w-full space-x-6">
                <div className='flex mt-8 items-center w-full py-1 space-x-2 text-white border-b'>
                    <span className='text-gray-400'>Amount:</span>
                    <div className='flex justify-end flex-auto space-x-1'>
                        <input onChange={props.handleInputChange} value={props.inputValue} className='text-white w-full bg-transparent border-none focus:outline-none' type="number" />
                        <span className='text-sm  mb-2 text-gray-400'>{`(usd)`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Trading