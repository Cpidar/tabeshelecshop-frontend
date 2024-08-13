"use client"

import { Product } from "@/data/data";
import NotifyAddTocart from "../add-to-card-notification/NotifyAddToCart";

export const RenderSizeList = ({
    sizes,
    data
}: {
    sizes: string[];
    data: Product
}) => {
    if (!sizes || !sizes.length) {
      return null;
    }

    return (
      <div className="absolute bottom-0 inset-x-1 space-x-1.5 rtl:space-x-reverse flex justify-center opacity-0 invisible group-hover:bottom-4 group-hover:opacity-100 group-hover:visible transition-all">
        {sizes.map((size, index) => {
          return (
            <div
              key={index}
              className="nc-shadow-lg w-10 h-10 rounded-xl bg-white hover:bg-slate-900 hover:text-white transition-colors cursor-pointer flex items-center justify-center uppercase font-semibold tracking-tight text-sm text-slate-900"
              onClick={() => NotifyAddTocart({ quantity: 1, size, data })}
            >
              {size}
            </div>
          );
        })}
      </div>
    );
  };