'use client';
import { useEffect, useRef, useState } from 'react';
import '@/css/header.css';
import ModalOpenGame from './modal/ModalOpenGame';
import ModalGenerator from './modal/ModalGenerator';
import Image from 'next/image';
import { ICONS, IMAGES } from '@/shared/constants/images';
import RealTime from './RealTime';

const dexsLink = [
    { id: 1, link: "https://gmgn.ai/sol/token/5HkhVG2bSb5PGjhX5QHm9urUquD7tx5eAau5Fonq78zc" },
    { id: 2, link: "https://coinmarketcap.com/currencies/kokok-the-roach/" },
    { id: 3, alt: "CoinGecko", link: "https://www.coingecko.com/vi/ty_gia/kokok-the-roach" },
    { id: 4, alt: "Dexscreener", link: "https://dexscreener.com/solana/fhmjz9z3izdqcw9e8qrulzvjwwb2hbhcfb7jqnekv9bz" },
    { id: 5, alt: "Raydium", link: "https://raydium.io/swap/?inputMint=sol&outputMint=5HkhVG2bSb5PGjhX5QHm9urUquD7tx5eAau5Fonq78zc" },
    { id: 6, alt: "Linktree", link: "https://linktr.ee/Kokoktheroach" },

];

const Header = () => {
    const [showOpenGame, setShowOpenGame] = useState(false);
    const [showGenerator, setShowGenerator]
        = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const playAudio = () => {
        if (audioRef.current && !isMuted) {
            audioRef.current.volume = 0.1;
            audioRef.current.play().catch((err) => {
                console.warn('Autoplay prevented:', err);
            });
        }
    };

    useEffect(() => {
        audioRef.current = new Audio('/music/background.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.1;

        const headerElement = document.querySelector('.hero__header');
        headerElement?.addEventListener('click', playAudio, { once: true });

        return () => {
            headerElement?.removeEventListener('click', playAudio);
            audioRef.current?.pause();
        };
    }, []);

    useEffect(() => {
        if (!isMuted && audioRef.current) {
            audioRef.current.play().catch((err) => {
                console.warn('Play failed when unmuting:', err);
            });
        } else {
            audioRef.current?.pause();
        }
    }, [isMuted]);




    return (
        <div className="hero__header">
            <RealTime />
            <Image
                src={isMuted ? ICONS.Mute : ICONS.On}
                alt={isMuted ? "mute" : "on"}
                className="header__sound"
                onClick={() => setIsMuted(prev => !prev)}
            />
            <div className="header__coin1"></div>
            <div className="header__coin2"></div>
            <div className="header__coin3"></div>
            <div className="header__focus-table" onClick={() => setShowGenerator(true)}>
                <div className="header__focus-table__frame">
                </div>
                <div className="header__focus-table__button">
                    <p style={{ fontSize: "16px", textAlign: "center" }} className="header__focus-text">Coming Soon</p>
                </div>
            </div>
            <div className="header__focus-pc1" onClick={() => setShowOpenGame(true)}>
                <div className="header__focus-pc1__frame">
                </div>
                <div className="header__focus-pc1__button">
                    <p className="header__focus-text">
                        Open game
                    </p>
                </div>
            </div>
            <div className="header__focus-pc2" onClick={() => window.open(dexsLink[4].link, '_blank')}>

                <div className="header__focus-pc2__frame">
                </div>
                <div className="header__focus-pc2__text">
                    <p style={{ fontSize: "12px" }} className="header__focus-text">5HkhVG2bSb5PGjhX5QHm9urUquD7tx5eAau5Fonq78zc</p>
                </div>
                <div className="header__focus-pc2__button">
                    <p style={{ fontSize: "18px" }} className="header__focus-text">BUY NOW</p>
                </div>
            </div>
            <div className="header__focus-phone" onClick={() => window.open(dexsLink[5].link, '_blank')}>
                <div className="header__focus-icon-2">

                </div>
                <div className="header__focus-phone__button">
                    <p style={{ fontSize: "24px" }} className="header__focus-text">Social Media</p>
                </div>
            </div>
            <div className="header__focus-table2" >
                <div className="header__focus-table2__mask-1" onClick={() => window.open(dexsLink[0].link, '_blank')}></div>
                <div className="header__focus-table2__mask-2" onClick={() => window.open(dexsLink[1].link, '_blank')}></div>
                <div className="header__focus-table2__mask-3" onClick={() => window.open(dexsLink[2].link, '_blank')}></div>
                <div className="header__focus-table2__mask-4" onClick={() => window.open(dexsLink[3].link, '_blank')}></div>
                <div className="header__focus-table2__frame"></div>

            </div>
            <div className="header__focus-table2__button">
                <p style={{ fontSize: "24px" }} className="header__focus-text">DEXS</p>
            </div>
            <div
                className={`header__cockcroach ${isHovered ? 'hidden' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
            ></div>

            <video
                autoPlay
                muted
                loop
                playsInline
                className={`header__cockcroach-animation ${isHovered ? 'visible' : ''}`}
                onMouseLeave={() => setIsHovered(false)}
            >
                <source src="/videos/gianchinh.webm" type="video/webm" />
                Trình duyệt không hỗ trợ video.
            </video>
            <Image className="header__smoke" alt="gian" src={IMAGES.Smoke} />
            <Image className="header__gian" alt="gian" src={IMAGES.Gian} />
            <Image className="header__gian2" alt="gian" src={IMAGES.Gian} />
            <Image className="header__gian3" alt="gian" src={IMAGES.Gian} />
            <Image className="header__gian4" alt="gian" src={IMAGES.Gian} />


            <ModalOpenGame isOpen={showOpenGame} onClose={() => setShowOpenGame(false)} />
            <ModalGenerator isOpen={showGenerator} onClose={() => setShowGenerator(false)} />
        </div>

    );
}
export default Header;
