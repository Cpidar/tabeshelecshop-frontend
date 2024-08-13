// import from file json
import storeConfigJson from "../../store.config.json";

export const STORE_CONFIG = storeConfigJson;

export const IS_DEV = process.env.NODE_ENV === "development";
export const IS_CHISNGHIAX_DEMO_SITE =
  process.env.NEXT_PUBLIC_IS_CHISNGHIAX_DEMO_SITE === "true";
