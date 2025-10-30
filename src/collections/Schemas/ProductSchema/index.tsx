import React from 'react'
import { Product } from '@/types/product'

interface ProductSchemaProps {
  product: Product
}

const ProductSchema: React.FC<ProductSchemaProps> = ({ product }) => {
  // Calculate offers from variants and their prices
  let offers
  if (product.variants?.length) {
    const allPrices = product.variants.flatMap(variant => 
      variant.prices.map(price => ({
        amount: price.amount,
        currency: price.currency_code
      }))
    )

    const pricesInIRR = allPrices.filter(p => p.currency === 'irr')
    const lowestPrice = Math.min(...pricesInIRR.map(p => p.amount))
    const highestPrice = Math.max(...pricesInIRR.map(p => p.amount))

    offers = {
      '@type': 'AggregateOffer',
      lowPrice: lowestPrice / 100, // Convert from cents to whole currency
      highPrice: highestPrice / 100,
      offerCount: product.variants.length,
      priceCurrency: 'IRR',
    }
  } else {
    // Fallback for products without variants (should not happen in MedusaJS v2)
    offers = {
      '@type': 'Offer',
      price: 0,
      priceCurrency: 'IRR',
      availability: 'https://schema.org/OutOfStock',
    }
  }

  const schemaData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images ? product.images.map(img => img.url) : undefined,
    sku: product.variants?.[0]?.sku || undefined,
    offers: offers,
    // Additional MedusaJS v2 specific fields
    weight: product.weight ? {
      '@type': 'QuantitativeValue',
      value: product.weight,
      unitText: 'g'
    } : undefined,
    height: product.height ? {
      '@type': 'QuantitativeValue',
      value: product.height,
      unitText: 'cm'
    } : undefined,
    width: product.width ? {
      '@type': 'QuantitativeValue',
      value: product.width,
      unitText: 'cm'
    } : undefined,
    depth: product.length ? {
      '@type': 'QuantitativeValue',
      value: product.length,
      unitText: 'cm'
    } : undefined,
  }

  return (
    <script
      type="application/ld+json"
      // JSON.stringify with 2 spaces indent for readability (optional)
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData, null, 2) }}
    />
  )
}

export default ProductSchema
