// src/components/RenderBlocks.tsx
import React, { Fragment } from "react"
import type { Page, Faq } from "@/payload-types"
import { CallToActionBlock } from "@/blocks/CallToAction/Component"
import { ContentBlock } from "@/blocks/Content/Component"
import { FormBlock } from "@/blocks/Form/Component"
import { MediaBlock } from "@/blocks/MediaBlock/Component"
import { GalleryBlock } from "./Gallery/component"
import FAQBlock from "./FAQBlock"
import ImageWithTextBlock from "./ImageWithTextBlock"
import StepItemGrid from "./StepItemGrid/Component"
import ImageLinkBlock from "./ImageLink"
import LogoCarouselBlock from "./LogoCarousel"
import FAQSchema from "@/collections/Schemas/FAQSchema"
import TabsBlock from "./TabsBlock/component"
import ArchiveBlock from "./ArchiveBlock/Component"
import ContactSection from "./ContactSection/Component"
import RenderAnimation from "@/fields/Animation/RenderAnimation"
import InfoCardBlock from "./InfoCard/component"
import StaffImageSpielBlock from "./StaffImageSpielBlock/component"
import { GoogleMap } from "./GoogleMap/component"
import clsx from "clsx"
import ImageOverlayCTA from "./ImageOverlayCTA"
import CategoryShowcase from "./CategoryShowcase/component"
import BackgroundImageBlock from "./BackgroundImage/component"
import CategorySlider from "./CategorySlider01/component"
import SectionIncredibleOffer from "./IncredibleOffer/component.client"
import SectionPromo1 from "./Promo01/SectionPromo1"
import SectionPromo2 from "./Promo02/SectionPromo2"
import SectionPromo3 from "./Promo03/SectionPromo3"

const blockComponents = {
  archive: ArchiveBlock,
  backgroundImageBlock: BackgroundImageBlock,
  categoryShowcase: CategoryShowcase,
  // categorySlider: CategorySlider,
  contactSection: ContactSection,
  content: ContentBlock,
  cta: CallToActionBlock,
  faqBlock: FAQBlock,
  formBlock: FormBlock,
  gallery: GalleryBlock,
  googleMap: GoogleMap,
  imageLinkBlock: ImageLinkBlock,
  imageOverlayCTA: ImageOverlayCTA,
  imageWithTextBlock: ImageWithTextBlock,
  // incredibleOffer: SectionIncredibleOffer,
  infoCardBlock: InfoCardBlock,
  logoCarouselBlock: LogoCarouselBlock,
  mediaBlock: MediaBlock,
  // promo1: SectionPromo1,
  // promo2: SectionPromo2,
  // promo3: SectionPromo3,
  staffImageSpielBlock: StaffImageSpielBlock,
  stepItemGrid: StepItemGrid,
  tabsBlock: TabsBlock,
}

interface RenderBlocksProps {
  blocks: Page["layout"][0][]
  excludeBlockTypes?: string[]
  excludeMargin?: boolean
  clientOnly?: boolean
  countryCode: string
}

interface FAQBlockType {
  blockType: "faqBlock"
  faqs: Faq
}
function isFAQBlock(block: any): block is FAQBlockType {
  return (
    block.blockType === "faqBlock" &&
    block.faqs &&
    Array.isArray(block.faqs.questions)
  )
}

export const RenderBlocks: React.FC<RenderBlocksProps> = ({
  blocks,
  excludeBlockTypes = [],
  excludeMargin = false,
  clientOnly = false,
  countryCode,
}) => {
  if (!Array.isArray(blocks) || blocks.length === 0) return null

  const faqBlocks = blocks.filter(isFAQBlock)

  return (
    <Fragment>
      {blocks.map((block, idx) => {
        const { blockType, animation } = block as any

        // skip excluded types:
        if (excludeBlockTypes.includes(blockType)) return null

        const BlockComponent = blockType ? blockComponents[blockType] : null
        if (!BlockComponent) return null

        const content = (
          <BlockComponent
            {...block}
            disableInnerContainer
            countryCode={countryCode}
          />
        )

        if (animation?.enabled) {
          return (
            <div className={clsx(!excludeMargin && "my-16")} key={idx}>
              <RenderAnimation
                trigger={animation.trigger}
                type={animation.type}
                duration={animation.duration}
                delay={animation.delay}
                threshold={animation.threshold}
              >
                {content}
              </RenderAnimation>
            </div>
          )
        }

        return (
          <div className={clsx(!excludeMargin && "my-16")} key={idx}>
            {content}
          </div>
        )
      })}

      {faqBlocks.length > 0 && <FAQSchema faqBlocks={faqBlocks} />}
    </Fragment>
  )
}

export default RenderBlocks
