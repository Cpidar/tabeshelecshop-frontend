// import { Archive } from './ArchiveBlock/config'
import { BackgroundImageBlock } from './BackgroundImage/config'
// import { CallToAction } from './CallToAction/config'
// import { CategoryShowcase } from './CategoryShowcase/config'
import { ContactSectionBlock } from './ContactSection/config'
// import { Content } from './Content/config'
// import { FAQBlock } from './FAQBlock/config'
// import { FormBlock } from './Form/config'
// import { Gallery } from './Gallery/config'
// import GoogleMapBlock from './GoogleMap/config'
// import { ImageLinkBlock } from './ImageLink/config'
// import { ImageOverlayCTA } from './ImageOverlayCTA/config'
// import ImageWithTextOverlayBlock from './ImageWithOverlayText'
// import { ImageWithTextBlock } from './ImageWithTextBlock/config'
// import { InfoCardBlock } from './InfoCard/config'
// import { LinkBlock } from './Link/config'
// import { LogoCarouselBlock } from './LogoCarousel/config'
// import { MediaBlock } from './MediaBlock/config'
// import { ReviewCard } from './ReviewCard/config'
// import { SingleProduct } from './SingleProduct/config'
// import { StaffImageSpielBlock } from './StaffImageSpielBlock/config'
// import { StepItemGridBlock } from './StepItemGrid/config'
// import { SubscriptionPlanBlock } from './SubscriptionPlanBlock/config'
// import { TabsBlock } from './TabsBlock/config'

// These are the blocks that are the main content of the page
export const DefaultBlockOptions = [
  BackgroundImageBlock,
  // CallToAction,
  // CategoryShowcase,
  ContactSectionBlock,
  // Content,
  // FAQBlock,
  // Gallery,
  // GoogleMapBlock,
  // ImageOverlayCTA,
  // ImageWithTextBlock,
  // LogoCarouselBlock,
  // MediaBlock,
  // Archive,
  // FormBlock,
  // StepItemGridBlock,
  // TabsBlock,
]

// These are the blocks that are usually used inside  RichText
export const SingleBlockOptions = [
  ContactSectionBlock,
  // FormBlock,
  // GoogleMapBlock,
  // ImageLinkBlock,
  // ImageWithTextOverlayBlock,
  // InfoCardBlock,
  // LinkBlock,
  // MediaBlock,
  // ReviewCard,
  // SingleProduct,
  // StaffImageSpielBlock,
  // SubscriptionPlanBlock,
]
