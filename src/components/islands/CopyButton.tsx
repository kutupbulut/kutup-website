import { useState } from 'react'

interface Props {
  text: string
  label?: string
  copiedLabel?: string
}

export default function CopyButton({
  text,
  label = 'Copy',
  copiedLabel = '✓ Copied',
}: Props) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard API can be unavailable (insecure context); fail silently.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? copiedLabel : label}
      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:border-ice/60 hover:text-ice"
    >
      {copied ? copiedLabel : label}
    </button>
  )
}
