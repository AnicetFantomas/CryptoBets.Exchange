import { Schema, model } from "mongoose";
import { IOrder } from "../types/interface";

const OrderSchema = new Schema<IOrder>(
    {
        path: { type: Array<String> },
        indexToken: { type: String },
        minOut: { type: Number },
        sizeDelta: { type: Number },
        collateralDelta: { type: Number },
        acceptablePrice: { type: Number },
        executionFee: { type: Number },
        callbackTarget: { type: String },
        isLong: { type: Boolean },
        referralCode: { type: String },

    },
    {
        timestamps: true,
    }
);

export const Order = model<IOrder>("Order", OrderSchema)