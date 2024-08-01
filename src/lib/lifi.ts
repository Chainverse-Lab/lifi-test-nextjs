import { createConfig, EVM } from "@lifi/sdk";
import type { Chain } from "viem";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { goerli, polygonMumbai } from "viem/chains";

const PRIVATE_KEY =
  process.env.WALLET_PRIVATE_KEY || "YOUR_TESTNET_PRIVATE_KEY_HERE";

const account = privateKeyToAccount(PRIVATE_KEY as `0x${string}`);
const testnetChains = [goerli, polygonMumbai];

export function initializeLiFi() {
  const client = createWalletClient({
    account,
    chain: goerli,
    transport: http(),
  });

  createConfig({
    integrator: "TEST",
    providers: [
      EVM({
        getWalletClient: async () => client,
        switchChain: async (chainId) =>
          createWalletClient({
            account,
            chain: testnetChains.find((chain) => chain.id === chainId) as Chain,
            transport: http(),
          }),
      }),
    ],
  });
}
