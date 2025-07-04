import * as migration_20250703_165942_medpay from './20250703_165942_medpay';

export const migrations = [
  {
    up: migration_20250703_165942_medpay.up,
    down: migration_20250703_165942_medpay.down,
    name: '20250703_165942_medpay'
  },
];
