import { resources, defaultNS } from "@/app/i18n";
import ns1 from '@/locales/en/common.json'

declare module "i18next" {
  interface CustomTypeOptions {
    // defaultNS: typeof defaultNS;
    defaultNS: "ns1";
    resources: typeof ns1;
  }
}