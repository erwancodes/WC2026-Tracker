import { useEffect } from 'react'

function setMeta(selector: string, attr: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    const [, name] = selector.match(/\[(?:name|property)="(.+)"\]/) ?? []
    if (name) el.setAttribute(selector.includes('property') ? 'property' : 'name', name)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

/** Met à jour le <title> et la meta description de la page (client-side, suivi par les crawlers JS). */
export function useSeo({ title, description }: { title: string; description?: string }) {
  useEffect(() => {
    const previous = document.title
    document.title = title
    setMeta('meta[property="og:title"]', 'content', title)
    if (description) {
      setMeta('meta[name="description"]', 'content', description)
      setMeta('meta[property="og:description"]', 'content', description)
    }
    return () => {
      document.title = previous
    }
  }, [title, description])
}
