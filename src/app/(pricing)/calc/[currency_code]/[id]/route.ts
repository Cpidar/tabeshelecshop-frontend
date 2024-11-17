import { NextResponse } from "next/server"

import {
  initialize as initializePricingModule,
} from "@medusajs/pricing"

type ContextType = {
  params: {
    id: string
    currency_code: string
  }
}

export async function GET(
  request: Request,
  { params }: ContextType
) {
    console.log(params)
  const pricingService = await initializePricingModule()

  const price = await pricingService.calculatePrices({
    id: [params.id],
  }, {
    context: {
      currency_code: params.currency_code,
    },
  })

  return NextResponse.json({ price })
}