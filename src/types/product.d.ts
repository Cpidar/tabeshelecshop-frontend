import { Media } from "@/payload-types";

export interface ProductVariantPrice {
  id?: string;
  currency_code: string;
  amount: number;
  min_quantity?: number;
  max_quantity?: number;
}

export interface ProductVariant {
  id?: string;
  title: string;
  sku: string;
  ean?: string;
  upc?: string;
  barcode?: string;
  inventory_quantity: number;
  allow_backorder?: boolean;
  manage_inventory?: boolean;
  hs_code?: string;
  origin_country?: string;
  mid_code?: string;
  material?: string;
  weight?: number;
  length?: number;
  height?: number;
  width?: number;
  metadata?: Record<string, any>;
  prices: ProductVariantPrice[];
  options?: {
    option_id: string;
    value: string;
  }[];
}

export interface ProductOption {
  id?: string;
  title: string;
  values: {
    value: string;
  }[];
}

export interface Product {
  id: number;
  title: string;
  subtitle?: string;
  handle: string;
  status: 'draft' | 'proposed' | 'published' | 'rejected';
  discountable: boolean;
  thumbnail?: Media;
  images?: Media[];
  type: 'regular' | 'giftcard';
  description?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
      }[];
      direction: 'ltr' | 'rtl' | null;
      format: string;
      indent: number;
      version: number;
    };
  };
  variants: ProductVariant[];
  options?: ProductOption[];
  weight?: number;
  length?: number;
  height?: number;
  width?: number;
  hs_code?: string;
  origin_country?: string;
  mid_code?: string;
  material?: string;
  collection_id?: number;
  tags?: { value: string }[];
  sales_channels?: { id: string }[];
  metadata?: Record<string, any>;
  updatedAt: string;
  createdAt: string;
}