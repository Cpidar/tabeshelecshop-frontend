import { Metadata } from "next"

import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

import SectionHowItWork from "@/modules/home/components/SectionHowItWork/SectionHowItWork"
import BackgroundSection from "@/modules/home/components/BackgroundSection/BackgroundSection"
import SectionPromo1 from "@/modules/home/components/SectionPromo1"
import SectionSliderProductCard from "@/modules/home/components/SectionSliderProductCard"
import SectionPromo2 from "@/modules/home/components/SectionPromo2"
import SectionSliderCategories, {
  CardCategoryData,
} from "@/modules/home/components/SectionSliderCategories/SectionSliderCategories"
import SectionPromo3 from "@/modules/home/components/SectionPromo3"
import Heading from "@/components/Heading/Heading"
import ButtonSecondary from "@/shared/Button/ButtonSecondary"
import ProductCard from "@modules/products/components/product-preview/ProductCard"
import SectionHero4, {
  SectionHeroProps,
} from "@/modules/home/components/SectionHero/SectionHero4"
import initTranslations from "@/app/i18n"
import TranslationsProvider from "@/modules/translationProvider/TranslationsProvider"
import { createReader } from "@keystatic/core/reader"
import keystaticConfig from "../../../../keystatic.config"
import SectionIncredibleOffer from "@/modules/home/components/SectionIncredibleOffer"
import SectionTripleBanners, {
  SectionPromo1Data,
} from "@/modules/home/components/SectionTripleBanners"

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

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  // from keystatic cms
  const homepageContent = await reader.singletons.homepage.read()

  const allCollections = await getCollectionsWithProducts(countryCode)
  const incredibleOffers = allCollections?.filter(
    (c) => c.handle === "incredible_offer"
  )[0]
  const collections = allCollections?.filter(
    (c) => c.handle !== "incredible_offer"
  )
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

        <div className="content-container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
          <SectionSliderCategories
            data={
              homepageContent?.homePageCategories
                .items as unknown as CardCategoryData[]
            }
          />
          <SectionIncredibleOffer heading={incredibleOffers?.title}>
            {incredibleOffers &&
              incredibleOffers?.products?.map((item, index) => (
                <li key={index} className="glide__slide">
                  <div className="relative lg:flex lg:justify-center lg:pl-[10px]">
                    <ProductCard product={item} region={region} />
                    <div className=" absolute left-0 top-[30px] w-[1px] bg-gray-100 xl:top-[54px] xl:w-[2px]  h-[320px]"></div>
                  </div>
                </li>
              ))}
          </SectionIncredibleOffer>
          {homepageContent?.homePageTripleBanner.items && (
            <SectionTripleBanners
              data={
                homepageContent.homePageTripleBanner
                  .items as unknown as SectionPromo1Data[]
              }
            />
          )}
          <SectionSliderProductCard
            heading={collections[0].title}
            subHeading=""
          >
            {collections[0] &&
              collections[0].products?.map((item, index) => (
                <li key={index} className="glide__slide">
                  <div className="relative lg:flex lg:justify-center lg:pl-[10px]">
                    <ProductCard product={item} region={region} />
                    <div className=" absolute left-0 top-[30px] w-[1px] bg-gray-100 xl:top-[54px] xl:w-[2px]  h-[320px]"></div>
                  </div>
                </li>
              ))}
          </SectionSliderProductCard>

          <SectionPromo1 className="bg-gray-50" />
          {/* 
        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <SectionGridMoreExplore />
        </div> */}

          {collections[1] && (
            <SectionSliderProductCard
              heading={collections[1].title}
              subHeading=""
            >
              {collections[1].products?.map((item, index) => (
                <li key={index} className="glide__slide">
                  <ProductCard product={item} region={region} />
                </li>
              ))}
            </SectionSliderProductCard>
          )}

          {collections[2] && (
            <SectionSliderProductCard heading={collections[2].title}>
              {collections[2].products?.map((item, index) => (
                <li key={index} className="glide__slide">
                  <ProductCard product={item} region={region} />
                </li>
              ))}
            </SectionSliderProductCard>
          )}

          {collections[3] && (
            <SectionSliderProductCard heading={collections[3].title}>
              {collections[3].products?.map((item, index) => (
                <li key={index} className="glide__slide">
                  <ProductCard product={item} region={region} />
                </li>
              ))}
            </SectionSliderProductCard>
          )}
          <SectionPromo2 />

          {/* <SectionSliderLargeProduct cardStyle="style1" /> */}

          {/* <SectionGridFeatureItems /> */}

          {collections[4] && (
            <SectionSliderProductCard heading={collections[4].title}>
              {collections[4].products?.map((item, index) => (
                <li key={index} className="glide__slide">
                  <ProductCard product={item} region={region} />
                </li>
              ))}
            </SectionSliderProductCard>
          )}
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
