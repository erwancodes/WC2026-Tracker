# PRD — WC2026 Tracker

> Webapp de suivi en temps réel de la Coupe du Monde 2026
> Stack : Vite + React + TanStack Router + TanStack Query
> Tournoi : 11 juin — 19 juillet 2026 · 48 équipes · 104 matchs · USA, Mexique, Canada

---

## 1. Contexte et objectif

La Coupe du Monde 2026 est la première édition à 48 équipes, répartie sur 3 pays hôtes dans des fuseaux horaires différents (ET, CT, MT, PT). Les fans ont besoin d'un outil simple, rapide, sans compte, pour suivre les matchs en direct, consulter les classements et explorer les effectifs, depuis n'importe quel appareil.

**WC2026 Tracker** répond à ce besoin : une SPA 100% frontend, sans backend, qui consomme directement l'API api-football.com.

---

## 2. Stack technique

| Élément | Choix |
|---|---|
| Bundler | Vite |
| UI | React 18 |
| Routing | TanStack Router |
| Data fetching | TanStack Query (refetch automatique) |
| Styling | CSS Modules ou Tailwind CSS |
| API | api-football.com (league `1`, season `2026`) |
| Clé API | `VITE_API_FOOTBALL_KEY` dans `.env` |
| Drapeaux | `flagcdn.com/w40/{code}.png` (gratuit, sans clé) |
| Backend | Aucun |

**Rafraîchissement live** : TanStack Query `refetchInterval: 30_000` activé uniquement sur les requêtes de matchs en cours.

---

## 3. Pages

### 3.1 `/` — Live

Page d'accueil. Affiche tous les matchs du jour.

**Composant central : MatchCard**

Chaque match est représenté par une carte avec :

- Un terrain de football en SVG (vue de dessus, fond vert `#1a6b3c`, lignes blanches)
- Les drapeaux et noms des deux équipes, positionnés de chaque côté du terrain
- Le score central (`2 — 1`) ou `vs` si le match n'a pas commencé
- Un badge statut :
  - `EN COURS` + minute en cours (badge vert, animation pulse) pour les statuts `1H`, `HT`, `2H`, `ET`, `P`
  - `TERMINÉ` (badge gris) pour `FT`, `AET`, `PEN`
  - Date et heure locale selon le fuseau choisi dans Settings (badge bleu) pour `NS`
- Le nom du stade et la ville en bas de carte

**Comportement** :
- Matchs triés : EN COURS en premier, puis À VENIR par heure, puis TERMINÉS
- Auto-refresh 30s uniquement si au moins un match est EN COURS
- Si aucun match aujourd'hui : afficher les 5 prochains matchs à venir
- Skeleton loading pendant le premier fetch

**États** :
- Chargement : skeleton cards
- Erreur API : message + bouton "Réessayer"
- Aucun match : "Prochain match le [date heure locale]"

---

### 3.2 `/standings` — Classements

Classements de la phase de groupes.

**Comportement** :
- 12 groupes (A à L) affichés en grille responsive (3 colonnes desktop, 1 mobile)
- Chaque groupe : tableau avec colonnes `#`, `Équipe`, `J`, `G`, `N`, `P`, `BP`, `BC`, `Diff`, `Pts`
- Les 2 premières lignes de chaque groupe surlignées en vert (qualifiés pour le tour suivant)
- La 3e ligne surlignée en jaune selon les règles de repêchage des meilleurs 3es
- Sélecteur en haut : filtrer par groupe (`Tous` par défaut, puis `A`, `B`, ... `L`)
- Drapeau cliquable dans le tableau → ouvre le TeamDrawer (voir 3.4)
- Heure de mise à jour affichée en bas : "Mis à jour à [heure]"

---

### 3.3 `/scores` — Scores

Historique et suivi de tous les matchs du tournoi.

**Comportement** :
- 104 matchs listés, groupés par phase puis par journée
- Filtres combinables :
  - Par groupe (A–L)
  - Par statut : Tous / En cours / Terminés / À venir
  - Par équipe : champ texte, filtre côté client sur le nom
