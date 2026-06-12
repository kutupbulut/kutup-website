// English dictionary — the source of truth for the Dictionary shape.
// Strings marked "html:" prefixes in comments may contain inline markup
// (<code>, <a>, <strong>) and are rendered with set:html inside a .rich
// element. {placeholders} are interpolated with fill() from ./config.

const en = {
  site: {
    tagline:
      'End-to-end encrypted, self-hosted drive — with real-time collab for notes, office docs, and whiteboards.',
    description:
      'Kutup is a privacy-first, end-to-end encrypted file storage and live-collaboration platform you run on your own hardware. The server only ever sees ciphertext.',
  },

  nav: {
    features: 'Features',
    download: 'Download',
    selfHost: 'Self-host',
    instances: 'Instances',
    docs: 'Docs',
  },

  header: {
    getKutup: 'Get Kutup',
    switchTheme: 'Switch theme',
    switchLanguage: 'Language',
  },

  footer: {
    blurb:
      'End-to-end encrypted, self-hosted drive — with real-time collab for notes, office docs, and whiteboards. The server only ever sees ciphertext.',
    product: 'Product',
    resources: 'Resources',
    documentation: 'Documentation',
    releases: 'Releases',
    issues: 'Issues',
    // html: contains the AGPL license link
    license:
      '© {year} Alperen Albayrak. Source licensed <a href="{license}" target="_blank" rel="noopener noreferrer">AGPL-3.0-only</a>.',
    // html: contains the brand-inquiry mailto link
    brand:
      'The Kutup name and three-diamond logo are brand assets, not granted by the AGPL. Brand inquiries: <a href="mailto:{email}">{email}</a>.',
  },

  home: {
    hero: {
      badge: 'End-to-end encrypted · self-hosted · real-time collab',
      // html: accent span around the highlighted phrase
      title: 'The end-to-end encrypted <span class="text-ice">Drive</span>',
      sub: 'An end-to-end encrypted drive you run yourself. Files, notes, office docs, and whiteboards — everything is encrypted in your browser before it leaves the page.',
      ctaSelfHost: 'Self-host Kutup',
      ctaDownload: 'Download apps',
      screenshotAlt: 'Kutup Drive interface',
    },
    pillars: [
      {
        title: 'Zero-knowledge server',
        body: 'Keys are derived in your browser from your password and recovery phrase. The server stores ciphertext it can never read.',
      },
      {
        title: 'Collaboration, still encrypted',
        body: 'Real-time editing without giving up E2EE — the relay routes opaque, signed frames and never sees content.',
      },
      {
        title: 'Yours to run & federate',
        body: 'One Docker Compose stack. Share folders across Kutup servers without either backend seeing plaintext.',
      },
    ],
    highlights: {
      eyebrow: 'What’s inside',
      title: 'One encrypted workspace for everything',
      subtitle:
        'Files, notes, code, spreadsheets, slides, and whiteboards — all under the same hard-baked encryption boundary.',
      cta: 'Explore all features',
      items: [
        {
          title: 'Files the server can’t read',
          alt: 'Kutup Drive — file browser with folders, uploads, and storage quota',
          body: 'Nested folders, drag-and-drop uploads, share links, and per-user permissions. Filenames and folder structure are encrypted too.',
        },
        {
          title: 'Live notes & code',
          alt: 'Notes editor — CodeMirror with version-history sidebar',
          body: 'CodeMirror 6 + Yjs for Markdown and 20+ code languages, with live multi-user cursors. Every edit reaches the server as ciphertext.',
        },
        {
          title: 'Office docs, fully client-side',
          alt: 'Spreadsheet editor with conditional formatting',
          body: '.docx, .xlsx, and .pptx open in OnlyOffice running entirely in your browser. Live presence, formulas, charts — never decrypted server-side.',
        },
        {
          title: 'Whiteboards',
          alt: 'Excalidraw whiteboard',
          body: 'Excalidraw canvases with live sync — wrapped in the same encrypted envelope as everything else.',
        },
        {
          title: 'Version history on every file',
          alt: 'Version history sidebar',
          body: 'Every save is a snapshot. Scroll back and restore from the History sidebar in any editor.',
        },
        {
          title: 'You own your keys',
          alt: 'Settings — devices and presence color',
          body: 'Per-device keys you can revoke, a 24-word recovery phrase, and optional 2FA. Nothing secret ever reaches the server.',
        },
      ],
    },
    architecture: {
      eyebrow: 'Architecture in 30 seconds',
      title: 'The relay routes ciphertext it can never decrypt',
      subtitle:
        'Every collab frame is encrypted in the browser, signed with a per-device Ed25519 key, and sent through an opaque WebSocket relay.',
      browserA: {
        title: 'Browser A',
        body: 'AEAD-encrypt + sign the update with a per-device Ed25519 key.',
      },
      relay: {
        title: 'Rust relay',
        tag: 'ciphertext only',
        body: 'Verify the signature, route by file, persist and broadcast — bytes unchanged.',
      },
      browserB: {
        title: 'Browser B',
        body: 'Verify, decrypt, and apply. Per-file keys derive from the collection master key.',
      },
      // html: contains the docs link
      docsNote:
        'Full key hierarchy, login flow, federation model, and wire spec live in the <a href="{docs}" target="_blank" rel="noopener noreferrer">documentation ↗</a>.',
    },
    stack: {
      eyebrow: 'Built on',
      title: 'A pragmatic, auditable stack',
    },
    ack: {
      lead: 'Inspired by great open-source projects:',
    },
    cta: {
      title: 'Run your own encrypted Drive today',
      // html: inline code
      body: 'Clone the repo, fill in a few secrets, and <code>docker compose up</code>. You’re the only one who can read your data.',
      getStarted: 'Get started',
      viewSource: 'View source ↗',
    },
  },

  features: {
    meta: {
      title: 'Features',
      description:
        'Drive, live notes & code, OnlyOffice documents, Excalidraw whiteboards, version history, federation, and a fully E2EE CLI — everything Kutup does.',
    },
    hero: {
      eyebrow: 'Features',
      title: 'Everything encrypted, nothing compromised',
      sub: 'Kutup pairs a zero-knowledge server with real-time collaboration across every file type. Here’s how each piece works.',
    },
    sections: [
      {
        eyebrow: 'Drive',
        title: 'Files and folders the server can’t read',
        alt: 'Kutup Drive file browser',
        points: [
          'Nested collections with drag-and-drop upload and a hard-baked encryption boundary.',
          'Filenames, MIME types, and folder structure are all encrypted client-side.',
          'Public share links and per-user folder shares with granular read / upload / delete permissions.',
          'Stream upload via crypto_secretstream_xchacha20poly1305 keeps large files out of memory.',
          'Storage backs onto SeaweedFS (S3-compatible).',
        ],
      },
      {
        eyebrow: 'Notes & code',
        title: 'Real-time text editing with presence',
        alt: 'CodeMirror notes editor',
        points: [
          'CodeMirror 6 + Yjs CRDT for Markdown, plain text, and 20+ code languages (Go, TS, Rust, Python, C/C++, Java, Shell, …).',
          'Multi-user cursors and selection presence, with an awareness color each user picks.',
          'Every edit is a Yjs binary update wrapped in an AEAD envelope — the server only ever sees opaque ciphertext.',
        ],
      },
      {
        eyebrow: 'Office documents',
        title: '.docx, .xlsx, .pptx — encrypted, in the browser',
        alt: 'OnlyOffice spreadsheet editor',
        points: [
          'OnlyOffice runs entirely client-side using the CryptPad pattern; document state is never decrypted server-side.',
          'Live cell-selection presence shown as translucent colored ranges, with per-user colors and multi-tab differentiation.',
          'Full conditional formatting, formulas, and charts.',
        ],
      },
      {
        eyebrow: 'Whiteboards',
        title: 'Excalidraw canvases that sync live',
        alt: 'Excalidraw whiteboard',
        points: [
          '.excalidraw files open in the embedded Excalidraw editor with cross-tab sync.',
          'Last-write-wins reconciliation per element via versionNonce.',
          'Same end-to-end-encrypted envelope as every other file type.',
        ],
      },
      {
        eyebrow: 'Version history',
        title: 'Snapshot and restore any file',
        alt: 'Version history sidebar',
        points: [
          'Every save creates a versioned snapshot, browsable from the History sidebar in any editor.',
          'Named “Save version” entries are kept forever; anonymous saves age out (30 days or 50 versions, whichever yields more).',
          'The endpoint is file-type-agnostic — notes, office, and whiteboards all use the same plumbing.',
        ],
      },
      {
        eyebrow: 'Keys & devices',
        title: 'You hold the only keys',
        alt: 'Settings — devices and presence color',
        points: [
          'Per-device Ed25519 keypairs, each individually revocable.',
          'A 24-word BIP39 recovery phrase that doubles as the second factor for account recovery — never sent to the server.',
          'Optional TOTP 2FA, and a presence color that follows you across editors and tabs.',
        ],
      },
    ],
    federation: {
      eyebrow: 'Federation',
      title: 'Share across servers without sharing trust',
      subtitle:
        'Invite someone on a different Kutup instance to a folder. Both backends route ciphertext; neither ever sees plaintext.',
      // html: inline code
      body: 'Federation invite links are built from each instance’s public <code>SERVER_URL</code>. Cross-server collaboration uses the same per-frame AEAD envelope and Ed25519 signatures as local editing — the encryption boundary doesn’t move just because a second server is involved.',
    },
    cli: {
      eyebrow: 'Command line',
      title: 'The same E2EE primitives, in your shell',
      subtitle:
        'kutup is a Rust CLI for register, login, ls, upload, download, sync, share, versions, devices, and 2FA — all end-to-end encrypted. The server only ever sees ciphertext.',
      install: 'Build from source (Rust ≥ 1.91)',
      installNote:
        'Tagged release binaries (Linux / macOS / Windows; amd64 + arm64) are published on GitHub Releases.',
      workflows: 'Common workflows',
      standoutTitle: 'The standout: > 2 GB uploads',
      // html: inline code
      standoutBody:
        'The browser File API wedges the tab at multi-GB sizes. The CLI streams chunked <code>crypto_secretstream</code> encryption (XChaCha20-Poly1305, 5 MB blocks) over a Rust reader, so it pushes arbitrarily large files — ISOs, raw video, datasets — at a constant ~5 MB of memory. File size is bounded by disk, not RAM.',
    },
    cta: {
      title: 'Ready to try it?',
      readDocs: 'Read the docs ↗',
    },
  },

  download: {
    meta: {
      title: 'Download',
      description:
        'Get Kutup for desktop (macOS, Windows, Linux), mobile (iOS, Android), or the command line. All clients are end-to-end encrypted.',
    },
    hero: {
      eyebrow: 'Download',
      title: 'Get Kutup on every device',
      sub: 'Web, desktop, mobile, and a full CLI — every client encrypts end-to-end before anything touches the network. You’ll point each one at your own Kutup server.',
      badge: 'Pre-release — binaries are published on GitHub Releases',
    },
    desktop: {
      eyebrow: 'Desktop app',
      titleKnown: 'Recommended for {os}',
      titleUnknown: 'Download the desktop app',
      body: 'Native shell built with Tauri 2 — macOS, Windows, and Linux (amd64 & arm64), with auto-updates and OS keychain support. Builds are published on GitHub Releases.',
      downloadFor: 'Download for {os}',
      goToReleases: 'Go to Releases',
      allPlatforms: 'All platforms',
      preRelease:
        'Pre-release — desktop v1 ships without in-app office-doc editing (open office files in the browser app). Builds aren’t code-signed yet, so macOS Gatekeeper / Windows SmartScreen may warn on first launch.',
    },
    mobile: {
      eyebrow: 'Mobile',
      title: 'iOS & Android',
      body: 'Native mobile builds via Tauri. iOS persists your session in the keychain. Distribution is in progress — track availability on GitHub Releases.',
      cta: 'Check Releases ↗',
    },
    web: {
      eyebrow: 'Web',
      title: 'Use it in the browser',
      body: 'The full web app — including office-document editing — ships with every self-hosted instance. Stand up your own server and open it in any modern browser.',
      cta: 'Self-hosting guide',
    },
    cli: {
      eyebrow: 'Command line',
      title: 'Install the CLI',
      subtitle:
        'End-to-end encrypted file operations from your shell — including multi-GB uploads the browser can’t handle.',
      fromSource: 'Build from source (Rust ≥ 1.91)',
      // html: contains the releases link
      binaryNote:
        'Prefer a binary? Tagged builds for Linux / macOS / Windows (amd64 + arm64) are on <a href="{releases}" target="_blank" rel="noopener noreferrer">GitHub Releases ↗</a>.',
    },
  },

  selfHost: {
    meta: {
      title: 'Self-hosting',
      description:
        'Run your own Kutup instance with Docker Compose. Prerequisites, configuration, TLS, backups, and hardening.',
    },
    hero: {
      eyebrow: 'Self-hosting',
      title: 'Run your own Kutup in minutes',
      sub: 'Kutup is self-hosted by design. A production deployment is a Docker Compose stack — backend, database, encrypted storage, and Nginx. Here’s the quick start; the full guide lives in the docs.',
      ctaDocs: 'Full self-hosting docs ↗',
      ctaRepo: 'View the repo ↗',
    },
    prereqs: {
      title: 'Prerequisites',
      items: [
        'Docker 24+ and Docker Compose v2 (the docker compose command).',
        'A Linux server with at least 1 GB of RAM.',
        'A domain name — required for HTTPS and for federation to work correctly.',
      ],
    },
    steps: {
      clone: {
        title: '1. Clone and configure',
        intro: 'Clone the repo and create your environment file:',
        // html: inline code
        envIntro:
          'Edit <code>.env</code> and fill in every value with strong secrets:',
        // html: inline code
        s3Note:
          'The S3 secret in <code>seaweedfs-s3.json</code> must match <code>S3_SECRET_KEY</code>.',
      },
      start: {
        title: '2. Start the stack',
        intro:
          'Build and launch all services — Postgres, SeaweedFS, backend, frontend, and Nginx:',
      },
      login: {
        title: '3. First login',
        intro:
          'Find the admin bootstrap confirmation in the logs, then open your domain and log in:',
        // html: <strong>
        note: 'On first login you’ll generate your <strong>24-word recovery phrase</strong> (write it down — it’s the only way to recover your account and is never sent to the server) and can optionally enable 2FA.',
      },
      tls: {
        title: '4. Add TLS',
        // html: inline code
        intro:
          'The bundled Nginx listens on port 80. Issue a certificate with Certbot, drop <code>fullchain.pem</code> and <code>privkey.pem</code> into <code>nginx/certs/</code>, add a 443 server block, and reload:',
      },
    },
    operating: {
      title: 'Operating your instance',
      cards: [
        {
          title: 'Backups',
          // html-capable
          body: 'Dump PostgreSQL and archive the SeaweedFS data dirs. The file chunks are ciphertext only — a stolen backup is useless without user keys.',
        },
        {
          title: 'Updating',
          body: '<code>git pull</code> then <code>docker compose up -d --build</code>. Database migrations run automatically on backend startup.',
        },
        {
          title: 'Reverse proxy',
          body: 'Already running Nginx or Caddy? Bind the stack to <code>127.0.0.1:8080</code> and proxy to it (disable request buffering for large uploads).',
        },
        {
          title: 'Hardening',
          body: 'Change all <code>.env</code> defaults, expose only 80/443, and generate <code>JWT_SECRET</code> with <code>openssl rand -hex 64</code>. The bootstrap account is a protected break-glass admin — give it a strong password.',
        },
      ],
      // html: contains the docs link
      docsNote:
        'For OnlyOffice setup, lifecycle/versioning config, federation, and the full reference, see the <a href="{docs}" target="_blank" rel="noopener noreferrer">documentation ↗</a>.',
    },
    cta: {
      title: 'Already running Kutup?',
      body: 'List your server in the public instance directory so others can find it.',
      browse: 'Browse instances',
      submit: 'Submit your instance ↗',
    },
  },

  instances: {
    meta: {
      title: 'Public instances',
      description:
        'A directory of community-run Kutup servers you can sign up to — or host your own.',
    },
    hero: {
      eyebrow: 'Public instances',
      title: 'Find a Kutup server to join',
      sub: 'Because Kutup is end-to-end encrypted, even an instance you don’t operate can’t read your files. Pick a community-run server, or run your own for full control.',
    },
    trust: {
      title: 'A note on trust',
      body: 'Listing here is community-submitted and not an endorsement. Operators can’t read your content, but they do control availability and uptime. For sensitive or long-term data, self-hosting is the strongest guarantee.',
    },
    filter: {
      emptyTitle: 'No public instances listed yet',
      emptyBody:
        'Kutup is self-hosted by design and currently pre-release. Run your own server in minutes, or list yours here for others to find.',
      hostYourOwn: 'Host your own',
      submit: 'Submit your instance ↗',
      searchPlaceholder: 'Search instances…',
      allRegions: 'all',
      signups: {
        open: 'Open signups',
        invite: 'Invite only',
        closed: 'Closed',
      },
      noMatch: 'No instances match your filter.',
    },
  },

  notFound: {
    metaTitle: 'Page not found',
    metaDescription: 'The page you were looking for doesn’t exist.',
    title: 'This page is encrypted beyond recovery',
    body: 'We couldn’t find what you were looking for. It may have moved, or never existed.',
    home: 'Back home',
    features: 'Browse features',
  },

  copy: {
    label: 'Copy',
    copied: '✓ Copied',
  },
}

export default en
