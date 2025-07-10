import { Archive } from './ArchiveBlock/config'
import { BackgroundImageBlock } from './BackgroundImage/config'
import { CallToAction } from './CallToAction/config'
import { CategoryShowcase } from './CategoryShowcase/config'
import { CategorySlider } from './CategorySlider01/config'
import { ContactSectionBlock } from './ContactSection/config'
import { Content } from './Content/config'
import { FAQBlock } from './FAQBlock/config'
import { FormBlock } from './Form/config'
import { Gallery } from './Gallery/config'
import GoogleMapBlock from './GoogleMap/config'
import { ImageLinkBlock } from './ImageLink/config'
import { ImageOverlayCTA } from './ImageOverlayCTA/config'
import ImageWithTextOverlayBlock from './ImageWithOverlayText'
import { ImageWithTextBlock } from './ImageWithTextBlock/config'
import { InfoCardBlock } from './InfoCard/config'
import { LinkBlock } from './Link/config'
import { LogoCarouselBlock } from './LogoCarousel/config'
import { MediaBlock } from './MediaBlock/config'
import SectionIncredibleOffer from './IncredibleOffer/component.client'
import SectionPromo1 from './Promo01/SectionPromo1'
import SectionPromo2 from './Promo02/SectionPromo2'
import SectionPromo3 from './Promo03/SectionPromo3'
import { ReviewCard } from './ReviewCard/config'
import { SingleProduct } from './SingleProduct/config'
import { StaffImageSpielBlock } from './StaffImageSpielBlock/config'
import { StepItemGridBlock } from './StepItemGrid/config'
import { SubscriptionPlanBlock } from './SubscriptionPlanBlock/config'
import { TabsBlock } from './TabsBlock/config'

// These are the blocks that are the main content of the page
export const DefaultBlockOptions = [
  Archive,
  BackgroundImageBlock,
  CallToAction,
  CategoryShowcase,
  // CategorySlider,
  ContactSectionBlock,
  Content,
  FAQBlock,
  FormBlock,
  Gallery,
  GoogleMapBlock,
  ImageOverlayCTA,
  ImageWithTextBlock,
  LogoCarouselBlock,
  MediaBlock,
  // SectionIncredibleOffer,
  // SectionPromo1,
  // SectionPromo2,
  // SectionPromo3,
  StepItemGridBlock,
  TabsBlock,
]

// These are the blocks that are usually used inside  RichText
export const SingleBlockOptions = [
  ContactSectionBlock,
  FormBlock,
  GoogleMapBlock,
  ImageLinkBlock,
  ImageWithTextOverlayBlock,
  InfoCardBlock,
  LinkBlock,
  MediaBlock,
  ReviewCard,
  SingleProduct,
  StaffImageSpielBlock,
  SubscriptionPlanBlock,
]
