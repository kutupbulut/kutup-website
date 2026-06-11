// Site-wide constants. Single source of truth for external URLs and metadata.

// Taglines/descriptions live in src/i18n/<locale>.ts so they translate.
export const SITE = {
  name: 'Kutup',
  domain: 'kutup.dev',
  url: 'https://kutup.dev',
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
