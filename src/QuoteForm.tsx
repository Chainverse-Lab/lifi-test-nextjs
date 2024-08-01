"use client";

import { Chain } from "@lifi/sdk";
import { useState, FormEvent } from "react";
import { goerli, polygonMumbai } from "viem/chains";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

const testnetChains = {
  Goerli: goerli,
  Mumbai: polygonMumbai,
};

const testnetTokens: any = {
  [goerli.id]: {
    ETH: "0x0000000000000000000000000000000000000000",
    TEST: "0x7af963cF6D228E564e2A0aA0DdBF06210B38615D", // Goerli ETH
  },
  [polygonMumbai.id]: {
    MATIC: "0x0000000000000000000000000000000000000000",
    USDC: "0x0FA8781a83E46826621b3BC094Ea2A0212e71B23", // Mumbai USDC
  },
};

export default function QuoteForm({
  onQuoteReceived,
}: {
  onQuoteReceived: (quote: any) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [fromChain, setFromChain] = useState<Chain["id"]>(goerli.id);
  const [toChain, setToChain] = useState<Chain["id"]>(polygonMumbai.id);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/getQuote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || "Failed to fetch quote");
      }

      const quoteData = await response.json();
      onQuoteReceived(quoteData);
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        name="fromAddress"
        placeholder="From Address (Your Testnet Wallet)"
        className="w-full p-2 border"
        required
      />
      <select
        name="fromChain"
        className="w-full p-2 border"
        required
        onChange={(e) => setFromChain(parseInt(e.target.value))}
      >
        {Object.entries(testnetChains).map(([name, chain]) => (
          <option key={name} value={chain.id}>
            {name}
          </option>
        ))}
      </select>
      <select
        name="toChain"
        className="w-full p-2 border"
        required
        onChange={(e) => setToChain(parseInt(e.target.value))}
      >
        {Object.entries(testnetChains).map(([name, chain]) => (
          <option key={name} value={chain.id}>
            {name}
          </option>
        ))}
      </select>
      <select name="fromToken" className="w-full p-2 border" required>
        {Object.entries(testnetTokens[fromChain] as Record<string, string>).map(
          ([symbol, address]) => (
            <option key={symbol} value={address}>
              {symbol}
            </option>
          )
        )}
      </select>
      <select name="toToken" className="w-full p-2 border" required>
        {Object.entries(testnetTokens[toChain] as Record<string, string>).map(
          ([symbol, address]) => (
            <option key={symbol} value={address}>
              {symbol}
            </option>
          )
        )}
      </select>
      <Input
        type="text"
        name="fromAmount"
        placeholder="From Amount (e.g., 0.01)"
        className="w-full p-2 border"
        required
      />
      <Button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white"
        disabled={loading}
      >
        {loading ? "Loading..." : "Get Testnet Quote"}
      </Button>
    </form>
  );
}
