'use client';
import Image from 'next/image';
import "@/css/realtime.css";
import { ICONS, IMAGES } from "@/shared/constants/images";
import useBurnedValue from "./hook/useBurnedValue";
const linkRealTime = [
    { id: 1, link: "https://solscan.io/tx/4jCGYUnUWb3Vs1bxoByXAKGNGGqqpbL3JU9WeYGdipCfWuAGiEvGCTNpGiJcxe9RKnvWPrtoSPwu7tCro5GCAst1" },
];
const RealTime = () => {
    const { burnedValueUSD, loading, error } = useBurnedValue();

    return (
        <div className="realtime__frame" onClick={() => window.open(linkRealTime[0].link, '_blank')}>
            <Image className="realtime__img" src={IMAGES.Coin} alt="coin" />
            <div className="realtime__detail">
                <div className="realtime__detail-text">
                    🔥80% of Token Burned is Worth
                </div>
                <div className="realtime__detail-coinprice">
                    {loading ? 'loading...' :
                        error ? 'N/A' :
                            burnedValueUSD !== null
                                ? `$${burnedValueUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
                                : 'N/A'}
                </div>
            </div>
            <Image className="realtime__img2" src={ICONS.Arrow} alt="coin" />
        </div>
    );
};

export default RealTime;
