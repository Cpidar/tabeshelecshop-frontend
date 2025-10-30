'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ProductCategory } from '@/payload-types'
import { Product } from '@/types/product'

interface SingleProductProps {
  product: Product
}

const SingleProduct: React.FC<SingleProductProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)

  // ---------- pick the image URL ----------
  let imageUrl = ''
  if (product.thumbnail?.url) {
    imageUrl = product.thumbnail.url
  } else if (product.images?.[0]?.url) {
    imageUrl = isHovered && product.images[1]?.url 
      ? product.images[1].url 
      : product.images[0].url
  }

  // ---------- build the link ----------
  const categorySlug = (product.collection_id as unknown as ProductCategory)?.slug ?? '' // fallback if not present

  return (
    <li
      className="border border-border rounded-lg p-4 bg-card list-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/categories/${categorySlug}/${product.handle}`}>
        <div className="w-full h-80 relative mb-4">
          <Image
            src={imageUrl}
            alt={`${product.title} Image`}
            fill
            className="rounded-lg transition-all duration-300 ease-in-out object-cover"
          />
        </div>

        <h2 className="text-xl font-semibold">{product.title}</h2>
        
        {product.subtitle && (
          <p className="text-sm text-muted-foreground">{product.subtitle}</p>
        )}

        {product.description && (
          <div className="my-2 text-gray-600 text-sm">
            {/* TODO: Render your rich-text description */}
          </div>
        )}

        {Array.isArray(product.variants) && product.variants.length > 0 && (
          <p>
            From&nbsp;
            <span className="font-bold text-2xl">
              {product.variants[0].prices[0]?.currency_code.toUpperCase()}&nbsp;
              {(product.variants[0].prices[0]?.amount || 0) / 100}
            </span>
          </p>
        )}

        <div className="mt-2 text-sm text-muted-foreground">
          {product.status === 'draft' && <span className="text-yellow-600">Draft</span>}
          {product.status === 'published' && <span className="text-green-600">Published</span>}
        </div>
      </Link>
    </li>
  )
}

export default SingleProduct
