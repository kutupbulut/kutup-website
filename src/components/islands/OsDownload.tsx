import { useEffect, useState } from 'react'

type Os = 'mac' | 'windows' | 'linux' | 'unknown'

function detectOs(): Os {
  if (typeof navigator === 'undefined') return 'unknown'
  const ua = navigator.userAgent.toLowerCase()
  if (/mac os x|macintosh/.test(ua)) return 'mac'
  if (/windows/.test(ua)) return 'windows'
  if (/linux|x11/.test(ua)) return 'linux'
  return 'unknown'
}

const LABELS: Record<Exclude<Os, 'unknown'>, string> = {
  mac: 'macOS',
  windows: 'Windows',
  linux: 'Linux',
}

export interface OsDownloadStrings {
  eyebrow: string
  /** '{os}' is replaced with the detected platform name. */
  titleKnown: string
  titleUnknown: string
  body: string
  downloadFor: string
  goToReleases: string
  allPlatforms: string
  preRelease: string
}

interface Props {
  releasesUrl: string
  t: OsDownloadStrings
}

export default function OsDownload({ releasesUrl, t }: Props) {
  const [os, setOs] = useState<Os>('unknown')

  useEffect(() => {
    setOs(detectOs())
  }, [])

  const known = os !== 'unknown'
  const osLabel = known ? LABELS[os as Exclude<Os, 'unknown'>] : ''

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
          href={releasesUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-ice px-6 py-3 text-base font-medium text-ink transition-colors hover:bg-pale"
        >
          {known ? t.downloadFor.replace('{os}', osLabel) : t.goToReleases} ↗
        </a>
        <a
          href={releasesUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface-2 px-6 py-3 text-base font-medium text-fg transition-colors hover:border-ice/60 hover:text-ice"
        >
          {t.allPlatforms}
        </a>
      </div>
      <p className="mt-4 text-xs text-muted">{t.preRelease}</p>
    </div>
  )
}
