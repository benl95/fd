import btcData from '../../public/btcData.csv';
import { toLowerCase } from '../../lib/utils/toLowerCase';

export default async function getCoinData(req, res) {
    if (!btcData) return res.status(404).json({ notFound: true });
    const lowerCased = btcData.map(toLowerCase);
    res.status(200).json(lowerCased);
}
