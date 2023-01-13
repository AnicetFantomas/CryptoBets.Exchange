import { BigNumber, utils } from "ethers"
import { ADDRESSES } from "../constants/addresses"
import { GmxWrapper } from "../core"

class Test {
    constructor() { }

    // Test creating an order
    async testCreateOrder() {
        try {

            // Prepare transaction data
            const _path = [ADDRESSES.WETH_ADDRESS] // collateral token, the token you are using for the trade
            const _indexToken = ADDRESSES.WBTC_ADDRESS      // The token representing the market you are trading in eg WBTC token for the BTC/USD market 
            const _collateralToken = ADDRESSES.WETH_ADDRESS         // Token you are depositing for the trade
            const _amountIn = 0.0001 * 1e18     // The initial amount of the trade (without leverage)
            const _minOut = 0     // The amount out min. Zero is used to imply 100 slippage, to prevent users swap txn from failing
            const _sizeDelta = 0
            const _isLong = true
            const _triggerPrice = utils.parseUnits("19108", 30)
            const _triggerAboveThreshold = false
            const _executionFee = 300000000000000
            const _shouldWrap = true

            GmxWrapper.createIncreaseOrder({
                _path, _amountIn, _indexToken, _minOut, _sizeDelta, _collateralToken, _isLong, _triggerPrice, _triggerAboveThreshold, _executionFee, _shouldWrap
            }
            )

        } catch (error) {
            console.log("Error testing create order ", error)
        }
    }
}



const test = new Test()

test.testCreateOrder()
