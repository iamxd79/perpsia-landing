# Provider logo strip

The hero identifies the supported provider catalog, including conditional integrations, plus Telegram delivery. It is not a live provider-health display or an endorsement claim. GitHub applies only to verified project repositories; FRED and security providers retain their existing backend configuration requirements.

`components/provider-marquee.js` uses local logo assets, two identical lists, and a CSS transform loop. The visual duplicate is hidden from assistive technology. Animation pauses on hover and via a keyboard/touch-accessible pause/resume button. Reduced-motion preferences replace the loop with one complete wrapping list. Both themes retain legible marks. No animation or logo API dependency was added.

## Asset provenance

Retrieved 2026-09-05. These are existing brand assets, not AI-generated or hand-drawn approximations. Logos and trademarks belong to their respective owners and identify the integrations.

| Local file under `public/images/providers/` | Source |
| --- | --- |
| `binance.svg` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/develop/icons/binance.svg), source: [Binance](https://binance.com) |
| `bybit.svg` | Embedded SVG in the header of the [official Bybit press room](https://www.bybit.com/press), decoded unchanged |
| `okx.svg` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/develop/icons/okx.svg); viewBox trims empty top/bottom margins, paths unchanged |
| `hyperliquid.svg` | `SVG/Hyperliquid_Blob_Green.svg` from the [official Hyperliquid brand kit](https://hyperliquid.gitbook.io/hyperliquid-docs/brand-kit) |
| `coinmarketcap.svg` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/develop/icons/coinmarketcap.svg), source: [CoinMarketCap](https://coinmarketcap.com) |
| `dexscreener.png` | 512px brand icon from the [official DexScreener documentation](https://docs.dexscreener.com) |
| `geckoterminal.svg` | [Official website SVG](https://s.geckoterminal.com/_next/static/media/logo_symbol.d6e8a303.svg) |
| `goplus.png` | [Official GoPlus logo](https://gopluslabs.io/meta-logo.png) |
| `honeypot-icon.png` | [Official Honeypot.is icon](https://honeypot.is/favicons/android-icon-192x192.png) |
| `alternative.png` | [Official Alternative.me logo](https://alternative.me/images/alternative-me-logo.png) |
| `fred.svg` | [Official FRED header logo](https://fred.stlouisfed.org/images/FRED_Logo_Header.svg) |
| `github.svg` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/develop/icons/github.svg), source: [GitHub logos](https://github.com/logos) |
| `telegram.svg` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/develop/icons/telegram.svg), source: [Telegram logos](https://telegram.org/tour/screenshots) |

Simple Icons SVGs are distributed under [CC0](https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md); trademark rights remain with each brand. CSS applies monochrome variants where needed for theme contrast without redrawing the marks.
