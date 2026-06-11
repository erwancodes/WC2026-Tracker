export type LandingContent = (typeof landingContent)[keyof typeof landingContent]

export const landingContent = {
  fr: {
    seo: {
      title: 'WC26 Tracker — Coupe du Monde 2026 en direct',
      description:
        'Suivez la Coupe du Monde 2026 en direct : scores en temps réel, classements des 12 groupes et effectifs des 48 équipes. Gratuit, sans compte, dans votre fuseau horaire.',
    },
    nav: { standings: 'Classements', openApp: 'Ouvrir l’app' },
    hero: {
      badge: '11 juin — 19 juillet 2026',
      titlePre: 'La Coupe du Monde,',
      titleAccent: 'match après match.',
      subtitle:
        'Scores en temps réel, classements des 12 groupes et effectifs complets des 48 nations. La première Coupe du Monde à 48 équipes, aux États-Unis, au Mexique et au Canada — suivie dans votre fuseau horaire, sans compte.',
      ctaPrimary: 'Suivre les matchs en direct',
      ctaSecondary: 'Voir les classements',
      proof: '48 nations · 104 matchs · 16 villes',
    },
    stats: [
      { value: '48', label: 'équipes qualifiées' },
      { value: '104', label: 'matchs au programme' },
      { value: '16', label: 'villes hôtes' },
      { value: '3', label: 'pays organisateurs' },
    ],
    cities: [
      'Atlanta', 'Boston', 'Dallas', 'Guadalajara', 'Houston', 'Kansas City',
      'Los Angeles', 'Mexico', 'Miami', 'Monterrey', 'New York', 'Philadelphie',
      'San Francisco', 'Seattle', 'Toronto', 'Vancouver',
    ],
    features: {
      heading: 'Tout le tournoi, sur un seul écran.',
      subheading:
        'Quatre vues, zéro friction. Le direct, les classements, les effectifs et vos horaires locaux — tout est déjà prêt.',
      explore: 'Explorer',
      live: {
        title: 'Matchs en direct',
        description:
          'Chaque match du jour sur son terrain, score et minute actualisés toutes les 30 secondes. Prolongations et tirs au but compris.',
        badge: '3 matchs en cours',
      },
      standings: {
        title: 'Classements',
        description: 'Les 12 groupes en un coup d’œil, qualifiés et meilleurs troisièmes surlignés.',
      },
      teams: {
        title: '48 effectifs complets',
        description: 'Joueurs, numéros, postes et clubs de chaque nation, à un clic du drapeau.',
      },
      timezone: {
        title: 'Votre fuseau, vos horaires',
        description:
          'Quatre fuseaux pour les pays hôtes : choisissez le vôtre, toutes les heures s’adaptent.',
      },
    },
    cta: {
      eyebrow: 'Coup d’envoi aujourd’hui',
      heading: 'Le premier match n’attend pas.',
      button: 'Ouvrir le tracker',
    },
    faq: {
      heading: 'Questions fréquentes',
      items: [
        {
          q: 'Comment suivre la Coupe du Monde 2026 en direct gratuitement ?',
          a: 'WC26 Tracker affiche les scores en direct, les classements et les effectifs de la Coupe du Monde 2026 directement dans votre navigateur. C’est gratuit, sans compte et sans publicité : ouvrez l’app et le match du moment apparaît en grand sur son terrain.',
        },
        {
          q: 'Quand a lieu la Coupe du Monde 2026 ?',
          a: 'La Coupe du Monde de la FIFA 2026 se déroule du 11 juin au 19 juillet 2026.',
        },
        {
          q: 'Où se déroule la Coupe du Monde 2026 ?',
          a: 'Elle est organisée conjointement par les États-Unis, le Mexique et le Canada, dans 16 villes hôtes réparties sur quatre fuseaux horaires.',
        },
        {
          q: 'Combien d’équipes participent à la Coupe du Monde 2026 ?',
          a: 'C’est la première édition à 48 équipes, pour un total de 104 matchs, de la phase de groupes à la finale.',
        },
        {
          q: 'Faut-il créer un compte ou payer ?',
          a: 'Non. WC26 Tracker est entièrement gratuit, ne demande aucun compte et ne dépose aucun cookie de suivi. Vos préférences restent sur votre appareil.',
        },
      ],
    },
  },

  en: {
    seo: {
      title: 'WC26 Tracker — 2026 World Cup live',
      description:
        'Follow the 2026 World Cup live: real-time scores, all 12 group standings and the squads of the 48 teams. Free, no account, in your own timezone.',
    },
    nav: { standings: 'Standings', openApp: 'Open the app' },
    hero: {
      badge: 'June 11 — July 19, 2026',
      titlePre: 'The World Cup,',
      titleAccent: 'match by match.',
      subtitle:
        'Real-time scores, all 12 group standings and full squads for the 48 nations. The first 48-team World Cup, across the USA, Mexico and Canada — followed in your own timezone, no account needed.',
      ctaPrimary: 'Follow matches live',
      ctaSecondary: 'View standings',
      proof: '48 nations · 104 matches · 16 cities',
    },
    stats: [
      { value: '48', label: 'qualified teams' },
      { value: '104', label: 'scheduled matches' },
      { value: '16', label: 'host cities' },
      { value: '3', label: 'host countries' },
    ],
    cities: [
      'Atlanta', 'Boston', 'Dallas', 'Guadalajara', 'Houston', 'Kansas City',
      'Los Angeles', 'Mexico City', 'Miami', 'Monterrey', 'New York', 'Philadelphia',
      'San Francisco', 'Seattle', 'Toronto', 'Vancouver',
    ],
    features: {
      heading: 'The whole tournament, on one screen.',
      subheading:
        'Four views, zero friction. Live matches, standings, squads and your local kick-off times — all set up already.',
      explore: 'Explore',
      live: {
        title: 'Live matches',
        description:
          'Every match of the day on its pitch, score and minute refreshed every 30 seconds. Extra time and penalties included.',
        badge: '3 matches live',
      },
      standings: {
        title: 'Standings',
        description: 'All 12 groups at a glance, qualified teams and best third-placed sides highlighted.',
      },
      teams: {
        title: '48 full squads',
        description: 'Players, numbers, positions and clubs for every nation, one click from the flag.',
      },
      timezone: {
        title: 'Your timezone, your kick-offs',
        description:
          'Four timezones for the host countries: pick yours and every time adapts instantly.',
      },
    },
    cta: {
      eyebrow: 'Kick-off today',
      heading: 'The first match won’t wait.',
      button: 'Open the tracker',
    },
    faq: {
      heading: 'Frequently asked questions',
      items: [
        {
          q: 'How can I follow the 2026 World Cup live for free?',
          a: 'WC26 Tracker shows live scores, standings and squads for the 2026 World Cup right in your browser. It is free, with no account and no ads: open the app and the current match appears full-screen on its pitch.',
        },
        {
          q: 'When does the 2026 World Cup take place?',
          a: 'The 2026 FIFA World Cup runs from June 11 to July 19, 2026.',
        },
        {
          q: 'Where is the 2026 World Cup held?',
          a: 'It is co-hosted by the United States, Mexico and Canada, across 16 host cities spread over four timezones.',
        },
        {
          q: 'How many teams play in the 2026 World Cup?',
          a: 'It is the first 48-team edition, with a total of 104 matches from the group stage to the final.',
        },
        {
          q: 'Do I need an account or have to pay?',
          a: 'No. WC26 Tracker is completely free, requires no account and sets no tracking cookies. Your preferences stay on your device.',
        },
      ],
    },
  },
} as const
