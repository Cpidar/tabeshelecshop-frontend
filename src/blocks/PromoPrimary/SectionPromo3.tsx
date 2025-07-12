import React, { FC } from "react"
import NcImage from "@/components/NcImage/NcImage"
// import rightImgDemo from "@/images/promo3.png"
import backgroundLineSvg from "@/images/BackgroundLine.svg"
import Badge from "@/components/Badge/Badge"
import Input from "@/components/Input/Input"
import ButtonCircle from "@/components/Button/ButtonCircle"
import { PhoneOutgoingIcon } from "lucide-react"
import Image from "next/image"
import { PromoBlock } from "@/payload-types"
import RichText from "@/components/RichText"
import { Media } from "@/components/Media"

// export interface SectionPromo3Props {
//   className?: string
//   title: string
//   description: string
//   image: Media
//   imageDark: Media
// }

const SectionPromo3: FC<PromoBlock> = ({
  title,
  description,
  image,
  imageDark,
}) => {
  const className = "lg:pt-10"
  return (
    <div className={`nc-SectionPromo3 ${className}`}>
      <div className="relative flex flex-col lg:flex-row bg-slate-50 dark:bg-muted rounded-2xl sm:rounded-[40px] p-4 pb-0 sm:p-5 sm:pb-0 lg:p-24">
        <div className="absolute inset-0">
          <Image
            fill
            className="absolute w-full h-full object-contain object-bottom opacity-5"
            src={backgroundLineSvg}
            alt="backgroundLineSvg"
          />
        </div>

        <div className="lg:w-[50%] max-w-lg relative">
          <h2 className="font-semibold text-4xl md:text-5xl">{title}</h2>
          <span className="block mt-5 text-neutral-500 dark:text-muted-foreground">
            {description && (
              <RichText data={description} enableGutter={false} />
            )}
          </span>
          <ul className="space-y-4 mt-10">
            <li className="flex items-center">
              <Badge color="purple" name="01" />
              <span className="font-medium text-neutral-700 mr-4 dark:text-foreground">
                پرداخت امن
              </span>
            </li>
            <li className="flex items-center">
              <Badge name="02" />
              <span className="font-medium text-neutral-700 mr-4 dark:text-foreground">
                مشاوره و پشتیبانی رایگان
              </span>
            </li>
            <li className="flex items-center">
              <Badge color="red" name="03" />
              <span className="font-medium text-neutral-700 mr-4 dark:text-foreground">
                ارسال رایگان برای سفارشات بالای 5 میلیون تومان
              </span>
            </li>
          </ul>
          <form className="mt-10 relative max-w-sm">
            <Input
              required
              aria-required
              placeholder="09130277401"
              type="email"
              rounded="rounded-full"
            />

            <ButtonCircle
              type="submit"
              className="absolute transform top-1/2 -translate-y-1/2 left-1"
            >
              <PhoneOutgoingIcon className="w-6 h-6" />
            </ButtonCircle>
          </form>
        </div>
        {image && typeof image === "object" && (
          // <NcImage
          //   alt={image.alt ?? ""}
          //   containerClassName="relative block lg:absolute lg:ltr:right-0 lg:rtl:left-0 lg:bottom-0 mt-10 lg:mt-0 max-w-lg lg:max-w-[calc(50%-40px)]"
          //   src={image?.url as string}
          //   sizes="(max-width: 768px) 100vw, 50vw"
          //   className=""
          // />
          <Media
            htmlElement="div"
            className="relative block lg:absolute lg:ltr:right-0 lg:rtl:left-0 lg:bottom-0 mt-10 lg:mt-0 max-w-lg lg:max-w-[calc(50%-40px)]"
            // fill
            imgClassName="-z-10 object-cover w-full h-full"
            priority
            resource={image}
            size="(max-width: 768px) 100vw, 50vw"
            videoClassName="-z-10 object-cover absolute h-full w-full object-cover top-0 left-0"
          />
        )}
        {imageDark && typeof imageDark === "object" && (
          // <NcImage
          //   alt={imageDark.alt ?? ""}
          //   containerClassName="hidden dark:block relative lg:absolute lg:ltr:right-0 lg:rtl:left-0 lg:bottom-0 mt-10 lg:mt-0 max-w-lg lg:max-w-[calc(50%-40px)]"
          //   src={imageDark?.url as string}
          //   sizes="(max-width: 768px) 100vw, 50vw"
          //   className=""
          // />
          <Media
            htmlElement="div"
            className="hidden dark:block relative lg:absolute lg:ltr:right-0 lg:rtl:left-0 lg:bottom-0 mt-10 lg:mt-0 max-w-lg lg:max-w-[calc(50%-40px)]"
            // fill
            imgClassName="-z-10 object-cover w-full h-full"
            priority
            resource={imageDark}
            size="(max-width: 768px) 100vw, 50vw"
            videoClassName="-z-10 object-cover absolute h-full w-full object-cover top-0 left-0"
          />
        )}
      </div>
    </div>
  )
}

export default SectionPromo3
