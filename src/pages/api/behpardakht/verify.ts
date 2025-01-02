import { completeCart, updatePaymentSession } from '@/lib/data';
import { behpardakht, errors } from './request'
import type { NextApiRequest, NextApiResponse } from 'next';
import { updatePaymentSessionStatus } from '@/modules/checkout/actions';
import { medusaClient } from '@/lib/config';
import medusaError from '@/lib/util/medusa-error';
import cookie from "cookie";
import { isObject } from 'lodash'


const reversalRequest = async (res: NextApiResponse, {
    orderId,
    saleOrderId,
    saleReferenceId
}: {
    orderId: string
    saleOrderId: string
    saleReferenceId: string
}) => {
    try {
        const response = await behpardakht.reversalRequest({
            orderId,
            saleOrderId,
            saleReferenceId
        })

        console.log(response)

        if (response.resCode === 0 || response.resCode === 43) {
            console.error()
        }
    } catch (e) {

    }
}

const bpVerify = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.body)
    const { SaleOrderId, SaleReferenceId, RefId, retries, delay } = JSON.parse(req.body)
    const r = retries || 3
    const d = delay || 2000

    try {
        const response = await behpardakht.verifyPayment({
            orderId: SaleOrderId,
            saleOrderId: SaleOrderId,
            saleReferenceId: SaleReferenceId
        })

        console.log(response)


        if (response.resCode === 0 || response.resCode === 43) {
            res.status(200).json(response)
        } else {
            console.warn("Gateway Error: ", response.resCode)
            throw (errors[response.resCode]);
        }

    } catch (e) {
        reversalRequest(res, {
            orderId: SaleOrderId,
            saleOrderId: SaleOrderId,
            saleReferenceId: SaleReferenceId
        })
        console.log('Error, something went wrong.', e);
        res.status(400).json(e);
    }
};



export default bpVerify;