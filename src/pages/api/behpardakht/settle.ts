import { behpardakht, errors } from './request'
import type { NextApiRequest, NextApiResponse } from 'next';

const bpSettle = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.body)
    const { SaleOrderId, SaleReferenceId, RefId } = JSON.parse(req.body)

    try {
        const response = await behpardakht.settlePayment({
            orderId: SaleOrderId,
            saleOrderId: SaleOrderId,
            saleReferenceId: SaleReferenceId
        })

        console.log(response)

        if (response.resCode === 0 || response.resCode === 43) {


            res.status(200).json(response)
        } else {
            console.warn("Gateway Error: ", response.resCode)
            res.status(400).json({ errorMessage: errors[response.resCode], resCode: response.resCode })
        }

    } catch (e) {
        console.log('Error, something went wrong.', e);
        res.setHeader('Cache-Control', 'no-store');
        res.status(400).json({ errorMessage: 'Unexpected error', code: 400 });
    }
};



export default bpSettle;