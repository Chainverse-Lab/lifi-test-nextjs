"use client";

import { useState } from "react";
import QuoteForm from "@/QuoteForm";
import { Widget } from "@/Widget";

export default function Home() {
  const [quoteData, setQuoteData] = useState<any>(null);

  return (
    <main className="max-w-2xl mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4">LI.FI Testnet Quote Request</h1>
      <QuoteForm onQuoteReceived={setQuoteData} />
      {quoteData && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Quote Result:</h2>
          <pre className="bg-gray-100 p-4 mt-2 overflow-x-auto">
            {JSON.stringify(quoteData, null, 2)}
          </pre>
        </div>
      )} */}
      <Widget />
    </main>
  );
}
