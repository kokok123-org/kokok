import { useEffect, useRef, useState } from 'react';

interface ParsedInstruction {
    parsed?: {
        type?: string;
        info?: {
            mint: string;
            amount: string;
            [key: string]: unknown;
        };
    };
}

const useBurnedValue = () => {
    const [burnedAmount, setBurnedAmount] = useState<number | null>(null);
    const [burnedValueUSD, setBurnedValueUSD] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const signature = '4jCGYUnUWb3Vs1bxoByXAKGNGGqqpbL3JU9WeYGdipCfWuAGiEvGCTNpGiJcxe9RKnvWPrtoSPwu7tCro5GCAst1';
    const heliusApiKey = process.env.NEXT_PUBLIC_HELIUS_API_KEY;

    const isInitialLoad = useRef(true);

    useEffect(() => {
        const fetchBurnData = async () => {
            try {
                if (isInitialLoad.current) {
                    setLoading(true);
                }

                const txResponse = await fetch(`https://mainnet.helius-rpc.com/?api-key=${heliusApiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        jsonrpc: '2.0',
                        id: 1,
                        method: 'getTransaction',
                        params: [
                            signature,
                            {
                                encoding: 'jsonParsed',
                                maxSupportedTransactionVersion: 0
                            }
                        ]
                    })
                });

                const txData = await txResponse.json();
                if (txData.error) throw new Error(txData.error.message);

                const instructions = txData.result.transaction.message.instructions;
                const burnInstruction = (instructions as ParsedInstruction[]).find(
                    (ins) => ins.parsed?.type === 'burn'
                );

                if (!burnInstruction || !burnInstruction.parsed?.info) {
                    throw new Error('No burn instruction found');
                }

                const info = burnInstruction.parsed.info;
                const mintAddress = info.mint;
                const rawAmount = BigInt(info.amount);
                const decimals = 9;
                const uiAmount = Number(rawAmount) / Math.pow(10, decimals);
                setBurnedAmount(uiAmount);

                const cgRes = await fetch(`https://api.coingecko.com/api/v3/simple/token_price/solana?contract_addresses=${mintAddress}&vs_currencies=usd`);
                const cgData = await cgRes.json();
                const tokenPrice = cgData[mintAddress]?.usd;
                if (!tokenPrice) throw new Error(`Token ${mintAddress} not found on CoinGecko`);

                setBurnedValueUSD(uiAmount * tokenPrice);
            } catch (err: unknown) {
                const error = err instanceof Error ? err : new Error('Unknown error');
                console.error(error);
                setError(error.message);
                setBurnedAmount(null);
                setBurnedValueUSD(null);
            } finally {
                if (isInitialLoad.current) {
                    setLoading(false);
                    isInitialLoad.current = false;
                }
            }
        };

        if (heliusApiKey) {
            fetchBurnData();
            const interval = setInterval(fetchBurnData, 60000);
            return () => clearInterval(interval);
        } else {
            console.warn("Missing Helius API Key");
            setError("Missing API Key");
            setLoading(false);
        }
    }, [heliusApiKey]);

    return { burnedAmount, burnedValueUSD, loading, error };
};

export default useBurnedValue;