- Chaque ligne : drapeau équipe A · score ou heure · drapeau équipe B · stade · date
- Matchs EN COURS épinglés en haut de liste, avec badge pulsant
- Auto-refresh 30s si matchs en cours présents

---

### 3.4 `/teams` — Équipes

Présentation des 48 équipes qualifiées.

**Comportement** :
- Grille de 48 drapeaux avec nom du pays et groupe (ex: "France · Groupe I")
- Organisés par groupe (A → L)
- Clic sur un drapeau → ouvre un **drawer latéral** (pas de navigation) contenant :
  - Bannière : grand drapeau + nom du pays + groupe + classement actuel dans le groupe
  - Section **Joueurs** : liste avec numéro, nom, poste, club, âge
  - Section **Staff** : coach principal + staff technique (préparateur physique, gardiens, etc.)
  - Stats rapides : points, matchs joués, buts pour, buts contre
  - Bouton "Voir les matchs" → redirige vers `/scores` filtré sur cette équipe
- Fermeture du drawer : clic en dehors ou touche Echap

---

### 3.5 `/settings` — Paramètres

Préférences utilisateur, persistées dans `localStorage`.

**Options disponibles** :

#### Fuseau horaire
- Sélecteur de fuseau horaire parmi tous les fuseaux IANA (`Intl.supportedValuesOf('timeZone')`)
- Valeur par défaut : fuseau du navigateur (`Intl.DateTimeFormat().resolvedOptions().timeZone`)
- Fuseaux suggérés en haut de liste (les 3 pays hôtes + France) :
  - `America/New_York` — EST (côte est USA)
  - `America/Chicago` — CST (centre USA)
  - `America/Denver` — MST (montagne USA)
  - `America/Los_Angeles` — PST (côte ouest USA)
  - `America/Mexico_City` — CST (Mexique)
  - `America/Vancouver` — PST (Canada ouest)
  - `America/Toronto` — EST (Canada est)
  - `Europe/Paris` — CET (France)
- Toutes les heures affichées dans l'app (MatchCard, liste scores) utilisent ce fuseau

#### Format d'heure
- `24h` (défaut) ou `12h (AM/PM)`

#### Langue de l'interface
- Français (défaut)
- English

#### Thème
- Sombre (défaut)
- Clair

**Persistance** : toutes les préférences sont stockées dans `localStorage` sous la clé `wc2026_settings` et lues au démarrage de l'app via un hook `useSettings`.

---

## 4. Navigation

```
Desktop (top navbar fixe)
┌──────────────────────────────────────────────────────┐
│  ⚽ WC2026      Live    Scores    Standings    Teams    ⚙️  │
└──────────────────────────────────────────────────────┘

Mobile (bottom nav bar)
┌──────────────────────────────────────────────────────┐
│         contenu de la page                           │
├──────────────────────────────────────────────────────┤
│  🔴 Live   📊 Scores   🏆 Standings   🌍 Teams   ⚙️     │
└──────────────────────────────────────────────────────┘
```

- TanStack Router, routes déclaratives, pas de reload complet
- Route active surlignée
- Icône ⚙️ toujours visible (dernier élément navbar / bottom nav)

---

## 5. Architecture des fichiers

