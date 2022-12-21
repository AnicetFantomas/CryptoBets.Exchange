import * as express from "express";
import { config } from "../config";
import { GmxWrapper } from "../core";

const router = express.Router();

router.post("/order", async (req: any, res: any) => {
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

            //calll the  createIncreaseOrder and passing the params

            const order = await GmxWrapper.createIncreaseOrder(_params)


        }

    } catch (error) {
        console.log("Error Creating Order Endpoint", error)
    }

})

module.exports = router;

