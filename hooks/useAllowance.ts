import { useEffect, useState, useCallback, useMemo } from 'react';
import { useAccount, useReadContracts } from 'wagmi';
import { chewyLpAbi } from "@/constants/abi/chewyLpAbi";
import { Address, formatUnits } from 'viem';

interface AllowanceData {
    bigInt: BigInt;
    number: number;
}

interface TokenData {
    balance: AllowanceData;
    isLp: boolean;
    permit: {
        domainSeparator: string;
        typehash: string;
        nonces: BigInt;
    };
    symbol: string;
    name: string;
    decimals: number;
}

interface UseAllowanceReturn {
    allowance: AllowanceData;
    token: TokenData;
    refresh: () => void;
}

export function useAllowance(tokenAddress?: Address, spenderAddress?: Address): UseAllowanceReturn {
    const { address } = useAccount();
    const [allowanceBigInt, setAllowanceBigInt] = useState<BigInt>(BigInt(0));
    const [allowanceNumber, setAllowanceNumber] = useState<number>(0);
    const [decimals, setDecimals] = useState<number>(18);
    const [balanceBigInt, setBalanceBigInt] = useState<BigInt>(BigInt(0));
    const [balanceNumber, setBalanceNumber] = useState<number>(0);
    const [symbol, setSymbol] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [isLp, setIsLp] = useState<boolean>(false);
    const [domainSeparator, setDomainSeparator] = useState<string>('');
    const [permitTypehash, setPermitTypehash] = useState<string>('');
    const [nonces, setNonces] = useState<BigInt>(BigInt(0));

    const tokenContract = useMemo(() => ({
        abi: chewyLpAbi,
        address: tokenAddress,
    }), [tokenAddress]);

    const { data: allowanceData, refetch, isError, isLoading } = useReadContracts({
        allowFailure: false,
        query: { enabled: !!address },
        contracts: [
            { ...tokenContract, functionName: 'allowance', args: [address as Address, spenderAddress as Address] },
            { ...tokenContract, functionName: 'decimals' },
            { ...tokenContract, functionName: 'balanceOf', args: [address as Address] },
            { ...tokenContract, functionName: 'symbol' },
            { ...tokenContract, functionName: 'name' },
        ]
    });

    const { data: permitData, refetch: refetchPermit } = useReadContracts({
        allowFailure: false,
        query: { enabled: isLp },
        contracts: [
            { ...tokenContract, functionName: 'DOMAIN_SEPARATOR' },
            { ...tokenContract, functionName: 'PERMIT_TYPEHASH' },
            { ...tokenContract, functionName: 'nonces', args: [address as Address] },
        ]
    });

    const refresh = useCallback(() => {
        refetch();
        refetchPermit();
    }, [refetch, refetchPermit]);

    useEffect(() => {
        if (!address) return;

        if (allowanceData) {
            setAllowanceBigInt(allowanceData[0]);
            setAllowanceNumber(Number(formatUnits(allowanceData[0], allowanceData[1])));
            setDecimals(allowanceData[1]);
            setBalanceBigInt(allowanceData[2]);
            setBalanceNumber(Number(formatUnits(allowanceData[2], allowanceData[1])));
            setSymbol(allowanceData[3]);
            setName(allowanceData[4]);
            setIsLp(allowanceData[4].toLowerCase().includes('lp'));
        }
    }, [address, allowanceData]);

    useEffect(() => {
        if (!address) return;

        if (permitData) {
            setDomainSeparator(permitData[0]);
            setPermitTypehash(permitData[1]);
            setNonces(permitData[2]);
        }
    }, [address, permitData]);

    return {
        allowance: {
            bigInt: allowanceBigInt,
            number: allowanceNumber,
        },
        token: {
            balance: {
                bigInt: balanceBigInt,
                number: balanceNumber
            },
            isLp,
            permit: {
                domainSeparator,
                typehash: permitTypehash,
                nonces,
            },
            symbol,
            name,
            decimals,
        },
        refresh,
    };
}