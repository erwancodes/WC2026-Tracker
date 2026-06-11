import { useCallback, useMemo } from 'react'
import { useSettings } from '../hooks/useSettings'

type Country = { code: string; fr: string }

// Nom d'équipe (tel que renvoyé par TheSportsDB) → code drapeau flagcdn + nom français.
// flagcdn supporte les nations britanniques via gb-eng / gb-sct.
const COUNTRIES: Record<string, Country> = {
  Algeria: { code: 'dz', fr: 'Algérie' },
  Argentina: { code: 'ar', fr: 'Argentine' },
  Australia: { code: 'au', fr: 'Australie' },
  Austria: { code: 'at', fr: 'Autriche' },
  Belgium: { code: 'be', fr: 'Belgique' },
  'Bosnia-Herzegovina': { code: 'ba', fr: 'Bosnie-Herzégovine' },
  Brazil: { code: 'br', fr: 'Brésil' },
  Canada: { code: 'ca', fr: 'Canada' },
  'Cape Verde': { code: 'cv', fr: 'Cap-Vert' },
  Colombia: { code: 'co', fr: 'Colombie' },
  Croatia: { code: 'hr', fr: 'Croatie' },
  'Curaçao': { code: 'cw', fr: 'Curaçao' },
  'Czech Republic': { code: 'cz', fr: 'République tchèque' },
  'DR Congo': { code: 'cd', fr: 'RD Congo' },
  Ecuador: { code: 'ec', fr: 'Équateur' },
  Egypt: { code: 'eg', fr: 'Égypte' },
  England: { code: 'gb-eng', fr: 'Angleterre' },
  France: { code: 'fr', fr: 'France' },
  Germany: { code: 'de', fr: 'Allemagne' },
  Ghana: { code: 'gh', fr: 'Ghana' },
  Haiti: { code: 'ht', fr: 'Haïti' },
  Iran: { code: 'ir', fr: 'Iran' },
  Iraq: { code: 'iq', fr: 'Irak' },
  'Ivory Coast': { code: 'ci', fr: "Côte d'Ivoire" },
  Japan: { code: 'jp', fr: 'Japon' },
  Jordan: { code: 'jo', fr: 'Jordanie' },
  Mexico: { code: 'mx', fr: 'Mexique' },
  Morocco: { code: 'ma', fr: 'Maroc' },
  Netherlands: { code: 'nl', fr: 'Pays-Bas' },
  'New Zealand': { code: 'nz', fr: 'Nouvelle-Zélande' },
  Norway: { code: 'no', fr: 'Norvège' },
  Panama: { code: 'pa', fr: 'Panama' },
  Paraguay: { code: 'py', fr: 'Paraguay' },
  Portugal: { code: 'pt', fr: 'Portugal' },
  Qatar: { code: 'qa', fr: 'Qatar' },
  'Saudi Arabia': { code: 'sa', fr: 'Arabie saoudite' },
  Scotland: { code: 'gb-sct', fr: 'Écosse' },
  Senegal: { code: 'sn', fr: 'Sénégal' },
  'South Africa': { code: 'za', fr: 'Afrique du Sud' },
  'South Korea': { code: 'kr', fr: 'Corée du Sud' },
  Spain: { code: 'es', fr: 'Espagne' },
  Sweden: { code: 'se', fr: 'Suède' },
  Switzerland: { code: 'ch', fr: 'Suisse' },
  Tunisia: { code: 'tn', fr: 'Tunisie' },
  Turkey: { code: 'tr', fr: 'Turquie' },
  Uruguay: { code: 'uy', fr: 'Uruguay' },
  USA: { code: 'us', fr: 'États-Unis' },
  Uzbekistan: { code: 'uz', fr: 'Ouzbékistan' },
}

// Quelques alias défensifs pour les variantes de nommage éventuelles.
const ALIASES: Record<string, string> = {
  'United States': 'USA',
  'Korea Republic': 'South Korea',
  'IR Iran': 'Iran',
  'Türkiye': 'Turkey',
  'Côte d’Ivoire': 'Ivory Coast',
  'Cabo Verde': 'Cape Verde',
}

function resolve(name: string): Country | undefined {
  return COUNTRIES[name] ?? COUNTRIES[ALIASES[name] ?? '']
}

/** URL du drapeau (flagcdn) pour une équipe, ou null si le pays n'est pas connu. */
export function flagUrl(name: string, size = 40): string | null {
  const country = resolve(name)
  return country ? `https://flagcdn.com/w${size}/${country.code}.png` : null
}

/** Nom français d'une équipe, ou le nom d'origine si non répertorié. */
export function frenchName(name: string): string {
  return resolve(name)?.fr ?? name
}

/** Renvoie de quoi afficher une équipe : drapeau (avec repli logo) + nom localisé. */
export function useCountry() {
  const { settings } = useSettings()
  const fr = settings.language === 'fr'

  const flag = useCallback(
    (name: string, fallbackLogo = '', size = 40) => flagUrl(name, size) ?? fallbackLogo,
    [],
  )
  const label = useCallback((name: string) => (fr ? frenchName(name) : name), [fr])

  return useMemo(() => ({ flag, label }), [flag, label])
}
