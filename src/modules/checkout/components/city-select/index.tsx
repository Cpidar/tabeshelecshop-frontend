import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react"

import NativeSelect, {
  NativeSelectProps,
} from "@modules/common/components/native-select"

const CitySelect = forwardRef<
  HTMLSelectElement,
  NativeSelectProps & {
    provinceId?: string
  }
>(({ placeholder = "City", provinceId, defaultValue, ...props }, ref) => {
  const innerRef = useRef<HTMLSelectElement>(null)

  useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
    ref,
    () => innerRef.current
  )

  const [data, setData] =
    useState<[{ id: string; name: string; slug: string }]>()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (provinceId) {
      fetch(
        `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/provinces/${provinceId}`
      )
        .then((res) => res.json())
        .then((data) => data?.provinces[0]?.cities)
        .then((data) => {
          setData(data)
          setLoading(false)
        })
    }
  }, [provinceId])
  console.log(data)
  const citiesOptions = useMemo(() => {
    if (!data) {
      return []
    }

    return data!.map((province) => ({
      value: province.id,
      label: province.name,
    }))
  }, [data])

  return (
    <NativeSelect
      ref={innerRef}
      placeholder={placeholder}
      defaultValue={citiesOptions[0]?.value}
      {...props}
    >
      {citiesOptions.map(({ value, label }, index) => (
        <option key={index} value={value}>
          {label}
        </option>
      ))}
    </NativeSelect>
  )
})

CitySelect.displayName = "CitySelect"

export default CitySelect
