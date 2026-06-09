// Site-wide constants. Single source of truth for external URLs and metadata.

export const SITE = {
  name: 'Kutup',
  domain: 'kutup.dev',
  url: 'https://kutup.dev',
  tagline:
    'End-to-end encrypted, self-hosted Google Drive — with real-time collab for notes, office docs, and whiteboards.',
  description:
    'Kutup is a privacy-first, end-to-end encrypted file storage and live-collaboration platform you run on your own hardware. The server only ever sees ciphertext.',
} as const

export const LINKS = {
  github: 'https://github.com/kutupbulut/kutup',
  releases: 'https://github.com/kutupbulut/kutup/releases',
  docs: 'https://docs.kutup.dev',
  issues: 'https://github.com/kutupbulut/kutup/issues',
  // Pre-filled issue for submitting a public instance to the directory.
  submitInstance:
    'https://github.com/kutupbulut/kutup/issues/new?title=Add%20my%20public%20instance&labels=instance-directory',
  email: 'dev@kutup.dev',
  license: 'https://www.gnu.org/licenses/agpl-3.0.en.html',
} as const

// Primary navigation shown in the header.
export const NAV = [
  { label: 'Features', href: '/features' },
  { label: 'Download', href: '/download' },
  { label: 'Self-host', href: '/self-host' },
  { label: 'Instances', href: '/instances' },
  { label: 'Docs', href: LINKS.docs, external: true },
] as const
