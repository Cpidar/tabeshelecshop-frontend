import MellatCheckout from 'mellat-checkout'
import type { NextApiRequest, NextApiResponse } from 'next';
import { medusaClient } from '@/lib/config';
import medusaError from '@/lib/util/medusa-error';
import cookie from "cookie";
export const behpardakht = new MellatCheckout({
    terminalId: process.env.BEHPARDAKHT_TERMINALID || "7517617",
    username: process.env.BEHPARDAKHT_USERNAME || "7517617",
    password: process.env.BEHPARDAKHT_PASSWORD || "32733567",
    timeout: process.env.BEHPARDAKHT_TIMEOUT || 10000,
    apiUrl:
        process.env.BEHPARDAKHT_API_URL ||
        "https://bpm.shaparak.ir/pgwchannel/services/pgw?wsdl",
})

behpardakht
    .initialize()
    .then(function () {
        console.log("Mellat client ready")
    })
    .catch(function (error: any) {
        // you can retry here
        console.log("Mellat client encountered error:", error)
    })


const getMedusaHeaders = (req: NextApiRequest, tags: string[] = []) => {
    const headers = {
        next: {
            tags,
        },
    } as Record<string, any>

    const token = req.cookies["_medusa_jwt"]

    if (token) {
        headers.authorization = `Bearer ${token}`
    } else {
        headers.authorization = ""
    }

    return headers
}

const bpRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    const { amount, payerId, orderId } = JSON.parse(req.body)
    try {
        const response = await behpardakht.paymentRequest({
            amount,
            orderId,
            callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/behpardakht/verify`,
            payerId: payerId || "0", // Optional
        })

        console.log(response)
        if (response.resCode === 0) {

            const cartId = req.cookies["_medusa_cart_id"]

            if (!cartId) {
                return null
            }

            // save saleReferenceId into payment session
            await medusaClient.carts
                .updatePaymentSession(cartId, 'behpardakht', { data: { referenceId: response.refId, orderId } })
                // .then(({ cart }) => cart)
                .catch((err) => medusaError(err))

            
            res.status(200).json(response)
        } else {
            console.warn("Gateway Error: ", response.resCode)
            res.status(400).json({ error: '', resCode: response.resCode })
        }

    } catch (e) {
        console.log('Error, something went wrong.', e);
        res.setHeader('Cache-Control', 'no-store');
        res.status(400).json({ error: 'Unexpected error', code: 400 });
    }
};


export default bpRequest;