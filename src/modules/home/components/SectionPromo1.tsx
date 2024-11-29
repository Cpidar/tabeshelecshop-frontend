import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import rightImgDemo from "@/images/rightLargeImg.png";
import rightLargeImgDark from "@/images/rightLargeImgDark.png";
import ToolsImage from "@/images/tools-img-construction.webp";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Logo from "@/components/Logo/Logo";
import ButtonSecondary from "@/components/Button/ButtonSecondary";

export interface SectionPromo1Props {
  className?: string;
}

const SectionPromo1: FC<SectionPromo1Props> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionPromo1 relative flex flex-col lg:flex-row items-center ${className}`}
    >
      <div className="relative flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-3/5">
        <Logo className="w-28" />
        <h2 className="font-semibold text-2xl sm:text-3xl xl:text-4xl 2xl:text-5xl mt-6 sm:mt-10 !leading-[1.2] tracking-tight">
        انواع ترموستات<br /> و تجهیزات مشعل
        </h2>
        <span className="block mt-6 text-slate-500 dark:text-slate-400 ">
        کلیه وسایل مشعل های بخاری و ترموستات های آنالوگ و دیجیتال جهت کنترل دمای مطلوب خانه و سالن های گلخانه و مرغداری ها و... 
        </span>
        <div className="flex space-x-2 sm:space-x-5 mt-6 sm:mt-12">
          <ButtonPrimary href="/collection" className="">
            خرید کنید
          </ButtonPrimary>
          <ButtonSecondary
            href="/search"
            className="border border-slate-100 dark:border-slate-700"
          >
            در موردشان بخوانید
          </ButtonSecondary>
        </div>
      </div>
      <div className="relative flex-1 max-w-xl lg:max-w-none">
        <NcImage
          alt=""
          containerClassName="block dark:hidden"
          src={ToolsImage}
          sizes="(max-width: 768px) 100vw, 50vw"
          className=""
        />
        <NcImage
          alt=""
          containerClassName="hidden dark:block"
          src={ToolsImage}
          sizes="(max-width: 768px) 100vw, 50vw"
          className=""
        />
      </div>
    </div>
  );
};

export default SectionPromo1;
