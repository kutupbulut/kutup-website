import { useMemo, useState } from 'react'

export interface Instance {
  name: string
  url: string
  region: string
  signups: 'open' | 'invite' | 'closed'
  operator?: string
  notes?: string
}

interface Props {
  instances: Instance[]
  submitUrl: string
  selfHostUrl: string
}

const SIGNUP_LABEL: Record<Instance['signups'], string> = {
  open: 'Open signups',
  invite: 'Invite only',
  closed: 'Closed',
}

const SIGNUP_STYLE: Record<Instance['signups'], string> = {
  open: 'bg-teal/15 text-teal',
  invite: 'bg-amber/15 text-amber',
  closed: 'bg-danger/15 text-danger',
}

export default function InstanceFilter({ instances, submitUrl, selfHostUrl }: Props) {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('all')

  const regions = useMemo(
    () => ['all', ...Array.from(new Set(instances.map((i) => i.region))).sort()],
    [instances],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return instances.filter((i) => {
      const matchesRegion = region === 'all' || i.region === region
      const matchesQuery =
        !q ||
        i.name.toLowerCase().includes(q) ||
        i.url.toLowerCase().includes(q) ||
        (i.operator?.toLowerCase().includes(q) ?? false)
      return matchesRegion && matchesQuery
    })
  }, [instances, query, region])

  if (instances.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
        <p className="text-lg font-semibold text-fg">No public instances listed yet</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Kutup is self-hosted by design and currently pre-release. Run your own
          server in minutes, or list yours here for others to find.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={selfHostUrl}
            className="inline-flex items-center justify-center rounded-lg bg-ice px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-pale"
          >
            Host your own
          </a>
          <a
            href={submitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-surface-2 px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-ice/60 hover:text-ice"
          >
            Submit your instance ↗
          </a>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search instances…"
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-fg placeholder:text-muted focus:border-ice/60 focus:outline-none sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          {regions.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                region === r
                  ? 'bg-ice text-ink'
                  : 'border border-border bg-surface-2 text-muted hover:text-fg'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {filtered.map((i) => (
          <a
            key={i.url}
            href={i.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-ice/50"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-fg group-hover:text-ice">{i.name}</h3>
                <p className="mt-0.5 text-sm text-muted">{i.url.replace(/^https?:\/\//, '')}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${SIGNUP_STYLE[i.signups]}`}
              >
                {SIGNUP_LABEL[i.signups]}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted">
              <span className="rounded bg-surface-2 px-2 py-0.5 capitalize">{i.region}</span>
              {i.operator && <span>· {i.operator}</span>}
            </div>
            {i.notes && <p className="mt-2 text-sm text-muted">{i.notes}</p>}
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-sm text-muted">No instances match your filter.</p>
      )}

      <div className="mt-8 text-center">
        <a
          href={submitUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-ice hover:text-pale"
        >
          Submit your instance ↗
        </a>
      </div>
    </div>
  )
}
