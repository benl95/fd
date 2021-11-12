import { errorHandler } from '../../lib/utils/errorHandler';

export default async function getCoinsPrice(req, res) {
    const secretKey = process.env.API_KEY;
    const data = await fetch(
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
        {
            method: 'GET',
            qs: {
                start: '1',
                limit: '5000',
                convert: 'USD',
            },
            headers: {
                'X-CMC_PRO_API_KEY': secretKey,
            },
            json: true,
            gzip: true,
        }
    )
        .then(errorHandler)
        .then((res) => res.json())
        .catch((err) => console.log(err));
    res.json(data);
}
