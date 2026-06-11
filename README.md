# WC26 Tracker

**Le suivi en direct de la Coupe du Monde 2026 — sans compte, sans pub, dans votre fuseau horaire.**

La première Coupe du Monde à 48 équipes se joue du 11 juin au 19 juillet 2026 aux États-Unis, au Mexique et au Canada. WC26 Tracker rassemble tout ce qu'il faut pour la suivre, sur un seul écran, depuis n'importe quel appareil.

> Site : **https://wc26.erwanx.com**

---

## Ce que vous pouvez faire

- **Suivre les matchs en direct** — le match du moment s'affiche en grand sur un terrain, avec le score et la minute mis à jour automatiquement. Prolongations et tirs au but compris.
- **Consulter tous les scores** — les 104 matchs du tournoi, regroupés par phase et par journée, filtrables par groupe, par statut (en cours / terminé / à venir) ou par équipe.
- **Voir les classements** — les 12 groupes en un coup d'œil, avec les qualifiés et les meilleurs troisièmes mis en évidence.
- **Explorer les 48 équipes** — l'effectif de chaque nation (joueurs, numéros, postes, clubs) accessible d'un simple clic sur le drapeau.
- **Régler à votre goût** — fuseau horaire (les 4 fuseaux des pays hôtes + le vôtre), format d'heure (24 h / AM-PM), langue (français / anglais) et thème (clair / sombre). Tout est mémorisé sur votre appareil.

Une barre permanente affiche en plus, sur chaque écran, le match en cours ou le prochain à venir avec son compte à rebours.

---

## Quelques détails

- **Aucun compte, aucune installation.** L'application fonctionne entièrement dans le navigateur.
- **Aucun cookie de suivi.** Vos préférences restent sur votre appareil et ne sont jamais envoyées ailleurs.
- **Données en temps réel** fournies par [TheSportsDB](https://www.thesportsdb.com), drapeaux par [flagcdn.com](https://flagcdn.com).

---

## Lancer le projet en local

Pour les curieux qui veulent bricoler le code :

```bash
npm install
npm run dev
```

Puis ouvrez l'adresse affichée dans le terminal (par défaut `http://localhost:5173`).

L'application utilise une clé de test publique qui fonctionne immédiatement. Pour de meilleures limites, créez une clé gratuite sur [TheSportsDB](https://www.thesportsdb.com/free_sports_api) et placez-la dans un fichier `.env` :

```
VITE_THESPORTSDB_KEY=votre_clé
```

Construite avec Vite, React, TanStack Router & Query, et Tailwind CSS.

---

WC26 Tracker est un projet de fan **indépendant**, sans aucun lien avec la FIFA ni les fédérations.

Réalisé par [erwanx.com](https://erwanx.com).
