import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Settings = {
  timezone: string
  timeFormat: '24h' | '12h'
  language: 'fr' | 'en'
  theme: 'dark' | 'light'
}

const STORAGE_KEY = 'wc2026_settings'

/** Langue par défaut déduite de la locale du navigateur (français sinon anglais). */
function detectLanguage(): Settings['language'] {
  const langs =
    typeof navigator !== 'undefined'
      ? [navigator.language, ...(navigator.languages ?? [])]
      : []
  return langs.some((l) => l?.toLowerCase().startsWith('fr')) ? 'fr' : 'en'
}

function defaultSettings(): Settings {
  return {
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Paris',
    timeFormat: '24h',
    language: detectLanguage(),
    theme: 'light',
  }
}

function loadSettings(): Settings {
  const defaults = defaultSettings()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaults
    const parsed = JSON.parse(raw) as Partial<Settings>
    return {
      timezone: typeof parsed.timezone === 'string' ? parsed.timezone : defaults.timezone,
      timeFormat: parsed.timeFormat === '12h' ? '12h' : '24h',
      language: parsed.language === 'en' ? 'en' : 'fr',
      theme: parsed.theme === 'dark' ? 'dark' : 'light',
    }
  } catch {
    return defaults
  }
}

type SettingsContextValue = {
  settings: Settings
  updateSettings: (patch: Partial<Settings>) => void
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(loadSettings)

  const updateSettings = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // localStorage indisponible (mode privé) : on garde l'état en mémoire
      }
      return next
    })
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme
    document.documentElement.lang = settings.language
  }, [settings.theme, settings.language])

  const value = useMemo(() => ({ settings, updateSettings }), [settings, updateSettings])

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings doit être utilisé dans <SettingsProvider>')
  return ctx
}
