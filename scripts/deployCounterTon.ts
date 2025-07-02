import { toNano } from '@ton/core';
import { CounterTon } from '../build/CounterTon/CounterTon_CounterTon';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const counterTon = provider.open(await CounterTon.fromInit(BigInt(Math.floor(Math.random() * 10000)), 0n));

    await counterTon.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        null,
    );

    await provider.waitForDeploy(counterTon.address);

    console.log('ID', await counterTon.getId());
}
