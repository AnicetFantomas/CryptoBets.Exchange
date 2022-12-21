import React from 'react'

import { useAccount, useBalance } from 'wagmi'
import { disconnect } from '@wagmi/core'

const AccountDetail = (props:any) => {

    const { isConnected, address } = useAccount()

    const { data, isError, isLoading } = useBalance({
        
    })


    const handleDisconnect = async () => {
        await disconnect()
        localStorage.removeItem('stark_keys')
        props.close()
    }

    return (
        <div className='flex flex-col space-y-4'>
            <div className='font-medium text-gray-900'>Balance: {parseFloat(data?.formatted ?? "0").toFixed(2)} {data?.symbol}</div>
            <div>
                <button className='flex m-auto justify-center flex-auto p-2 px-4 space-x-1 bg-red-700 text-white rounded-lg hover:bg-red-500' onClick={handleDisconnect} type="button">
                    Disconnect wallet
                </button>
            </div>
        </div>
    )
}

export default AccountDetail