```
wc2026-tracker/
├── .env                          # VITE_API_FOOTBALL_KEY=xxx
├── .env.example
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
│
└── src/
    ├── main.tsx                  # Bootstrap React + QueryClient + Router
    ├── router.ts                 # Déclaration TanStack Router
    │
    ├── routes/
    │   ├── __root.tsx            # Layout global (Navbar + Outlet)
    │   ├── index.tsx             # / — Live
    │   ├── scores.tsx            # /scores
    │   ├── standings.tsx         # /standings
    │   ├── teams.tsx             # /teams
    │   └── settings.tsx          # /settings
    │
    ├── components/
    │   ├── Navbar.tsx            # Top navbar desktop
    │   ├── BottomNav.tsx         # Bottom nav mobile
    │   ├── MatchCard.tsx         # Carte match complète
    │   ├── Pitch.tsx             # Terrain SVG
    │   ├── StatusBadge.tsx       # Badge EN COURS / TERMINÉ / NS
    │   ├── GroupTable.tsx        # Tableau classement d'un groupe
    │   ├── TeamDrawer.tsx        # Panel latéral équipe + joueurs
    │   ├── TeamGrid.tsx          # Grille des 48 drapeaux
    │   └── SkeletonCard.tsx      # Skeleton loading
    │
    ├── hooks/
    │   ├── useMatches.ts         # Query /fixtures?date=today&league=1&season=2026
    │   ├── useAllMatches.ts      # Query tous les matchs du tournoi
    │   ├── useStandings.ts       # Query /standings?league=1&season=2026
    │   ├── useSquad.ts           # Query /players/squads?team={id}
    │   ├── useTeams.ts           # Query /teams?league=1&season=2026
    │   └── useSettings.ts        # Lecture/écriture localStorage
    │
    └── lib/
        ├── api.ts                # Fetch wrapper api-football (headers, base URL)
        ├── formatDate.ts         # Formatage date/heure selon fuseau Settings
        └── matchStatus.ts        # Normalisation statuts API → EN COURS / TERMINÉ / NS
```

---

## 6. Modèles de données clés

### Match (simplifié depuis api-football)
```ts
type Match = {
  fixture: {
    id: number
    date: string          // ISO 8601
    status: {
      short: 'NS' | '1H' | 'HT' | '2H' | 'ET' | 'P' | 'FT' | 'AET' | 'PEN'
      elapsed: number | null
    }
    venue: { name: string; city: string }
  }
  teams: {
    home: { id: number; name: string; logo: string }
    away: { id: number; name: string; logo: string }
  }
  goals: {
    home: number | null
    away: number | null
  }
  league: {
    round: string         // "Group Stage - 1", "Round of 32", etc.
    group: string | null  // "Group A", null si phase KO
  }
}
```

### Settings (localStorage)
```ts
type Settings = {
  timezone: string        // ex: "Europe/Paris"
  timeFormat: '24h' | '12h'
  language: 'fr' | 'en'
  theme: 'dark' | 'light'
}
```

---

## 7. Design system

| Token | Valeur |
|---|---|
| Background principal | `#0a0a0a` |
| Surface carte | `#141414` |
| Surface élevée | `#1e1e1e` |
| Accent vert (live, qualifié) | `#00d084` |
| Accent jaune (repêchage) | `#f5a623` |
| Accent bleu (à venir) | `#3b82f6` |
| Texte primaire | `#ffffff` |
| Texte secondaire | `#a0a0a0` |
| Terrain vert | `#1a6b3c` |
| Lignes terrain | `rgba(255,255,255,0.6)` |
| Font | Inter (Google Fonts) |
| Border radius carte | `12px` |

**Animation live** : badge `EN COURS` avec `@keyframes pulse` sur l'opacité (1 → 0.5 → 1, 1.5s infinite).

---

## 8. Variables d'environnement

```env
# .env
VITE_API_FOOTBALL_KEY=ta_clé_ici

# Optionnel : override base URL si proxy
VITE_API_BASE_URL=https://v3.football.api-sports.io
```

Obtenir une clé gratuite : https://dashboard.api-football.com/register (100 req/jour free tier).

---

## 9. Hors scope v1

- Notifications push
- Prédictions et paris
- Favoris synchronisés (cloud)
- Historique des éditions passées
- Authentification utilisateur
- Mode hors-ligne (PWA)
- Statistiques avancées (xG, heat maps)

---

## 10. Critères d'acceptation

| Critère | Condition de validation |
|---|---|
| Matchs live rafraîchis | Toutes les 30s sans reload, uniquement si match EN COURS |
| Score correct | Affiché pendant les 90min, prolongations et tirs au but |
| Classements exacts | Mis à jour après chaque match terminé |
| Effectifs chargés | Données visibles en < 2s après clic sur un drapeau |
| Fuseau horaire respecté | Toutes les heures affichées selon la préférence Settings |
| Responsive | Fonctionnel à partir de 375px de large |
| Pas de backend | Zéro serveur, clé API uniquement dans `.env` |
| Persistance settings | Préférences conservées après rechargement de page |
