import { Contract, ethers, providers, Wallet } from "ethers"
import { config } from "../config"
import { GMX_ROUTER_ABI, ORDER_BOOK_ABI, POSITION_ROUTER_ABI } from "../constants/constants"

class GMX {

    public _provider: providers.JsonRpcProvider
    private signer: Wallet
    private _wssUrl: providers.WebSocketProvider

    constructor() {
        this._provider = new providers.JsonRpcProvider(config.JSON_RPC)
        this.signer = new Wallet(config.PRIVATE_KEY!, this._provider)
        this._wssUrl = new providers.WebSocketProvider(config.WSS_URL)

    }

    /**
     * 
     * @param tokenAddress 
     * @returns 
     */
    approveContract = async (tokenAddress: string) => {
        return new Contract(
            tokenAddress,
            ["function approve(address _spender, uint256 _value) public returns (bool success)"],
            this.signer);
    }


    /**
     * 
     * @returns  a contract instance for the order book contract
     */

    orderBookContractGMX = async (signer: string) => {
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
            config.GMX_ROUTER,
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
     * @param tokenAddress 
     */

    approve = async (tokenAddress: string) => {
        try {
            const contract = await this.approveContract(tokenAddress)

            console.log("token usdc", tokenAddress)

            const MAX_INT = "100000000000000";

            const overLoads = {
                gasPrice: 30 * 1e9,
                gasLimit: 1000000
            }

            const approveTx = await contract.approve("0x3BFB92BB769Bfa812DA8b78FF3122bCb03E6BEDc", MAX_INT, overLoads)

            console.log("******APPROVE TRANSACTION********", approveTx.hash)
            return { success: true, data: `${approveTx.hash}` };


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
        _indexToken: string,
        _amountIn: any,
        _minOut: any,
        _sizeDelta: any,
        _isLong: boolean,
        _acceptablePrice: any,
        _executionFee: any,
        _referralCode: any,
        _callbackTarget: string

    }) => {
        try {

            const {
                _path,
                _indexToken,
                _amountIn,
                _minOut,
                _sizeDelta,
                _isLong,
                _acceptablePrice,
                _executionFee,
                _referralCode,
                _callbackTarget,

            } = _params

            console.log("we ere in the contract", _params)


            const contract = await this.positionRouterContractsGMx()
            const cretateOrderTx = await contract.createIncreasePosition(
                _path,
                _indexToken,
                _amountIn,
                _minOut,
                _sizeDelta,
                _isLong,
                _acceptablePrice,
                _executionFee,
                _referralCode,
                _callbackTarget, {
                value: _executionFee
            }

            )

            console.log("CreateOrderTx", cretateOrderTx)


            return cretateOrderTx


        } catch (error) {
            console.log("Unable to place an order to GMX", error)
        }

        return null;
    }


    /**
     * 
     * @param _params these are the params required for creating a short order
     * @returns  
     */
    createDecreasePosition = async (
        _path: any,
        _indexToken: string,
        _collateralDelta: any,
        _sizeDelta: any,
        _isLong: boolean,
        _receiver: string,
        _acceptablePrice: any,
        _minOut: any,
        _executionFee: any,
        _withdrawETH: boolean,
        _callbackTarget: string

    ) => {
        try {
            // const {
            //     _path,
            //     _indexToken,
            //     _collateralDelta,
            //     _sizeDelta,
            //     _isLong,
            //     _receiver,
            //     _acceptablePrice,
            //     _minOut,
            //     _executionFee,
            //     _withdrawETH,
            //     _callbackTarget

            // } = _params

            console.log("In the contract",)

            const contractx = await this.positionRouterContractsGMx()


            const createDecreaseOrderTx = await contractx.createDecreasePosition(
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
                _callbackTarget,
                {
                    gasLimit: 2000000,
                    value: _executionFee
                }

            )

            console.log("createDecreaseOrderTx", createDecreaseOrderTx)

            return createDecreaseOrderTx

        } catch (error) {
            console.log("failed too close the order", error)
        }

        return null;
    }

    async streamEvents() {
        try {
            // Define the contract interface
            const contractInterface = new ethers.utils.Interface([

                'event CreateIncreasePosition(address[] _path,address _indexToken,uint256 _amountIn,uint256 _minOut,uint256 _sizeDelta,bool _isLong,uint256 _acceptablePrice,uint256 _executionFee,bytes32 _referralCode,address _callbackTarget)',


                'event CreateDecreasePosition(address indexed account,address[] path,address indexToken,uint256 collateralDelta,uint256 sizeDelta,bool isLong,address receiver,uint256 acceptablePrice,uint256 minOut,uint256 executionFee,uint256 index,uint256 queueIndex,uint256 blockNumber,uint256 blockTime)',
            ]);

            // Create a Contract instance for the contract you want to listen to
            const contract = new ethers.Contract(
                config.GMX_POSITION_ROUTER,
                contractInterface,
                this._wssUrl
            );

            // Listen to the CreateIncreasePosition event
            contract.on(
                'CreateIncreasePosition',
                (
                    _path: any,
                    _indexToken: string,
                    _amountIn: ethers.BigNumber,
                    _minOut: any,
                    _sizeDelta: any,
                    _isLong: any,
                    _acceptablePrice: any,
                    _executionFee: any,
                    _referralCode: any,
                    _callbackTarget: any
                ) => {
                    console.log(
                        'Received CreateIncreasePosition event:',
                        _path,
                        _indexToken,
                        _amountIn.toString(),
                        _minOut,
                        _sizeDelta,
                        _isLong,
                        _acceptablePrice,
                        _executionFee,
                        _referralCode,
                        _callbackTarget
                    );
                }
            );

            // Listen to the CreateDecreasePosition event
            contract.on(
                'CreateDecreasePosition',
                (
                    account: any,
                    path: any,
                    indexToken: any,
                    collateralDelta: any,
                    sizeDelta: any,
                    isLong: any,
                    receiver: any,
                    acceptablePrice: any,
                    minOut: any,
                    executionFee: any,
                    index: any,
                    queueIndex: any,
                    blockNumber: any,
                    blockTime: any
                ) => {
                    console.log(
                        'Received CreateDecreasePosition event:',
                        {
                            account,
                            path,
                            indexToken,
                            collateralDelta,
                            sizeDelta,
                            isLong,
                            receiver,
                            acceptablePrice,
                            minOut,
                            executionFee,
                            index,
                            queueIndex,
                            blockNumber,
                            blockTime
                        }
                    );
                }
            );
        } catch (error) {
            console.log('Error streaming events', error);
        }
    }



}

export const GmxWrapper = new GMX()