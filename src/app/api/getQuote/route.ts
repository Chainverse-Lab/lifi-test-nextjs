import { NextRequest, NextResponse } from "next/server";
import { getQuote } from "@lifi/sdk";
import { initializeLiFi } from "@/lib/lifi";

initializeLiFi();

export async function POST(request: NextRequest) {
  const { fromChain, toChain, fromToken, toToken, fromAmount, fromAddress } =
    await request.json();

  try {
    const quote = await getQuote({
      fromChain: parseInt(fromChain),
      toChain: parseInt(toChain),
      fromToken,
      toToken,
      fromAmount,
      fromAddress,
    });

    return NextResponse.json(quote);
  } catch (error) {
    console.error("Error fetching quote:", error);
    return NextResponse.json(
      { error: "Error fetching quote", details: (error as Error).message },
      { status: 500 }
    );
  }
}
