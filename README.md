# 6CCS3PRJ
KCL 6CCS3PRJ - AI opponent for Ulti card game

[![Test Coverage](https://img.shields.io/badge/dynamic/json?color=success&label=test%20coverage&query=%24.total.statements.pct&suffix=%25&url=https%3A%2F%2Frepos.almasi.dev%2Fulti-bot%2Fcoverage%2Fcoverage-summary.json&logo=jest)](https://repos.almasi.dev/ulti-bot/coverage)

## Commands

- `npm run build` to compile project
- `npm start` to run a simulation
- `npm start -- [args]` to pass arguments
- `npm start -- -h` to see CLI help
- `npm test` to run TS module tests *(concurrently)*

### CLI args

- `-h` for CLI commands help
- `-R, --max-risk` to specify max risk in percentages
- `-H, --custom-hand <card ids...>` to run the simulation with a custom hand
- `--no-opponents` to skip calculation of opponents' hands
- `--no-reasoning` to skip logging of detailed reasoning behind decisions

#### CLI examples

- `npm start -- --no-opponents` runs simulation with only player's hand
- `npm start -- -R 70` the bot should only play games where it's chance is >=70%
- `npm start -- -H 0 1 2 3 4 5 6 7 8 9` sets player's hand to cards whose ids 0-9

## TODO:

- [x] 75% duri chance will print 75% 3 times
- [x] print out which minigame should by played
- [ ] print out reasoning for chances
- [ ] implement having 12 cards in hand
- [ ] e.g. print raw score for simple