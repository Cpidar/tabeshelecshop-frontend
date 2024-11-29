import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import rightImgDemo from "@/images/hero-right.png";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Logo from "@/components/Logo/Logo";
import backgroundLineSvg from "@/images/Moon.svg";
import Image from "next/image";

export interface SectionPromo2Props {
  className?: string;
}

const SectionPromo2: FC<SectionPromo2Props> = ({ className = "lg:pt-10" }) => {
  return (
    <div className={`nc-SectionPromo2 ${className}`}>
      <div className="relative flex flex-col lg:flex-row lg:justify-end bg-yellow-50 dark:bg-slate-800 rounded-2xl sm:rounded-[40px] p-4 pb-0 sm:p-5 sm:pb-0 lg:p-24">
        <div className="absolute inset-0">
          <Image
            fill
            className="absolute w-full h-full object-contain dark:opacity-5"
            src={backgroundLineSvg}
            alt="backgroundLineSvg"
          />
        </div>

        <div className="lg:w-[45%] max-w-lg relative">
          <Logo className="w-28" />
          <h2 className="font-semibold text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl mt-6 sm:mt-10 !leading-[1.13] tracking-tight">
            تخفیفات شگفت انگیز <br />
            در بخش لامپ، پنل و ریسه
          </h2>
          <span className="block mt-6 text-slate-500 dark:text-slate-400">
          فقط برای مدت محدود! از تخفیف‌های استثنایی ما در محصولات لامپ، پنل و ریسه بهره‌مند شوید.

          </span>
          <div className="flex space-x-2 sm:space-x-5 mt-6 sm:mt-12">
            <ButtonPrimary
              href="/search"
              className="dark:bg-slate-200 dark:text-slate-900"
            >
              مشاهده کنید
            </ButtonPrimary>
          </div>
        </div>

        <NcImage
          alt=""
          containerClassName="relative block lg:absolute ltr:lg:left-0 rtl:lg:right-0 lg:bottom-0 mt-10 lg:mt-0 max-w-xl lg:max-w-[calc(55%-40px)]"
          src={rightImgDemo}
          sizes="(max-width: 768px) 100vw, 50vw"
          className=""
        />
      </div>
    </div>
  );
};

export default SectionPromo2;
