'use client'
import { Product } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Product['variants']>[number]>()

  const label = data?.data?.title ? `${data?.data?.title}` : 'Row'

  return <div>{label}</div>
}
