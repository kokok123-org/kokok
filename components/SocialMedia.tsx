'use client';
import React from 'react';
import '@/css/social-media.css';

const SocialMedia = () => {
    const text = "$KOKOK Spread Like a Glitch, Now It’s a Plague One click, one trade, and the swarm is in your wallet.";

    return (
        <div className="hero__social">
            <div className="marquee-wrapper">
                <div className="marquee">
                    <p className="social__text">{text}</p>
                    <p className="social__text">{text}</p>
                </div>
            </div>
        </div>
    );
}

export default SocialMedia;
