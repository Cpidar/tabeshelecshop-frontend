import MellatCheckout from 'mellat-checkout'
import type { NextApiRequest, NextApiResponse } from 'next';


const mellat = new MellatCheckout({
    terminalId: 'xxxxxxx',
    username: 'xxxxxxx',
    password: 'xxxxxxx',
    timeout: 10000, // Optional, number in millisecond (defaults to 10 sec)
    apiUrl: 'https://bpm.shaparak.ir/pgwchannel/services/pgw?wsdl', // Optional, exists (and may updated) in bank documentation (defaults to this)
});




const GetCountriesUsingCurrencyAPI = async (req: NextApiRequest, res: NextApiResponse) => {


    try {
        mellat.initialize().then(function () {
            console.log("Mellat client ready")
        })
        res.setHeader('Cache-Control', 'no-store');
        res.status(200).json('ok');
    } catch (e) {
        console.log('Error, something went wrong.', e);
        res.setHeader('Cache-Control', 'no-store');
        res.status(400).json({ error: 'Unexpected error', code: 400 });
    }
};

export default GetCountriesUsingCurrencyAPI;