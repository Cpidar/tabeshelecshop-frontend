import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getRegion, listRegions } from "@lib/data/regions"
import { sdk } from "@lib/config"

import ProductTemplate from "@modules/products/templates"
import ScrollToTop from "@/components/utils/scrollToTop"
import { getProductPrice } from "@/lib/util/get-product-price"
import { listProducts } from "@/lib/data/products"

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
}


export async function generateStaticParams() {
  try {
    const countryCodes = await listRegions().then((regions) =>
      regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
    )

    if (!countryCodes) {
      return []
    }

    const promises = countryCodes.map(async (country) => {
      const { response } = await listProducts({
        countryCode: country,
        queryParams: { limit: 100, fields: "handle" },
      })

      return {
        country,
        products: response.products,
      }
    })

    const countryProducts = await Promise.all(promises)

    return countryProducts
      .flatMap((countryData) =>
        countryData.products.map((product) => ({
          countryCode: countryData.country,
          handle: product.handle,
        }))
      )
      .filter((param) => param.handle)
  } catch (error) {
    console.error(
      `Failed to generate static paths for product pages: ${
        error instanceof Error ? error.message : "Unknown error"
      }.`
    )
    return []
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  let { handle, countryCode } = params
  handle = decodeURI(handle)
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const product = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle },
  }).then(({ response }) => response.products[0])
  
  if (!product) {
    notFound()
  }

  const { cheapestPrice } = getProductPrice({
    product,
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
      availability: product?.variants?.some(
        (v) => v.inventory_quantity && v.inventory_quantity > 0
      )
        ? "instock"
        : "outofstock",
    },
  }
}

export default async function ProductPage(props: Props) {
  const params = await props.params;
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }
  const pricedProduct = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle: params.handle },
  }).then(({ response }) => response.products[0])

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
