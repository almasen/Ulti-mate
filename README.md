# Ulti-mate
KCL 6CCS3PRJ - AI opponent for the card game Ulti

[![Test Coverage](https://img.shields.io/badge/dynamic/json?color=success&label=test%20coverage&query=%24.total.statements.pct&suffix=%25&url=https%3A%2F%2Frepos.almasi.dev%2Fulti-bot%2Fcoverage%2Fcoverage-summary.json&logo=jest&style=flat-square)](https://repos.almasi.dev/ulti-bot/coverage)

## About

Ulti-mate is a proof of concept implementation of a set of smart bidding algorithms for the complex trick-taking card game Ulti designed as part of my BSc thesis at King's College London under the supervision of Dr Agi Kurucz.

The supported list of smart bidding algorithms is as follows:

- Simple
- Simple of Hearts
- Betli
- Rebetli
- Open Betli
- Durchmars
- Redurchmars
- Open Durchmars

## CLI

Ulti-mate provides an extensive CLI with various experimentation options as well as detailed reasoning behind computed decisions.

### Commands

- `npm start` to run a simulation
- `npm start -- [args]` to pass CLI arguments
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
- `npm start -- -R 70` the bot should only play games where the winning chance is >=70%
- `npm start -- -H 0 1 2 3 4 5 6 7 8 9` sets player's hand to cards whose ids are 0-9

## Local usage & development

To run Ulti-mate simulations or develop locally.

### Prerequisites

- node.js `^14.x`
- min `2 GB` free memory

### Set up

1. `npm i` to install project dependencies
2. `npm run build` to compile project
3. Run your choice of [CLI command](#commands)

## License

[MIT © Daniel Almasi](https://github.com/almasen/ulti-mate/blob/master/LICENSE)