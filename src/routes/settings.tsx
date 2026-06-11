import { useMemo } from 'react'
import { Clock, Globe, Moon, Translate } from '@phosphor-icons/react'
import { useSettings, type Settings } from '../hooks/useSettings'
import { useT } from '../lib/i18n'
import { useSeo } from '../hooks/useSeo'
import { formatTime } from '../lib/formatDate'
import { PageHeader } from './live'
import type { Icon } from '@phosphor-icons/react'

const SUGGESTED_TIMEZONES: { id: string; label: string }[] = [
  { id: 'America/New_York', label: 'EST — Côte est USA' },
  { id: 'America/Chicago', label: 'CST — Centre USA' },
  { id: 'America/Denver', label: 'MST — Montagne USA' },
  { id: 'America/Los_Angeles', label: 'PST — Côte ouest USA' },
  { id: 'America/Mexico_City', label: 'CST — Mexique' },
  { id: 'America/Vancouver', label: 'PST — Canada ouest' },
  { id: 'America/Toronto', label: 'EST — Canada est' },
  { id: 'Europe/Paris', label: 'CET — France' },
]

function allTimezones(): string[] {
  const intl = Intl as unknown as { supportedValuesOf?: (key: string) => string[] }
  try {
    return intl.supportedValuesOf?.('timeZone') ?? SUGGESTED_TIMEZONES.map((tz) => tz.id)
  } catch {
    return SUGGESTED_TIMEZONES.map((tz) => tz.id)
  }
}

function SettingSection({
  icon: IconComponent,
  title,
  hint,
  children,
}: {
  icon: Icon
  title: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <section className="border-b border-edge py-6 first:pt-0 last:border-b-0">
      <div className="mb-3 flex items-center gap-2.5">
        <span className="flex size-8 items-center justify-center rounded-lg bg-surface-2 text-live">
          <IconComponent size={16} weight="bold" />
        </span>
        <div>
          <h2 className="text-sm font-bold">{title}</h2>
          {hint && <p className="text-xs text-text-2">{hint}</p>}
        </div>
      </div>
      {children}
    </section>
  )
}

function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T
  options: { value: T; label: string }[]
  onChange: (value: T) => void
}) {
  return (
    <div className="inline-flex rounded-lg border border-edge bg-surface p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors active:scale-[0.97] ${
            value === option.value
              ? 'bg-live text-[#0a0a0a]'
              : 'text-text-2 hover:text-text'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export function SettingsPage() {
  const t = useT()
  useSeo({ title: `${t('settings.title')} · WC26 Tracker`, description: t('settings.subtitle') })
  const { settings, updateSettings } = useSettings()
  const timezones = useMemo(allTimezones, [])
  const now = new Date().toISOString()

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title={t('settings.title')} subtitle={t('settings.subtitle')} />

      <SettingSection
        icon={Globe}
        title={t('settings.timezone')}
        hint={t('settings.timezone.hint')}
      >
        <div className="flex flex-col gap-2">
          <select
            value={settings.timezone}
            onChange={(e) => updateSettings({ timezone: e.target.value })}
            className="w-full max-w-md rounded-lg border border-edge bg-surface px-3 py-2.5 text-sm outline-none transition-colors focus:border-live/60"
          >
            <optgroup label={t('settings.timezone.suggested')}>
              {SUGGESTED_TIMEZONES.map((tz) => (
                <option key={tz.id} value={tz.id}>
                  {tz.id} ({tz.label})
                </option>
              ))}
            </optgroup>
            <optgroup label={t('settings.timezone.all')}>
              {timezones
                .filter((tz) => !SUGGESTED_TIMEZONES.some((s) => s.id === tz))
                .map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
            </optgroup>
          </select>
          <p className="font-mono text-xs text-text-2">
            {settings.timezone} · {formatTime(now, settings)}
          </p>
        </div>
      </SettingSection>

      <SettingSection icon={Clock} title={t('settings.timeformat')}>
        <Segmented<Settings['timeFormat']>
          value={settings.timeFormat}
          options={[
            { value: '24h', label: '24h' },
            { value: '12h', label: '12h (AM/PM)' },
          ]}
          onChange={(timeFormat) => updateSettings({ timeFormat })}
        />
      </SettingSection>

      <SettingSection icon={Translate} title={t('settings.language')}>
        <Segmented<Settings['language']>
          value={settings.language}
          options={[
            { value: 'fr', label: 'Français' },
            { value: 'en', label: 'English' },
          ]}
          onChange={(language) => updateSettings({ language })}
        />
      </SettingSection>

      <SettingSection icon={Moon} title={t('settings.theme')}>
        <Segmented<Settings['theme']>
          value={settings.theme}
          options={[
            { value: 'dark', label: t('settings.theme.dark') },
            { value: 'light', label: t('settings.theme.light') },
          ]}
          onChange={(theme) => updateSettings({ theme })}
        />
      </SettingSection>
    </div>
  )
}
