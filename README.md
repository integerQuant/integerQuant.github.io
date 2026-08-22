### Minimal personal dev portfolio that fetches GitHub data and renders projects, stats and language/tool pills.

The static `public/knietty` bootstrap provides the short, checksummed knietty
host installation entry point:

```sh
curl -fsSL https://rmtb.dev/knietty | sh
```

It downloads and verifies the canonical installer attached to the latest
`integerQuant/crosspoint-reader` release. The release repository owns platform
detection and installation behavior; this site only owns the stable short URL.
