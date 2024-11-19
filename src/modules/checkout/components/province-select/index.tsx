import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"

import NativeSelect, {
  NativeSelectProps,
} from "@modules/common/components/native-select"
import { Region } from "@medusajs/medusa"

const ProvinceSelect = forwardRef<
  HTMLSelectElement,
  NativeSelectProps & {
    region?: Region;
    provinceOptions: any
  }
>(({ placeholder = "Province", region, defaultValue, provinceOptions, ...props }, ref) => {
  const innerRef = useRef<HTMLSelectElement>(null)

  useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
    ref,
    () => innerRef.current
  )

  const [isLoading, setLoading] = useState(true)
 




  return (
    <NativeSelect
      ref={innerRef}
      placeholder={placeholder}
      defaultValue={defaultValue || provinceOptions[0]?.label}
      {...props}
    >
      {provinceOptions.map(({ value, label }, index) => (
        <option key={index} value={label}>
          {label}
        </option>
      ))}
    </NativeSelect>
  )
})

ProvinceSelect.displayName = "ProvinceSelect"

export default ProvinceSelect
