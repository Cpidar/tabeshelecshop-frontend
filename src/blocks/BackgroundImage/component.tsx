import { Media } from '@/payload-types'
import Image from 'next/image'

const BackgroundImageBlock = ({ image }: { image: Media }) => {
  return (
    <Image
      src={image.url as string}
      alt={image.alt ?? 'Background Image'}
      fill
      className="object-cover w-11/12 z-[-1] opacity-25 top-[550px]! h-[calc(100%-550px)]!"
    />
  )
}

export default BackgroundImageBlock
