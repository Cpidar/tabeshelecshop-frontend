import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import rightImgDemo from "@/images/promo3.png";
import backgroundLineSvg from "@/images/BackgroundLine.svg";
import Badge from "@/shared/Badge/Badge";
import Input from "@/shared/Input/Input";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import { PhoneArrowUpRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export interface SectionPromo3Props {
  className?: string;
}

const SectionPromo3: FC<SectionPromo3Props> = ({ className = "lg:pt-10" }) => {
  return (
    <div className={`nc-SectionPromo3 ${className}`}>
      <div className="relative flex flex-col lg:flex-row bg-slate-50 dark:bg-slate-800 rounded-2xl sm:rounded-[40px] p-4 pb-0 sm:p-5 sm:pb-0 lg:p-24">
        <div className="absolute inset-0">
          <Image
            fill
            className="absolute w-full h-full object-contain object-bottom dark:opacity-5"
            src={backgroundLineSvg}
            alt="backgroundLineSvg"
          />
        </div>

        <div className="lg:w-[50%] max-w-lg relative">
          <h2 className="font-semibold text-4xl md:text-5xl">
            {`چرا فروشگاه تابش الکتریک`}
          </h2>
          <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
          هدف از ایجاد این فروشگاه دسترسی آسان و سریع نسبت به محصولات الکتریکی و اطلاع از قیمت های فروشگاه می باشد .
          </span>
          <ul className="space-y-4 mt-10">
            <li className="flex items-center">
              <Badge color="purple" name="01" />
              <span className="font-medium text-neutral-700 mr-4 dark:text-neutral-300">
                پرداخت امن
              </span>
            </li>
            <li className="flex items-center">
              <Badge name="02" />
              <span className="font-medium text-neutral-700 mr-4 dark:text-neutral-300">
                مشاوره و پشتیبانی رایگان
              </span>
            </li>
            <li className="flex items-center">
              <Badge color="red" name="03" />
              <span className="font-medium text-neutral-700 mr-4 dark:text-neutral-300">
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
              <PhoneArrowUpRightIcon className="w-6 h-6" />
            </ButtonCircle>
          </form>
        </div>

        <NcImage
          alt=""
          containerClassName="relative block lg:absolute lg:ltr:right-0 lg:rtl:left-0 lg:bottom-0 mt-10 lg:mt-0 max-w-lg lg:max-w-[calc(50%-40px)]"
          src={rightImgDemo}
          sizes="(max-width: 768px) 100vw, 50vw"
          className=""
        />
      </div>
    </div>
  );
};

export default SectionPromo3;
