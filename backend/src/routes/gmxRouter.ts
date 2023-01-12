import * as express from "express";
import { config } from "../config";
import { GmxWrapper } from "../core";

const router = express.Router();

router.post("/long", async (req: any, res: any) => {
    try {
        const _params: {
            _path: any,
            _amountIn: any,
            _indexToken: any,
            _minOut: any,
            _sizeDelta: any,
            _collateralToken: any,
            _isLong: any,
            _triggerPrice: any,
            _triggerAboveThreshold: any,
            _executionFee: any,
            _shouldWrap: any
        } = req.body

        //call the approve function before creating an order to approve the GMX ROUTER

        const approve = await GmxWrapper.approvePlugin(config.GMX_ROUTER_SPENDER)

        if (approve) {

            //call the  createIncreasePosition and passing the params

            const order = await GmxWrapper.createIncreasePosition(_params)


        }

    } catch (error) {
        console.log("Error Creating Order Endpoint", error)
    }

})

router.post("/close", async (req: any, res: any) => {
    try {
        const _params: {
            _path: string[],
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
        } = req.body

        //approve the GMX_POSITION_ROUTER before creating a short order
        const approve = await GmxWrapper.approvePlugin(config.GMX_POSITION_ROUTER)

        if (approve) {

            //closes the long position
            const order = await GmxWrapper.createDecreasePosition(_params)


        }

    } catch (error) {
        console.log("Error Creating Order Endpoint", error)
    }

})


module.exports = router;

