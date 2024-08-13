"use client"

import { Route } from "@/@types/router";
import { Popover, Transition } from "@/app/headlessui"
import { ChevronDownIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { Fragment } from "react"
import CategoryMenu from "./CategoryMenu"
import { Bars3Icon } from "@heroicons/react/24/outline"

interface SolutionItem {
  id: number
  name: string
  description: string
  href?: Route
  icon: any
  active?: boolean
}

const CATEGORIES: any[] = [
  {
    id: 1,
    name: "Fresh Vegetables",
    slug: "fresh-vegetables",
    image: {
      id: 1,
      thumbnail: "/assets/images/category/fresh-vegetables.png",
      original: "/assets/images/category/fresh-vegetables.png"
    },
    icon: "/assets/images/category/icon/fresh-vegetables.svg",
    children: [
      {
        id: 1,
        name: "Arugula",
        slug: "arugula"
      },
      {
        id: 2,
        name: "Asparagus",
        slug: "asparagus"
      },
      {
        id: 3,
        name: "Beets",
        slug: "beets"
      },
      {
        id: 4,
        name: "Cabbages",
        slug: "cabbages"
      }
    ]
  },
  {
    id: 2,
    name: "Diet Foods",
    slug: "diet-foods",
    image: {
      id: 1,
      thumbnail: "/assets/images/category/diet-foods.png",
      original: "/assets/images/category/diet-foods.png"
    },
    icon: "/assets/images/category/icon/diet-foods.svg",
    children: [
      {
        id: 1,
        name: "Whole Eggs",
        slug: "whole-eggs"
      },
      {
        id: 2,
        name: "Boiled Potatoes",
        slug: "boiled-potatoes"
      }
    ]
  },
  {
    id: 3,
    name: "Diet Nutrition",
    slug: "diet-nutrition",
    image: {
      id: 1,
      thumbnail: "/assets/images/category/diet-nutrition.png",
      original: "/assets/images/category/diet-nutrition.png"
    },
    icon: "/assets/images/category/icon/diet-nutrition.svg"
  },
  {
    id: 4,
    name: "Fast Food Items",
    slug: "fast-food-items",
    image: {
      id: 1,
      thumbnail: "/assets/images/category/fast-food.png",
      original: "/assets/images/category/fast-food.png"
    },
    icon: "/assets/images/category/icon/fast-food.svg",
    children: [
      {
        id: 1,
        name: "Burger",
        slug: "burger"
      },
      {
        id: 2,
        name: "Beef Sandwich",
        slug: "beef-sandwich"
      },
      {
        id: 3,
        name: "Burrito Supreme",
        slug: "burrito-supreme"
      }
    ]
  },
  {
    id: 5,
    name: "Fruits Items",
    slug: "fruits-items",
    image: {
      id: 1,
      thumbnail: "/assets/images/category/fruits-items.png",
      original: "/assets/images/category/fruits-items.png"
    },
    icon: "/assets/images/category/icon/fruits-items.svg",
    children: [
      {
        id: 1,
        name: "Apples",
        slug: "apples"
      },
      {
        id: 2,
        name: "Melons",
        slug: "melons"
      },
      {
        id: 3,
        name: "Berries",
        slug: "berries"
      },
      {
        id: 4,
        name: "Citrus",
        slug: "citrus"
      }
    ]
  },
  {
    id: 6,
    name: "Healthy Foods",
    slug: "healthy-foods",
    image: {
      id: 1,
      thumbnail: "/assets/images/category/healthy-foods.png",
      original: "/assets/images/category/healthy-foods.png"
    },
    icon: "/assets/images/category/icon/healthy-foods.svg"
  },
  {
    id: 7,
    name: "Grocery Items",
    slug: "grocery-items",
    image: {
      id: 1,
      thumbnail: "/assets/images/category/grocery-items.png",
      original: "/assets/images/category/grocery-items.png"
    },
    icon: "/assets/images/category/icon/grocery-items.svg"
  },
  {
    id: 8,
    name: "Quality Milk",
    slug: "quality-milk",
    image: {
      id: 1,
      thumbnail: "/assets/images/category/quality-milk.png",
      original: "/assets/images/category/quality-milk.png"
    },
    icon: "/assets/images/category/icon/quality-milk.svg",
    children: [
      {
        id: 1,
        name: "Boiled Milk",
        slug: "boiled-milk"
      },
      {
        id: 2,
        name: "Mixed Milk",
        slug: "mixed-milk"
      }
    ]
  },
  {
    id: 9,
    name: "Cold Drinks",
    slug: "cold-drinks",
    image: {
      id: 1,
      thumbnail: "/assets/images/category/cold-drinks.png",
      original: "/assets/images/category/cold-drinks.png"
    },
    icon: "/assets/images/category/icon/cold-drinks.svg",
    children: [
      {
        id: 1,
        name: "Fruit Juice",
        slug: "fruit-juice"
      },
      {
        id: 2,
        name: "Ice Coffee",
        slug: "ice-coffee"
      },
      {
        id: 3,
        name: "Punch",
        slug: "punch"
      }
    ]
  },
  {
    id: 10,
    name: "Beaf Steak",
    slug: "beaf-steak",
    image: {
      id: 1,
      thumbnail: "/assets/images/category/beaf-steak.png",
      original: "/assets/images/category/beaf-steak.png"
    },
    icon: "/assets/images/category/icon/beaf-steak.svg"
  },
  {
    id: 11,
    name: "Vitamin Items",
    slug: "vitamin-items",
    image: {
      id: 1,
      thumbnail: "/assets/images/category/vitamin-items.png",
      original: "/assets/images/category/vitamin-items.png"
    },
    icon: "/assets/images/category/icon/vitamin-items.svg"
  },
  {
    id: 12,
    name: "Raw Chicken",
    slug: "raw-chicken",
    image: {
      id: 1,
      thumbnail: "/assets/images/category/raw-chicken.png",
      original: "/assets/images/category/raw-chicken.png"
    },
    icon: "/assets/images/category/icon/raw-chicken.svg",
    children: [
      {
        id: 1,
        name: "Chicken leg",
        slug: "chicken-leg"
      },
      {
        id: 2,
        name: "Chicken wing",
        slug: "chicken-wing"
      },
      {
        id: 3,
        name: "Chicken breast",
        slug: "chicken-breast"
      }
    ]
  },
  {
    id: 13,
    name: "Breakfast Item",
    slug: "breakfast-item",
    image: {
      id: 1,
      thumbnail: "/assets/images/category/breakfast-item.png",
      original: "/assets/images/category/breakfast-item.png"
    },
    icon: "/assets/images/category/icon/breakfast-item.svg",
    children: [
      {
        id: 1,
        name: "Pancake",
        slug: "pancake"
      },
      {
        id: 2,
        name: "Coffee",
        slug: "coffee"
      },
      {
        id: 3,
        name: "Sausage",
        slug: "sausage"
      }
    ]
  },
  {
    id: 14,
    name: "Fish Items",
    slug: "fish-items",
    image: {
      id: 1,
      thumbnail: "/assets/images/category/fish-items.png",
      original: "/assets/images/category/fish-items.png"
    },
    icon: "/assets/images/category/icon/fish-items.svg"
  },
  {
    id: 15,
    name: "Green Vegetables",
    slug: "green-vegetables",
    image: {
      id: 1,
      thumbnail: "/assets/images/category/green-vegetables.png",
      original: "/assets/images/category/green-vegetables.png"
    },
    icon: "/assets/images/category/icon/green-vegetables.svg"
  },
  {
    id: 16,
    name: "Cookies & Biscuits",
    slug: "cookies-biscuits",
    image: {
      id: 1,
      thumbnail: "/assets/images/category/cookies-biscuits.png",
      original: "/assets/images/category/cookies-biscuits.png"
    },
    icon: "/assets/images/category/icon/cookies-biscuits.svg"
  },
  {
    id: 17,
    name: "Frozen Desserts",
    slug: "frozen-desserts",
    image: {
      id: 1,
      thumbnail: "/assets/images/category/breakfast-item.png",
      original: "/assets/images/category/breakfast-item.png"
    },
    icon: "/assets/images/category/icon/frozen-desserts.svg"
  },
  {
    id: 18,
    name: "Deli Meat",
    slug: "deli-meat",
    image: {
      id: 1,
      thumbnail: "/assets/images/category/cookies-biscuits.png",
      original: "/assets/images/category/cookies-biscuits.png"
    },
    icon: "/assets/images/category/icon/deli-meat.svg"
  }
]

export default function DropdownCategories2() {
  return (
    <div className="DropdownCategories">
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button className="bg-yellow-400 hover:bg-gray-700 font-bold uppercase px-4 xl:px-6 py-2 xl:py-3 rounded flex-shrink-0 flex items-center">
              {/* <svg
                className="h-8 p-1"
                aria-hidden="true"
                focusable="false"
                data-prefix="fal"
                data-icon="bars"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M442 114H6a6 6 0 0 1-6-6V84a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6z"
                  className
                />
              </svg> */}
              <Bars3Icon className="h-8 p-1" />
              <span className="ml-4">shop by category</span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-40 w-80 mt-3.5 transform -translate-x-1/2 left-1/2 sm:px-0">
                <CategoryMenu items={CATEGORIES} depth={2} />
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
