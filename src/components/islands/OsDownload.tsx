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

interface Props {
  releasesUrl: string
}

export default function OsDownload({ releasesUrl }: Props) {
  const [os, setOs] = useState<Os>('unknown')

  useEffect(() => {
    setOs(detectOs())
  }, [])

  const known = os !== 'unknown'

  return (
    <div className="rounded-2xl border border-ice/40 bg-surface p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-ice">
        Desktop app
      </p>
      <h3 className="mt-2 text-2xl font-bold text-fg">
        {known ? `Recommended for ${LABELS[os as Exclude<Os, 'unknown'>]}` : 'Download the desktop app'}
      </h3>
      <p className="mt-2 text-sm text-muted">
        Native shell built with Tauri 2 — macOS, Windows, and Linux (amd64 &amp;
        arm64), with auto-updates and OS keychain support. Builds are published
        on GitHub Releases.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={releasesUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-ice px-6 py-3 text-base font-medium text-ink shadow-lg shadow-ice/20 transition-colors hover:bg-pale"
        >
          {known
            ? `Download for ${LABELS[os as Exclude<Os, 'unknown'>]}`
            : 'Go to Releases'}{' '}
          ↗
        </a>
        <a
          href={releasesUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface-2 px-6 py-3 text-base font-medium text-fg transition-colors hover:border-ice/60 hover:text-ice"
        >
          All platforms
        </a>
      </div>
      <p className="mt-4 text-xs text-muted">
        Pre-release — desktop v1 ships without in-app office-doc editing (open
        office files in the browser app). Builds aren&apos;t code-signed yet, so
        macOS Gatekeeper / Windows SmartScreen may warn on first launch.
      </p>
    </div>
  )
}
