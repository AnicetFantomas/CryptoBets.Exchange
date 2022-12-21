import React, { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi'
import AppModal from '../GlobalModal/AppModal';
import AccountDetail from './Details';


const CustomConnectButton = () => {

    const { isConnected, address } = useAccount()

    const { data, isError, isLoading } = useBalance({
        
    })


    const [show, setShow] = useState(false)

    return (
        <>
            <AppModal title='MY ACCOUNT' close={()=>{
                setShow(false)
            }} show={show}><AccountDetail close={()=>{
                setShow(false)
            }}/></AppModal>
            <ConnectButton.Custom>
                {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    authenticationStatus,
                    mounted,
                }) => {
                    // Note: If your app doesn't use authentication, you
                    // can remove all 'authenticationStatus' checks
                    const ready = mounted && authenticationStatus !== 'loading';
                    const connected =
                        ready &&
                        account &&
                        chain &&
                        (!authenticationStatus ||
                            authenticationStatus === 'authenticated');

                    return (
                        <div
                            {...(!ready && {
                                'aria-hidden': true,
                                'style': {
                                    opacity: 0,
                                    pointerEvents: 'none',
                                    userSelect: 'none',
                                },
                            })}
                        >
                            {(() => {
                                if (!connected) {
                                    return (
                                        <button className='flex justify-center flex-auto text-white p-2 space-x-1 rounded-lg bg-sky-500 hover:bg-sky-600' onClick={openConnectModal} type="button">
                                            Connect Wallet
                                        </button>
                                    );
                                }

                                if (chain.unsupported) {
                                    return (
                                        <button onClick={openChainModal} type="button">
                                            Wrong network
                                        </button>
                                    );
                                }

                                return (
                                    <div style={{ display: 'flex', gap: 12 }}>      

                                        <button className='flex flex-col text-white' onClick={()=>{
                                            setShow(true)
                                        }} type="button">
                                            {/* Balance: {parseFloat(data?.formatted ?? "0").toFixed(2)} {data?.symbol} */}
                                            <span className='text-sm ml-2'>Trade PNL</span>
                                            <span className='font-bold text-sky-500 text-xl'>+78USD</span>
                                        </button>
                                    </div>
                                );
                            })()}
                        </div>
                    );
                }}
            </ConnectButton.Custom>
        </>

    );
}

export default CustomConnectButton
