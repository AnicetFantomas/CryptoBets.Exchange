import React from 'react'

const ConfirmBet = (props: any) => {

	console.log({
		...props,
	});


	return (
		<>
			<div className='text-black'>
				confirm position
			</div>
			<div className='flex flex-col space-y-1 text-xs text-black'>
				<div className='flex items-center space-x-2'>
					<span className=''>Amount</span>
					<span className='p-1 bg-sky-500'>{props.result}</span>
				</div>
				<div className='flex items-center space-x-2'>
					<span className=''>Net Value</span>
					<span className='p-1 bg-sky-500'></span>
				</div>
				<div className='flex items-center space-x-2'>
					<span className=''>Size</span>
					<span className='p-1 bg-sky-500'> $</span>
				</div>
				<div className='flex items-center space-x-2'>
					<span className=''>Collateral</span>
					<span className='p-1 bg-sky-500'></span>
				</div>
				<div className='flex items-center space-x-2'>
					<span className=''>Mark price</span>
					<span className='p-1 bg-sky-500'></span>
				</div>
				<div className='flex items-center space-x-2'>
					<span className=''>Entry price</span>
					<span className='p-1 bg-sky-500'></span>
				</div>
				<div className='flex items-center space-x-2'>
					<span className=''>Liq price</span>
					<span className='p-1 bg-sky-500'>$</span>
				</div>
			</div>
			<div className='flex w-full space-x-2'>

				<button onClick={props.handleSubmit} className='flex items-center justify-center flex-auto p-2 space-x-1 bg-sky-500'>ADD POSITION</button>
				<button onClick={props.close} className='flex items-center justify-center flex-auto p-2 space-x-1 bg-red-500'>CANCEL</button>
			</div>
		</>
	)
}

export default ConfirmBet
