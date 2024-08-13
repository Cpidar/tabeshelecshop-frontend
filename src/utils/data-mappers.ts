// import { Category, Collection, Order, OrderItem, Product } from "@framework/types";
import { ProductCategory, ProductCollection, Order as MedusaOrderType, LineItem, Customer, Address as MedusaAddressType } from "@medusajs/medusa";
import { RegionInfo } from "types/global";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import type { Address } from 'types';
import { Product } from "@/data/data";
import { getProductPrice } from "@/lib/util/get-product-price";

export const transformMedusaProduct = (medusaProduct: PricedProduct, regionInfo: RegionInfo): Product => {
    const { cheapestPrice, variantPrice } = getProductPrice({ product: medusaProduct, region: regionInfo} )
    return {
        id: medusaProduct.id as string,
        name: medusaProduct.title  as string,
        slug: medusaProduct.handle as string,
        price: cheapestPrice?.original_price!,
        quantity: medusaProduct.variants[0]?.inventory_quantity as number,
        // sold: 0,
        // unit: process.env.CURRENCY_UNIT as string,
        sale_price: cheapestPrice?.calculated_price!,
        status: cheapestPrice?.percentage_diff,
        // min_price: cheapestPrice?.calculated_price,
        // max_price: 0,
        thumbnail: medusaProduct.thumbnail as string,
        // sku: '',
        // gallery: medusaProduct.images?.map(i => ({id: i.id, origin: i.url, thumbnail: i.url})),
        category: medusaProduct.categories ? medusaProduct.categories[0].name : undefined,
        product_type: medusaProduct.variants.length > 1 ? 'variable' : 'simple',
        // tag: [],
        // meta: [],
        // brand: undefined,
        description: medusaProduct.description as string,
        variants: medusaProduct.variants.map(v => ({
          id: v.id,
          name: v.title,
        })),
      };
}

// export const transformMedusaCategory = (medusaCat: ProductCategory): Category => {
//   return {
//     id: medusaCat.id,
//     name: medusaCat.name,
//     slug: medusaCat.handle
//   }
// }

// export const transformMedusaCollection = (medusaCollection: ProductCollection): Collection => {
//   return {
//     id: medusaCollection.id,
//     name: medusaCollection.title,
//     slug: medusaCollection.handle
//   }
// }

// export const transformMedusaLineItems = (medusaOrderItem: LineItem): Partial<Item> => ({
//   id: medusaOrderItem.variant_id!,
//   lineItemId: medusaOrderItem.id,
//   price: medusaOrderItem.total as number,
//   quantity: medusaOrderItem.quantity,
// })

// export const transformMedusaOrder = (medusaOrder: MedusaOrderType): Order => ({
//   id: medusaOrder.id,
//   name: medusaOrder.display_id,
//   products: medusaOrder.items.map(item => transformMedusaOrderItems(item)),
//   total: medusaOrder.total,
//   tracking_number: medusaOrder.display_id,
//   customer: {
//     id: medusaOrder.customer_id,
//     email: medusaOrder.customer.email,
//   },
//   shipping_fee: medusaOrder.shipping_total,
//   payment_gateway: medusaOrder.payment_status
// })

// export const transformMedusaCustomer = (medusaCustomer: Omit<Customer, "password_hash">) => ({
//   shipping_addresses: medusaCustomer.shipping_addresses.map(a => ({

//   }))
// })
 
// export const transformAddress = (medusaAddress: Address) => ({
//   title: medusaAddress.metadata?.title as string,
//   address: `${medusaAddress.province}, ${medusaAddress.city}, ${medusaAddress.address_1}, ${medusaAddress.address_2}`
// })

export const formatMedusaAddress = (medusaAddress: MedusaAddressType, type: AddressType): Address => ({
  id: medusaAddress.id,
  title: medusaAddress.metadata?.title as string,
  type,
  address: {
    country: medusaAddress.country_code || '',
    city: medusaAddress.city || '',
    province: medusaAddress.province || '',
    zip: medusaAddress.postal_code || '',
    street_address: medusaAddress.address_1 || ''
  }
})