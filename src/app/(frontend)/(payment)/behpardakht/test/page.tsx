import { Button } from "@medusajs/ui"
import BehpardakhtIcon from "@/components/Icons/BehpardakhtIcon"
export default function Test () {

  return (
    <>
      <form action="/behpardakht/callback" method="POST">
        <input type="hidden" value={'923C8C729C825473'} id="RefId" name="RefId" />
        <input type="hidden" value={0} id="ResCode" name="ResCode" />
        <input type="hidden" value={1726894760637} id="SaleOrderId" name="SaleOrderId" />
        <input type="hidden" value={285303460370} id="SaleReferenceId" name="SaleReferenceId" />
          <Button
          type="submit"
            variant="danger"
            disabled={false}
            isLoading={false}
            size="xlarge"
            data-testid="submit-order-button"
          >
            <BehpardakhtIcon />
            پرداخت
          </Button>
      </form>
    </>
  )
}
