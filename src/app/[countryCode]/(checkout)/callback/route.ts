import { redirect } from "next/navigation"

export async function POST(request: Request) {
    const body = await request.json()

    const res = await fetch('/api/verify', {
        method: 'POST',
        body
    })

    const { countryCode, orderCode, resCode } = await res.json()
    if (resCode === 0) {

        // redirect(`/${countryCode}/order/confirmed/${orderCode}`)
        redirect(`/${countryCode}/checkout/verify/?orderId=${orderId}&saleOrderId=${saleOrderId}&saleReferenceId=${saleReferenceId}`)
    }
}


export async function GET(request: Request) {
    redirect('https://nextjs.org/')
}