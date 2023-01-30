import { utils } from "ethers";
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

        console.log("We are in the backend", req.body)

        //call the approve function before creating an order to approve the GMX ROUTER

        const approve = await GmxWrapper.approve(config.USDC)


        if (approve) {

            // call the  createIncreasePosition and passing the params

            const order = await GmxWrapper.createIncreasePosition(_params)

            if (order) {

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

                const data = await orderDetails.save()

                res.send({ status: 200, data })

            }

        }

    } catch (error) {
        console.log("Error Creating Order Endpoint", error)
    }

})

router.post("/close", async (req: any, res: any) => {
    try {
        // let _params: {
        //     _path: string[],
        //     _indexToken: string,
        //     _collateralDelta: any,
        //     _sizeDelta: any,
        //     _isLong: boolean,
        //     _receiver: string,
        //     _acceptablePrice: any,
        //     _minOut: any,
        //     _executionFee: any,
        //     _withdrawETH: boolean,
        //     _callbackTarget: string
        // } = req.body



        //TODO  querry the db to get the order posted 

        let orderDetails: any = await Order.findById({
            _id: "63d2814fda5312e7e6433f9a"
        })
        const { path, indexToken, minOut, sizeDelta, acceptablePrice, executionFee, callbackTarget, isLong } = orderDetails;
        const receiver = config.RECEIVER_ADDRESS
        const collateralDelta = 0;
        const withdrawETH = true

        let _path = path.reverse()
        _path[1] = config.WETH

        let _acceptablePrice = acceptablePrice

        orderDetails.receiver = receiver
        orderDetails.collateralDelta = collateralDelta
        orderDetails.withdrawETH = withdrawETH
        orderDetails._path = _path
        orderDetails._acceptablePrice = _acceptablePrice


        orderDetails = req.body

        console.log({
            _path,
            indexToken,
            collateralDelta,
            minOut,
            sizeDelta,
            _acceptablePrice,
            executionFee,
            callbackTarget,
            isLong,
            receiver,
            withdrawETH

        })

        if (orderDetails) {

            //closes the position
            const closeOrder = await GmxWrapper.createDecreasePosition(
                path,
                indexToken,
                collateralDelta,
                minOut,
                isLong,
                receiver,
                acceptablePrice,
                minOut,
                executionFee,
                withdrawETH,
                callbackTarget
            )


            console.log("We reached here", closeOrder)

            res.send(closeOrder)


        }

    } catch (error) {
        console.log("Error Creating Order Endpoint", error)
    }

})

router.get("/orders", async (req: any, res: any) => {

    //TODO get all orders from the database

    const data = await Order.find().lean()
    console.log("active orders", data)

    if (data) {
        res.send({ status: 200, data })
    }
})


module.exports = router;

