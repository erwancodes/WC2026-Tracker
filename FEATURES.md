# Idées de features

Pistes d'évolution pour WC26 Tracker, classées par thème. Rien n'est figé — c'est un carnet d'idées.

## Suivi & live

- **Notifications de but** — alerte navigateur (Web Push) quand une équipe suivie marque ou quand un match commence.
- **Équipes favorites** — épingler des nations (étoile) pour les remonter en haut des listes ; stockées en local.
- **Timeline du match** — buts, cartons et remplacements minute par minute dans une carte de match dépliable.
- **Compositions** — le 11 de départ de chaque équipe sur le terrain, dès qu'il est annoncé.
- **Indicateur « match serré »** — mise en avant visuelle des matchs à fort enjeu (égalité, fin de match, qualification en jeu).

## Données & visualisation

- **Parcours de qualification** — arbre interactif de la phase à élimination directe (bracket) qui se remplit au fil du tournoi.
- **Simulateur de groupe** — « et si ce match finissait 2-1 ? » : recalcul du classement en direct selon des résultats hypothétiques.
- **Scénarios de qualification** — pour chaque équipe, ce qu'il lui faut pour passer (« gagne et tu es qualifié »).
- **Statistiques d'équipe** — possession, tirs, forme sur les 5 derniers matchs, sous forme de mini-graphiques.
- **Comparateur d'équipes** — deux nations côte à côte (effectif, stats, classement).
- **Tête-à-tête (H2H)** — historique des confrontations entre deux équipes.

## Personnalisation

- **Mon calendrier** — sélection de matchs ajoutables à Google Agenda / iCal (fichier `.ics`).
- **Page équipe dédiée** — une vraie page par nation (au-delà du drawer) avec URL partageable.
- **Thèmes de couleur** — accent personnalisable, mode contraste élevé pour l'accessibilité.
- **Widget « prochain match »** — un bloc à intégrer ailleurs (iframe) pour une équipe donnée.

## Social & partage

- **Carte de score partageable** — image générée d'un résultat, prête à poster (story / X).
- **Pronostics entre amis** — mini-jeu de prédiction de scores, classement entre amis (sans backend : code de partage).
- **Lien profond** — partager un match précis qui ouvre directement sa carte.

## Engagement & contenu

- **Compte à rebours d'ouverture** — sur la landing, avant le coup d'envoi du tournoi.
- **Le saviez-vous** — anecdotes et records de la Coupe du Monde au chargement.
- **Résumé quotidien** — récap automatique de la journée : résultats, surprises, prochains chocs.
- **Joueur à suivre** — mise en avant de buteurs et passeurs marquants.

## Technique & qualité

- **PWA / mode hors-ligne** — installation sur mobile, dernier état consultable sans réseau.
- **Pré-rendu des pages (SSG)** — HTML statique par route pour un SEO/partage optimal.
- **Internationalisation étendue** — ajout de l'espagnol (pays hôte Mexique) et du portugais.
- **Cache intelligent** — réduire les appels API, fond de carte persistant entre sessions.
- **Tests end-to-end** — parcours critiques (live, classements, drawer) automatisés.
- **Image Open Graph dynamique** — visuel de partage généré par match (PNG).

## Accessibilité

- **Navigation clavier complète** — drawer, filtres et onglets pilotables sans souris.
- **Lecteur d'écran** — annonces ARIA des scores en direct (`aria-live`).
- **Réduction des animations** — respect de `prefers-reduced-motion`.
