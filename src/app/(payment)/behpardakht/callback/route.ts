import { redirect } from "next/navigation"

export async function POST(request: Request) {
  const resText = await request.text()
  // sample response: "RefId=923C8C729C825473&ResCode=0&SaleOrderId=1726894760637&SaleReferenceId=285303460370&CardHolderInfo=4C4098D60630906B77453B7F681F58F107A675EC339A5DE5E465D1AE2C4FB46A&CardHolderPan=610433******5978&FinalAmount=68000"

  console.log(resText)
  redirect(`/behpardakht/confirmation?${resText}`)
}
