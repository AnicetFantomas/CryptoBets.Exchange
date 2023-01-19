import * as express from "express";
import { config } from "../config";
import { GmxWrapper } from "../core";
import { connectDB } from "../models/connection";
import { Order } from "../models/schema";

const router = express.Router();

connectDB()

router.post("/long", async (req: any, res: any) => {
    try {
        const _params: {
            _path: string[],
            _indexToken: string,
            _amountIn: any,
            _minOut: any,
            _sizeDelta: any,
            _isLong: boolean,
            _acceptablePrice: any,
            _executionFee: any,
            _callbackTarget: string,
            _referralCode: string
        } = req.body

        console.log(req.body)

        //call the approve function before creating an order to approve the GMX ROUTER

        const approve = await GmxWrapper.approve(config.USDC)

        console.log("we are here")

        if (approve) {

            //call the  createIncreasePosition and passing the params

            const order = await GmxWrapper.createIncreasePosition(_params)

            //save the order to the db
            let orderDetails = new Order({
                path: req.body._path,
                indexToken: req.body._indexToken,
                minOut: req.body._minOut,
                sizeDelta: req.body._sizeDelta,
                acceptablePrice: req.body._acceptablePrice,
                executionFee: req.body._executionFee,
                callbackTarget: req.body._callbackTarget,
                isLong: req.body._isLong,
                referralCode: req.body._referralCode
            })

            //const orderData = await orderDetails.save()

            //res.send({ status: 200, orderData })


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

        //approve the GMX_POSITION_ROUTER before closing a position order
        const approve = await GmxWrapper.approvePlugin(config.GMX_POSITION_ROUTER)

        console.log("APPROVED", approve)

        if (approve) {

            //closes the position
            const closeOrder = await GmxWrapper.createDecreasePosition(_params)


            console.log("We reached here", closeOrder)

            res.send(closeOrder)


        }

    } catch (error) {
        console.log("Error Creating Order Endpoint", error)
    }

})


module.exports = router;

