import { Product } from "@medusajs/medusa"
import { Metadata } from "next"

import { getCollectionsList, getProductsList, getRegion } from "@lib/data"
import { ProductCollectionWithPreviews } from "types/global"
import { cache } from "react"
import React from "react"
import SectionHowItWork from "@/modules/home/components/SectionHowItWork/SectionHowItWork"
import BackgroundSection from "@/modules/home/components/BackgroundSection/BackgroundSection"
import SectionPromo1 from "@/modules/home/components/SectionPromo1"
import SectionSliderProductCard from "@/modules/home/components/SectionSliderProductCard"
import SectionPromo2 from "@/modules/home/components/SectionPromo2"
import SectionSliderCategories from "@/modules/home/components/SectionSliderCategories/SectionSliderCategories"
import SectionPromo3 from "@/modules/home/components/SectionPromo3"
import Heading from "@/components/Heading/Heading"
import ButtonSecondary from "@/shared/Button/ButtonSecondary"
import SectionMagazine5 from "@/modules/blog/SectionMagazine5"
import ProductCard from "@modules/products/components/product-preview/ProductCard"
import SectionHero4, {
  SectionHeroProps,
} from "@/modules/home/components/SectionHero/SectionHero4"
import initTranslations from "@/app/i18n"
import TranslationsProvider from "@/modules/translationProvider/TranslationsProvider"
import { createReader } from "@keystatic/core/reader"
import keystaticConfig from "../../../../keystatic.config"

const reader = createReader(process.cwd(), keystaticConfig)

export async function generateMetadata(): Promise<Metadata> {
  const settings = await reader.singletons.settings.read()

  return {
    title: settings?.SEO.siteTitle || "Medusa Next.js Starter Template",
    description:
      settings?.SEO.description ||
      "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
    openGraph: {
      type: "website",
    },
  }
}

const i18nNamespaces = ["common"]

const getCollectionsWithProducts = cache(
  async (
    countryCode: string
  ): Promise<ProductCollectionWithPreviews[] | null> => {
    const { collections } = await getCollectionsList(0, 8)

    if (!collections) {
      return null
    }

    const collectionIds = collections.map((collection) => collection.id)

    await Promise.all(
      collectionIds.map((id) =>
        getProductsList({
          queryParams: { collection_id: [id] },
          countryCode,
        })
      )
    ).then((responses) =>
      responses.forEach(({ response, queryParams }) => {
        let collection

        if (collections) {
          collection = collections.find(
            (collection) => collection.id === queryParams?.collection_id?.[0]
          )
        }

        if (!collection) {
          return
        }

        collection.products = response.products as unknown as Product[]
      })
    )

    return collections as unknown as ProductCollectionWithPreviews[]
  }
)

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  // from keystatic cms
  const homepageContent = await reader.singletons.homepage.read()

  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)
  const { t, resources } = await initTranslations(countryCode, i18nNamespaces)

  if (!collections || !region) {
    return null
  }

  return (
    <TranslationsProvider
      locale={countryCode}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      <div className="nc-PageHome2 relative overflow-hidden">
        {/* <div className="container px-4"> */}
        <SectionHero4
          sliderHero={
            homepageContent?.homePageHeroSlider as unknown as SectionHeroProps[]
          }
          rightHero={
            homepageContent?.homePageHeroRight as unknown as SectionHeroProps
          }
        />
        {/* </div> */}

        <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
          <SectionSliderCategories />

          <SectionSliderProductCard heading={collections[0].title}>
            {collections[0] &&
              collections[0]?.products.map((item, index) => (
                <li key={index} className="glide__slide">
                  <ProductCard productPreview={item} region={region} />
                </li>
              ))}
          </SectionSliderProductCard>

          <SectionPromo1 className="bg-gray-50" />
          {/* 
        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <SectionGridMoreExplore />
        </div> */}

          <SectionSliderProductCard
            heading={collections[1].title}
            subHeading=""
          >
            {collections[1].products.map((item, index) => (
              <li key={index} className="glide__slide">
                <ProductCard productPreview={item} region={region} />
              </li>
            ))}
          </SectionSliderProductCard>

          <SectionSliderProductCard heading={collections[2].title}>
            {collections[2].products.map((item, index) => (
              <li key={index} className="glide__slide">
                <ProductCard productPreview={item} region={region} />
              </li>
            ))}
          </SectionSliderProductCard>

          <SectionSliderProductCard heading={collections[3].title}>
            {collections[3].products.map((item, index) => (
              <li key={index} className="glide__slide">
                <ProductCard productPreview={item} region={region} />
              </li>
            ))}
          </SectionSliderProductCard>

          <SectionPromo2 />

          {/* <SectionSliderLargeProduct cardStyle="style1" /> */}

          {/* <SectionGridFeatureItems /> */}

          <SectionSliderProductCard heading={collections[3].title}>
            {collections[3].products.map((item, index) => (
              <li key={index} className="glide__slide">
                <ProductCard productPreview={item} region={region} />
              </li>
            ))}
          </SectionSliderProductCard>

          {/* <div className="relative py-24 lg:py-32">
            <BackgroundSection />
            <div>
              <Heading rightDescText="From the Ciseco blog">
                The latest news
              </Heading>
              <SectionMagazine5 />
              <div className="flex mt-16 justify-center">
                <ButtonSecondary>Show all blog articles</ButtonSecondary>
              </div>
            </div>
          </div> */}
          {/* <SectionClientSay /> */}

          <div className="py-24 lg:py-32 border-t border-b border-slate-200 dark:border-slate-700">
            <SectionHowItWork />
          </div>
          <SectionPromo3 />
        </div>
      </div>
    </TranslationsProvider>
  )
}
