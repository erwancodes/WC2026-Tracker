import { useCallback } from 'react'
import { useSettings } from '../hooks/useSettings'

const dict = {
  fr: {
    // Navigation
    'nav.live': 'Live',
    'nav.scores': 'Scores',
    'nav.standings': 'Classements',
    'nav.teams': 'Équipes',
    'nav.settings': 'Paramètres',

    // Statuts
    'status.live': 'EN COURS',
    'status.finished': 'TERMINÉ',
    'status.halftime': 'MI-TEMPS',
    'status.penalties': 'T.A.B.',

    // Live
    'live.title': 'Matchs du jour',
    'live.subtitle': 'Tous les matchs, mis à jour toutes les 30 secondes.',
    'live.none.today': 'Aucun match aujourd’hui',
    'live.next.matches': 'Prochains matchs',
    'live.next.match.on': 'Prochain match le',
    'live.error': 'Impossible de charger les matchs.',
    'live.retry': 'Réessayer',
    'live.no.upcoming': 'Aucun match à venir.',
    'live.others': 'Autres matchs du jour',

    // Compte à rebours d'ouverture
    'countdown.kickoff': 'Coup d’envoi du tournoi',
    'countdown.opener': 'Match d’ouverture',
    'countdown.days': 'jours',
    'countdown.hours': 'heures',
    'countdown.minutes': 'min',
    'countdown.seconds': 'sec',

    // Barre match en cours / prochain
    'bar.live': 'EN DIRECT',
    'bar.next': 'PROCHAIN MATCH',
    'bar.kickoff': 'Coup d’envoi',
    'bar.starting': 'imminent',
    'bar.in': 'dans',
    'bar.others.one': 'autre match en cours',
    'bar.others.many': 'autres matchs en cours',

    // Scores
    'scores.title': 'Tous les matchs',
    'scores.subtitle': '104 matchs, de la phase de groupes à la finale.',
    'scores.filter.group': 'Groupe',
    'scores.filter.all.groups': 'Tous',
    'scores.filter.status': 'Statut',
    'scores.filter.status.all': 'Tous',
    'scores.filter.status.live': 'En cours',
    'scores.filter.status.finished': 'Terminés',
    'scores.filter.status.upcoming': 'À venir',
    'scores.filter.team': 'Filtrer par équipe…',
    'scores.empty': 'Aucun match ne correspond à ces filtres.',
    'scores.live.now': 'En ce moment',

    // Standings
    'standings.title': 'Classements',
    'standings.subtitle': 'Phase de groupes — les 2 premiers qualifiés, les meilleurs 3es repêchés.',
    'standings.all.groups': 'Tous',
    'standings.group': 'Groupe',
    'standings.updated.at': 'Mis à jour à',
    'standings.legend.qualified': 'Qualifié',
    'standings.legend.playoff': 'Repêchage possible',
    'standings.col.team': 'Équipe',
    'standings.empty': 'Classements indisponibles pour le moment.',

    // Teams
    'teams.title': 'Les 48 équipes',
    'teams.subtitle': 'Effectifs, staff et statistiques de chaque nation qualifiée.',
    'teams.group': 'Groupe',

    // Drawer
    'drawer.rank.in.group': 'au groupe',
    'drawer.players': 'Joueurs',
    'drawer.staff': 'Staff',
    'drawer.coach': 'Sélectionneur',
    'drawer.stats.points': 'Points',
    'drawer.stats.played': 'Joués',
    'drawer.stats.goals.for': 'Buts pour',
    'drawer.stats.goals.against': 'Buts contre',
    'drawer.see.matches': 'Voir les matchs',
    'drawer.squad.error': 'Effectif indisponible.',
    'drawer.years': 'ans',
    'pos.goalkeeper': 'Gardiens',
    'pos.defender': 'Défenseurs',
    'pos.midfielder': 'Milieux',
    'pos.attacker': 'Attaquants',

    // Settings
    'settings.title': 'Paramètres',
    'settings.subtitle': 'Préférences enregistrées sur cet appareil.',
    'settings.timezone': 'Fuseau horaire',
    'settings.timezone.hint': 'Toutes les heures de l’app sont affichées dans ce fuseau.',
    'settings.timezone.suggested': 'Suggérés',
    'settings.timezone.all': 'Tous les fuseaux',
    'settings.timeformat': 'Format d’heure',
    'settings.language': 'Langue de l’interface',
    'settings.theme': 'Thème',
    'settings.theme.dark': 'Sombre',
    'settings.theme.light': 'Clair',

    // Rounds
    'round.group.stage': 'Phase de groupes · Journée',
    'round.32': '32es de finale',
    'round.16': '8es de finale',
    'round.quarter': 'Quarts de finale',
    'round.semi': 'Demi-finales',
    'round.third': 'Match pour la 3e place',
    'round.final': 'Finale',
    'round.knockout': 'Phase finale',
  },
  en: {
    'nav.live': 'Live',
    'nav.scores': 'Scores',
    'nav.standings': 'Standings',
    'nav.teams': 'Teams',
    'nav.settings': 'Settings',

    'status.live': 'LIVE',
    'status.finished': 'FULL TIME',
    'status.halftime': 'HALF TIME',
    'status.penalties': 'PENS',

    'live.title': 'Today’s matches',
    'live.subtitle': 'Every match, refreshed every 30 seconds.',
    'live.none.today': 'No match today',
    'live.next.matches': 'Upcoming matches',
    'live.next.match.on': 'Next match on',
    'live.error': 'Could not load matches.',
    'live.retry': 'Retry',
    'live.no.upcoming': 'No upcoming match.',
    'live.others': 'Other matches today',

    'countdown.kickoff': 'Tournament kick-off',
    'countdown.opener': 'Opening match',
    'countdown.days': 'days',
    'countdown.hours': 'hours',
    'countdown.minutes': 'min',
    'countdown.seconds': 'sec',

    'bar.live': 'LIVE',
    'bar.next': 'NEXT MATCH',
    'bar.kickoff': 'Kick-off',
    'bar.starting': 'starting soon',
    'bar.in': 'in',
    'bar.others.one': 'other match live',
    'bar.others.many': 'other matches live',

    'scores.title': 'All matches',
    'scores.subtitle': '104 matches, from the group stage to the final.',
    'scores.filter.group': 'Group',
    'scores.filter.all.groups': 'All',
    'scores.filter.status': 'Status',
    'scores.filter.status.all': 'All',
    'scores.filter.status.live': 'Live',
    'scores.filter.status.finished': 'Finished',
    'scores.filter.status.upcoming': 'Upcoming',
    'scores.filter.team': 'Filter by team…',
    'scores.empty': 'No match found for these filters.',
    'scores.live.now': 'Happening now',

    'standings.title': 'Standings',
    'standings.subtitle': 'Group stage — top 2 qualify, best 3rd-placed teams advance.',
    'standings.all.groups': 'All',
    'standings.group': 'Group',
    'standings.updated.at': 'Updated at',
    'standings.legend.qualified': 'Qualified',
    'standings.legend.playoff': 'Possible best 3rd',
    'standings.col.team': 'Team',
    'standings.empty': 'Standings unavailable for now.',

    'teams.title': 'The 48 teams',
    'teams.subtitle': 'Squads, staff and stats for every qualified nation.',
    'teams.group': 'Group',

    'drawer.rank.in.group': 'in group',
    'drawer.players': 'Players',
    'drawer.staff': 'Staff',
    'drawer.coach': 'Head coach',
    'drawer.stats.points': 'Points',
    'drawer.stats.played': 'Played',
    'drawer.stats.goals.for': 'Goals for',
    'drawer.stats.goals.against': 'Goals against',
    'drawer.see.matches': 'See matches',
    'drawer.squad.error': 'Squad unavailable.',
    'drawer.years': 'yrs',
    'pos.goalkeeper': 'Goalkeepers',
    'pos.defender': 'Defenders',
    'pos.midfielder': 'Midfielders',
    'pos.attacker': 'Forwards',

    'settings.title': 'Settings',
    'settings.subtitle': 'Preferences saved on this device.',
    'settings.timezone': 'Timezone',
    'settings.timezone.hint': 'Every time in the app is shown in this timezone.',
    'settings.timezone.suggested': 'Suggested',
    'settings.timezone.all': 'All timezones',
    'settings.timeformat': 'Time format',
    'settings.language': 'Interface language',
    'settings.theme': 'Theme',
    'settings.theme.dark': 'Dark',
    'settings.theme.light': 'Light',

    'round.group.stage': 'Group stage · Matchday',
    'round.32': 'Round of 32',
    'round.16': 'Round of 16',
    'round.quarter': 'Quarter-finals',
    'round.semi': 'Semi-finals',
    'round.third': 'Third place play-off',
    'round.final': 'Final',
    'round.knockout': 'Knockout stage',
  },
} as const

export type TranslationKey = keyof (typeof dict)['fr']

export function useT() {
  const { settings } = useSettings()
  return useCallback(
    (key: TranslationKey): string => dict[settings.language][key] ?? key,
    [settings.language],
  )
}

/** "Group Stage - 1" → "Phase de groupes · Journée 1", "Round of 32" → "32es de finale", etc. */
export function formatRound(round: string, t: (key: TranslationKey) => string): string {
  const groupStage = round.match(/^Group Stage - (\d+)$/i)
  if (groupStage) return `${t('round.group.stage')} ${groupStage[1]}`
  if (/round of 32/i.test(round)) return t('round.32')
  if (/round of 16/i.test(round)) return t('round.16')
  if (/quarter/i.test(round)) return t('round.quarter')
  if (/semi/i.test(round)) return t('round.semi')
  if (/3rd|third/i.test(round)) return t('round.third')
  if (/final/i.test(round)) return t('round.final')
  if (/knockout/i.test(round)) return t('round.knockout')
  return round
}
