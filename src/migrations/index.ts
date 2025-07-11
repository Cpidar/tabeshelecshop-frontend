import * as migration_20250703_165942_medpay from './20250703_165942_medpay';
import * as migration_20250711_110045_promo from './20250711_110045_promo';

export const migrations = [
  {
    up: migration_20250703_165942_medpay.up,
    down: migration_20250703_165942_medpay.down,
    name: '20250703_165942_medpay',
  },
  {
    up: migration_20250711_110045_promo.up,
    down: migration_20250711_110045_promo.down,
    name: '20250711_110045_promo'
  },
];
