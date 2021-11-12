import Head from 'next/head';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
    const { data, error } = useSWR('/api/coins', fetcher);
    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    const coinsList = data.data.map(({ symbol, id }) => {
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
