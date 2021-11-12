import Head from 'next/head';
import axios from 'axios';
// import useSWR from 'swr';

// const fetcher = (url) => fetch(url).then((res) => res.json());

export async function getServerSideProps(context) {
    const { data } = await fetch('http://localhost:3000/api/coins').then(
        (res) => res.json()
    );
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
