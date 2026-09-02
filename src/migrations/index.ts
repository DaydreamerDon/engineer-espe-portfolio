import * as migration_20260831_221135_portfolio from './20260831_221135_portfolio';
import * as migration_20260902_060022 from './20260902_060022';

export const migrations = [
  {
    up: migration_20260831_221135_portfolio.up,
    down: migration_20260831_221135_portfolio.down,
    name: '20260831_221135_portfolio',
  },
  {
    up: migration_20260902_060022.up,
    down: migration_20260902_060022.down,
    name: '20260902_060022'
  },
];
