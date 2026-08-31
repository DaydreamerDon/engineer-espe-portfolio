import * as migration_20260831_221135_portfolio from './20260831_221135_portfolio'

export const migrations = [
  {
    up: migration_20260831_221135_portfolio.up,
    down: migration_20260831_221135_portfolio.down,
    name: '20260831_221135_portfolio',
  },
]
