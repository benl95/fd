import Head from 'next/head';
import { errorHandler } from '../lib/utils/errorHandler';

export async function getServerSideProps(context) {
    const { data } = await fetch('http://localhost:3000/api/coins')
        .then(errorHandler)
        .then((res) => res.json())
        .catch((err) => console.log(err));
    if (!data) return { notFound: true };
    return {
        props: { coins: { data } },
    };
}

export default function Home({ coins }) {
    const { data } = coins;
    const coinsList = data.map(({ symbol, id }) => {
        return <li key={id}>{symbol}</li>;
    });
    return (
        <div>
            <Head>
                <title>Crypto Dashboard</title>
            </Head>

            <main>
                <ul>{coinsList}</ul>
            </main>
        </div>
    );
}
