import { useState } from 'react'

interface NavItem {
  label: string
  href: string
  external?: boolean
}

interface Props {
  items: NavItem[]
  githubUrl: string
}

export default function MobileNav({ items, githubUrl }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-fg"
      >
        {open ? '✕' : '☰'}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full mt-px border-t border-border bg-surface/95 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-base text-fg hover:bg-surface-2"
              >
                {item.label}
                {item.external ? ' ↗' : ''}
              </a>
            ))}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-base text-fg hover:bg-surface-2"
            >
              GitHub ↗
            </a>
          </nav>
        </div>
      )}
    </div>
  )
}
