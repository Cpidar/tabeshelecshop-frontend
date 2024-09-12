type Props = {
  params: { saleReferenceId: string }
}

export default function CallbackPage({ params }: Props) {
  return <p>{`شماره پیگیری ${params.saleReferenceId}`}</p>
}
