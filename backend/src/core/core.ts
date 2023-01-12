import { Contract, providers, Wallet } from "ethers"
import { config } from "../config"
import { GMX_ROUTER_ABI, ORDER_BOOK_ABI, POSITION_ROUTER_ABI } from "../constants/constants"

class GMX {

    public _provider: providers.JsonRpcProvider
    private signer: Wallet

    constructor() {
        this._provider = new providers.JsonRpcProvider(config.JSON_RPC)
        this.signer = new Wallet(config.PRIVATE_KEY!, this._provider)

    }


    /**
     * 
     * @returns  a contract instance for the order book contract
     */

    orderBookContractGMX = async () => {
        return new Contract(
            config.ORDER_BOOK_ROUTER,
            ORDER_BOOK_ABI,
            this.signer
        )
    }

    /**
     * @returns a contract instance for the positionRouter
     */
    positionRouterContractsGMx = async () => {
        return new Contract(
            config.GMX_POSITION_ROUTER,
            POSITION_ROUTER_ABI,
            this.signer
        )

    }

    /**
     * 
     * @returns a contract instance for approval
     */

    approveContractGMX = async () => {
        return new Contract(
            config.GMX_ROUTER_SPENDER,
            GMX_ROUTER_ABI,
            this.signer
        )
    }


    /**
     * 
     * @param orderBookAddress 
     * @returns a successful approval
     */

    approvePlugin = async (orderBookAddress: string) => {

        try {

            const contract = await this.approveContractGMX()

            const approveTx = await contract.callStatic.approvePlugin(orderBookAddress)

            return approveTx

        } catch (error) {
            console.log("Unable to approve contract", error)
        }

    }

    /**
     * 
     * @param _params these are the inputs required to place a long order in GMX 
     */

    createIncreasePosition = async (_params: {
        _path: string[],
        _amountIn: number,
        _indexToken: string,
        _minOut: number,
        _sizeDelta: number,
        _collateralToken: any,
        _isLong: boolean,
        _triggerPrice: number,
        _triggerAboveThreshold: boolean,
        _executionFee: number,
        _shouldWrap: boolean

    }) => {
        try {

            const {
                _path,
                _amountIn,
                _indexToken,
                _minOut,
                _sizeDelta,
                _collateralToken,
                _isLong,
                _triggerPrice,
                _triggerAboveThreshold,
                _executionFee,
                _shouldWrap
            } = _params


            const contract = await this.orderBookContractGMX()

            const cretateOrderTx = await contract.callStatic.createIncreaseOrder(
                _path,
                _amountIn,
                _indexToken,
                _minOut,
                _sizeDelta,
                _collateralToken,
                _isLong,
                _triggerPrice,
                _triggerAboveThreshold,
                _executionFee,
                _shouldWrap

            )

            console.log("CreateOrderTx", cretateOrderTx)


            return cretateOrderTx


        } catch (error) {
            console.log("Unable to place an order to GMX", error)
        }
    }


    /**
     * 
     * @param _params these are the params required for creating a short order
     * @returns  
     */
    createDecreasePosition = async (_params: {
        _path: string[],
        _indexToken: string,
        _collateralDelta: number,
        _sizeDelta: any,
        _isLong: boolean,
        _receiver: string,
        _acceptablePrice: any,
        _minOut: any,
        _executionFee: any
        _withdrawETH: boolean,
        _callbackTarget: string

    }) => {
        try {
            const {
                _path,
                _indexToken,
                _collateralDelta,
                _sizeDelta,
                _isLong,
                _receiver,
                _acceptablePrice,
                _minOut,
                _executionFee,
                _withdrawETH,
                _callbackTarget

            } = _params

            const contract = await this.positionRouterContractsGMx()

            const createDecreaseOrderTx = await contract.callStatic.createDecreasePosition(

                _path,
                _indexToken,
                _collateralDelta,
                _sizeDelta,
                _isLong,
                _receiver,
                _acceptablePrice,
                _minOut,
                _executionFee,
                _withdrawETH,
                _callbackTarget

            )

            return createDecreaseOrderTx

        } catch (error) {
            console.log()
        }
    }


}

export const GmxWrapper = new GMX()