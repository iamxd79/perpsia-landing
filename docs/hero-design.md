# Reference hero

The homepage uses a centered wordmark and headline, floating navigation, a supported-provider strip, and five feed statistics. The homepage statistics and signal cards share one request every 90 seconds. Counts describe the published feed, not the full scanner universe. Missing confidence or attribution is unavailable, and failed or stale feed responses do not display live statistics. Provider names describe existing integrations, not endorsements.

The responsive layout retains theme switching and reflows the metrics into two columns on mobile. All hero styles are scoped in `components/home-hero.module.css`.

## Scenic asset

`public/images/hero-landscape.webp` was produced with the built-in image generation tool from `public/images/background.jpg`, then encoded as WebP for delivery. The original background is preserved.

Final prompt:

> Use case: precise-object-edit. Asset type: sharp full-width website hero background, 16:9 landscape. Edit the attached scenic background: remove the entire human silhouette made of white binary digits from the middle and reconstruct the lake, hills and sky naturally in its place. Preserve the illustrated green valley, flower meadows, rocks, trees, clouds framing both sides and blue lake. Make the large open central sky a deeper rich cobalt blue like a clear alpine sky, suitable for crisp white website text over it. Keep the center upper two thirds spacious blue sky, landscape across the bottom third, large bright white cumulus clouds at the side edges. Preserve the original hand-painted anime landscape style, sharp detail and vivid colors. No figures, no numbers, no lettering, no UI, no logos, no watermarks, no blur, no dark vignette. Output only the clean scenery.

## Checks

`node --test test/hero-stats.test.mjs`

`npm run lint`

`npm run build`
