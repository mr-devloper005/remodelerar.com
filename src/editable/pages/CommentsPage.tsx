'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { MessageSquare, Search } from 'lucide-react'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

type StoredComment = {
  id: string
  name: string
  email?: string
  comment: string
  createdAt: string
  articleTitle?: string
  articleSlug?: string
}

const COMMENTS_PER_PAGE = 8
const COMMENT_KEY_PREFIX = 'slot4:article-comments:'

const formatDate = (value: string) => {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value))
  } catch {
    return 'Just now'
  }
}

const readCommentsFromStorage = (): StoredComment[] => {
  const items: StoredComment[] = []
  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index)
    if (!key?.startsWith(COMMENT_KEY_PREFIX)) continue
    const articleSlug = key.replace(COMMENT_KEY_PREFIX, '')
    try {
      const parsed = JSON.parse(window.localStorage.getItem(key) || '[]')
      if (!Array.isArray(parsed)) continue
      for (const item of parsed) {
        if (!item || typeof item !== 'object') continue
        if (typeof item.name !== 'string' || typeof item.comment !== 'string') continue
        items.push({
          id: typeof item.id === 'string' ? item.id : `${articleSlug}-${items.length}`,
          name: item.name,
          email: typeof item.email === 'string' ? item.email : undefined,
          comment: item.comment,
          createdAt: typeof item.createdAt === 'string' ? item.createdAt : new Date().toISOString(),
          articleTitle: typeof item.articleTitle === 'string' ? item.articleTitle : undefined,
          articleSlug: typeof item.articleSlug === 'string' ? item.articleSlug : articleSlug,
        })
      }
    } catch {
      // Ignore corrupted local comment records.
    }
  }

  return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export default function CommentsPage() {
  const [comments, setComments] = useState<StoredComment[]>([])
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    setComments(readCommentsFromStorage())
  }, [])

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return comments
    return comments.filter((item) => {
      return [item.name, item.email, item.comment, item.articleTitle, item.articleSlug]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term))
    })
  }, [comments, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / COMMENTS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const visibleComments = filtered.slice((currentPage - 1) * COMMENTS_PER_PAGE, currentPage * COMMENTS_PER_PAGE)

  function refreshComments() {
    setComments(readCommentsFromStorage())
    setPage(1)
  }

  return (
    <EditableSiteShell>
      <main className="bg-[#0c1023] text-white">
        <section className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="border border-white/[0.06] bg-[#141831] p-6 sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#d4862a]">
                  <MessageSquare className="h-4 w-4" /> Guide comments
                </p>
                <h1 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-5xl">Comments</h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/40">
                  Review visitor comments saved from guide pages.
                </p>
              </div>
              <button type="button" className="border border-white/[0.06] bg-[#0f1329] px-5 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white/[0.06]" onClick={refreshComments}>Refresh</button>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-md">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                <input
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value)
                    setPage(1)
                  }}
                  placeholder="Search comments"
                  className="h-11 w-full border border-white/[0.06] bg-[#0f1329] pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-[#3d3dba]"
                />
              </div>
              <p className="text-sm text-white/30">
                {filtered.length} comment{filtered.length === 1 ? '' : 's'} found
              </p>
            </div>
          </div>

          {visibleComments.length ? (
            <div className="mt-6 grid gap-4">
              {visibleComments.map((item) => (
                <article key={`${item.articleSlug}-${item.id}`} className="border border-white/[0.06] bg-[#141831] p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-bold text-white">{item.name}</p>
                      <p className="mt-1 text-xs text-white/30">{formatDate(item.createdAt)}</p>
                    </div>
                    {item.articleSlug ? (
                      <Link href={`/article/${item.articleSlug}`} className="text-sm font-bold text-[#d4862a] hover:underline">
                        Open guide
                      </Link>
                    ) : null}
                  </div>
                  {item.articleTitle ? <p className="mt-4 text-sm font-bold text-white/70">{item.articleTitle}</p> : null}
                  <p className="mt-3 text-sm leading-7 text-white/40">{item.comment}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-6 border border-dashed border-white/10 bg-[#141831] p-10 text-center">
              <h2 className="text-xl font-black uppercase text-white">No comments yet</h2>
              <p className="mt-2 text-sm text-white/40">Add a comment on any guide page and it will appear here.</p>
            </div>
          )}

          {filtered.length > COMMENTS_PER_PAGE ? (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border border-white/[0.06] bg-[#141831] p-4 text-sm text-white/40">
              <span>Page {currentPage} of {totalPages}</span>
              <div className="flex gap-3">
                <button type="button" className="border border-white/[0.06] bg-[#0f1329] px-5 py-2 text-sm font-bold text-white disabled:opacity-40" disabled={currentPage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>Previous</button>
                <button type="button" className="border border-white/[0.06] bg-[#0f1329] px-5 py-2 text-sm font-bold text-white disabled:opacity-40" disabled={currentPage >= totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))}>Next</button>
              </div>
            </div>
          ) : null}
        </section>
      </main>
    </EditableSiteShell>
  )
}
