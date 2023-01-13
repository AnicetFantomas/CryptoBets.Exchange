import { Contract, providers, Wallet } from "ethers"
import { config } from "../config"
import { GMX_ROUTER_ABI, ORDER_BOOK_ABI } from "../constants/constants"

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

            const approveTx = await contract.approvePlugin(orderBookAddress)

            return approveTx

        } catch (error) {
            console.log("Unable to approve contract", error)
        }

    }

    /**
     * 
     * @param _params these are the inputs required to place an order in GMX 
     */

    createIncreaseOrder = async (_params: {
        _path: string[],
        _amountIn: number,
        _indexToken: string,
        _minOut: number,
        _sizeDelta: number,
        _collateralToken: string,
        _isLong: boolean,
        _triggerPrice: any,
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
                _shouldWrap } = _params


            const contract = await this.orderBookContractGMX()

            const createOrderTx = await contract.callStatic.createIncreaseOrder(
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

            console.log("CreateOrderTx", createOrderTx)


            return createOrderTx


        } catch (error) {
            console.log("Unable to place an order to GMX", error)
        }
    }


}

export const GmxWrapper = new GMX()