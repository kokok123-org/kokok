"use client"
import '@/css/dexs.css';
import { LOGO } from '@/shared/constants/images';
import Image from 'next/image';

const dexsData = [
    { id: 1, src: LOGO.Logo1, alt: "GMGN", link: "https://gmgn.ai/sol/token/5HkhVG2bSb5PGjhX5QHm9urUquD7tx5eAau5Fonq78zc" },
    { id: 2, src: LOGO.Logo2, alt: "CoinMarket", link: "https://coinmarketcap.com/currencies/kokok-the-roach/" },
    { id: 3, src: LOGO.Logo3, alt: "CoinGecko", link: "https://www.coingecko.com/vi/ty_gia/kokok-the-roach" },
    { id: 4, src: LOGO.Logo4, alt: "Dexscreener", link: "https://dexscreener.com/solana/fhmjz9z3izdqcw9e8qrulzvjwwb2hbhcfb7jqnekv9bz" },
];

const Dexs = () => {
    return (
        <div className="hero__dexs">
            <div className="dexs__title">
                DEXs
            </div>
            <div className="dexs__frame">
                {dexsData.map(({ id, src, alt, link }) => (
                    <div
                        key={id}
                        className="dexs__button"
                        onClick={() => window.open(link, '_blank')}
                        style={{ cursor: 'pointer' }}
                    >
                        <Image src={src} alt={alt} className="dexs__img" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dexs;
