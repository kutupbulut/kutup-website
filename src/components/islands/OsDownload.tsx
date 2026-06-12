import { useEffect, useState } from 'react'

type Os = 'mac' | 'windows' | 'linux' | 'unknown'
type Platform = Exclude<Os, 'unknown'>

function detectOs(): Os {
  if (typeof navigator === 'undefined') return 'unknown'
  const ua = navigator.userAgent.toLowerCase()
  if (/mac os x|macintosh/.test(ua)) return 'mac'
  if (/windows/.test(ua)) return 'windows'
  if (/linux|x11/.test(ua)) return 'linux'
  return 'unknown'
}

const LABELS: Record<Platform, string> = {
  mac: 'macOS',
  windows: 'Windows',
  linux: 'Linux',
}

const PLATFORMS: Platform[] = ['mac', 'windows', 'linux']

/** Preferred installer per platform, first match wins. */
const ASSET_PATTERNS: Record<Platform, RegExp[]> = {
  mac: [/universal\.dmg$/i, /aarch64.*\.dmg$/i, /\.dmg$/i],
  windows: [/setup\.exe$/i, /\.msi$/i],
  linux: [/\.AppImage$/i, /amd64\.deb$/i, /\.deb$/i, /\.rpm$/i],
}

interface ReleaseAsset {
  name: string
  browser_download_url: string
}

/**
 * Resolve direct download links from the latest published `desktop-v*`
 * release (prereleases included, drafts never appear). Falls back to the
 * releases page when the API or a matching asset is unavailable.
 */
function useDesktopAssets(releasesUrl: string) {
  const [assets, setAssets] = useState<Partial<Record<Platform, string>>>({})

  useEffect(() => {
    const repoPath = new URL(releasesUrl).pathname.replace(/\/releases\/?$/, '')
    fetch(`https://api.github.com/repos${repoPath}/releases?per_page=20`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`${r.status}`))))
      .then((releases: { tag_name: string; assets: ReleaseAsset[] }[]) => {
        const desktop = releases.find((r) => r.tag_name.startsWith('desktop-v'))
        if (!desktop) return
        const resolved: Partial<Record<Platform, string>> = {}
        for (const platform of PLATFORMS) {
          for (const pattern of ASSET_PATTERNS[platform]) {
            const asset = desktop.assets.find((a) => pattern.test(a.name))
            if (asset) {
              resolved[platform] = asset.browser_download_url
              break
            }
          }
        }
        setAssets(resolved)
      })
      .catch(() => {}) // rate-limited or offline — buttons keep the releases URL
  }, [releasesUrl])

  return assets
}

export interface OsDownloadStrings {
  eyebrow: string
  /** '{os}' is replaced with the detected platform name. */
  titleKnown: string
  titleUnknown: string
  body: string
  downloadFor: string
  goToReleases: string
  preRelease: string
}

interface Props {
  releasesUrl: string
  t: OsDownloadStrings
}

export default function OsDownload({ releasesUrl, t }: Props) {
  const [os, setOs] = useState<Os>('unknown')
  const assets = useDesktopAssets(releasesUrl)

  useEffect(() => {
    setOs(detectOs())
  }, [])

  const known = os !== 'unknown'
  const osLabel = known ? LABELS[os as Platform] : ''

  // Detected platform first; the rest follow as secondary buttons.
  const others = known ? PLATFORMS.filter((p) => p !== os) : PLATFORMS

  return (
    <div className="rounded-2xl border border-ice/40 bg-surface p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-ice">
        {t.eyebrow}
      </p>
      <h3 className="mt-2 text-2xl font-bold text-fg">
        {known ? t.titleKnown.replace('{os}', osLabel) : t.titleUnknown}
      </h3>
      <p className="mt-2 text-sm text-muted">{t.body}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={(known && assets[os as Platform]) || releasesUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-ice px-6 py-3 text-base font-medium text-ink transition-colors hover:bg-pale"
        >
          {known ? t.downloadFor.replace('{os}', osLabel) : t.goToReleases} ↗
        </a>
        {others.map((p) => (
          <a
            key={p}
            href={assets[p] ?? releasesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-base font-medium text-fg transition-colors hover:bg-surface-2"
          >
            {LABELS[p]}
          </a>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted">{t.preRelease}</p>
    </div>
  )
}
