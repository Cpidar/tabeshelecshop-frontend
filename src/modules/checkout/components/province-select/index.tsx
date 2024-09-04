import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"

import NativeSelect, {
  NativeSelectProps,
} from "@modules/common/components/native-select"
import { Region } from "@medusajs/medusa"

const ProvinceSelect = forwardRef<
  HTMLSelectElement,
  NativeSelectProps & {
    region?: Region
  }
>(({ placeholder = "Province", region, defaultValue, ...props }, ref) => {
  const innerRef = useRef<HTMLSelectElement>(null)

  useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
    ref,
    () => innerRef.current
  )

  const [data, setData] = useState<{id: string; name: string; slug: string}[]>()
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/provinces`)
      .then((res) => res.json())
      .then(data => data.provinces)
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  const provinceOptions = useMemo(() => {
    if (!data) {
      return []
    }

    return data.map((province) => ({
      value: province.id,
      label: province.name,
    }))
  }, [data])

  return (
    <NativeSelect
      ref={innerRef}
      placeholder={placeholder}
      defaultValue={defaultValue || provinceOptions[0]?.value}
      {...props}
    >
      {provinceOptions.map(({ value, label }, index) => (
        <option key={index} value={value}>
          {label}
        </option>
      ))}
    </NativeSelect>
  )
})

ProvinceSelect.displayName = "ProvinceSelect"

export default ProvinceSelect
