import { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  getProductByHandle,
  getProductsList,
  getRegion,
  listRegions,
  retrievePricedProductById,
} from "@lib/data"
import { Region } from "@medusajs/medusa"
import ProductTemplate from "@modules/products/templates"
import ScrollToTop from "@/shared/utils/scrollToTop"
import { getProductPrice } from "@/lib/util/get-product-price"

type Props = {
  params: { countryCode: string; handle: string }
}

const getPricedProductByHandle = async (slug: string, region: Region) => {
  const handle = decodeURI(slug)
  const { product } = await getProductByHandle(handle).then(
    (product) => product
  )

  if (!product || !product.id) {
    return null
  }

  const pricedProduct = await retrievePricedProductById({
    id: product.id,
    regionId: region.id,
  })

  return pricedProduct
}

export async function generateStaticParams() {
  const countryCodes = await listRegions().then((regions) =>
    regions?.map((r) => r.countries.map((c) => c.iso_2)).flat()
  )

  if (!countryCodes) {
    return null
  }

  const products = await Promise.all(
    countryCodes.map((countryCode) => {
      return getProductsList({ countryCode })
    })
  ).then((responses) =>
    responses.map(({ response }) => response.products).flat()
  )

  const staticParams = countryCodes
    ?.map((countryCode) =>
      products.map((product) => ({
        countryCode,
        handle: product.handle,
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let { handle, countryCode } = params
  handle = decodeURI(handle)
  const region = await getRegion(countryCode)

  if (!region) {
    notFound()
  }

  const product = await getPricedProductByHandle(handle, region)

  if (!product) {
    notFound()
  }

  const { cheapestPrice } = getProductPrice({
    product,
    region,
  })

  return {
    title: `${product.title} | ${process.env.SITE_NAME}`,
    description: `${product.title}`,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title: `${product.title} | ${process.env.SITE_NAME}`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
    other: {
      product_id: product.id!,
      product_name: product.title!,
      product_price: cheapestPrice?.calculated_price_number!,
      product_old_price: cheapestPrice?.original_price_number!,
      availability: product.variants.some(
        (v) => v.inventory_quantity && v.inventory_quantity > 0
      )
        ? "instock"
        : "outofstock",
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }
  const pricedProduct = await getPricedProductByHandle(params.handle, region)

  if (!pricedProduct) {
    notFound()
  }

  return (
    <>
      <ScrollToTop />
      <ProductTemplate
        product={pricedProduct}
        region={region}
        countryCode={params.countryCode}
      />
    </>
  )
}
