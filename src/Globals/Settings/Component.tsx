import { getCachedGlobal } from '@/utils/getGlobals'
import type { Setting } from '@/payload-types'

export async function getSettings() {
  const settings = (await getCachedGlobal('settings', 1)()) as Setting
  return settings
}
