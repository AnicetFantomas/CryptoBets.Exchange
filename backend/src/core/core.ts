import { Contract, providers, Wallet } from "ethers"
import { config } from "../config"
import { GMX_ROUTER_ABI } from "../constants/constants"


export class GMX {

    public _provider: providers.JsonRpcProvider
    private signer: Wallet
    public spender: any

    constructor() {
        this._provider = new providers.JsonRpcProvider(config.JSON_RPC)
        this.signer = new Wallet(config.PRIVATE_KEY!, this._provider)
        this.spender = config.SPENDER_ADDRESS

    }

    approveContractGMX = async () => {
        return new Contract(
            config.SPENDER_ADDRESS,
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


}