import MellatCheckout from 'mellat-checkout'
import type { NextApiRequest, NextApiResponse } from 'next';

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


const bpRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    const { amount, payerId } = JSON.parse(req.body)
    try {
        const response = await behpardakht.paymentRequest({
            amount,
            orderId: Date.now(),
            callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/behpardakht/verify`,
            payerId: payerId || "0", // Optional
        })

        if (response.resCode === 0) {
            console.log(amount, payerId)
            res.json(response)
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