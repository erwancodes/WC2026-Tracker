import { Link } from '@tanstack/react-router'
import { ArrowLeft, SoccerBall } from '@phosphor-icons/react'
import { MarketingFooter } from '../components/Footer'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-zinc-200 py-8 first:border-t-0">
      <h2 className="text-sm font-bold uppercase tracking-wider text-[#0a8f59]">{title}</h2>
      <div className="mt-3 max-w-[68ch] space-y-3 text-sm leading-relaxed text-zinc-600">
        {children}
      </div>
    </section>
  )
}

export function LegalPage() {
  return (
    <div className="min-h-[100dvh] bg-[#f6f7f5] text-zinc-900">
      {/* Nav */}
      <header className="border-b border-zinc-200/70 bg-[#f6f7f5]/80 backdrop-blur-md">
        <nav className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-4 md:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-pitch">
              <SoccerBall size={18} weight="fill" className="text-white" />
            </span>
            <span className="font-bold tracking-tight">
              WC26<span className="text-[#0a8f59]"> Tracker</span>
            </span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-900"
          >
            <ArrowLeft size={15} weight="bold" />
            Accueil
          </Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 py-16 md:px-8 md:py-24">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a8f59]">
          Informations légales
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tighter md:text-5xl">
          Mentions légales
        </h1>
        <p className="mt-4 max-w-[60ch] text-base text-zinc-600">
          Dernière mise à jour : 11 juin 2026. WC26 Tracker est un projet indépendant, sans but
          lucratif, dédié au suivi de la Coupe du Monde 2026.
        </p>

        <div className="mt-12">
          <Section title="Éditeur du site">
            <p>
              WC26 Tracker est édité par Erwan, à titre personnel, joignable via le site{' '}
              <a
                href="https://erwanx.com"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#0a8f59] underline-offset-4 hover:underline"
              >
                erwanx.com
              </a>
              . Directeur de la publication : le propriétaire du site.
            </p>
          </Section>

          <Section title="Hébergement">
            <p>
              Le site est hébergé sur une infrastructure cloud statique. Aucune donnée
              personnelle n’est collectée ni stockée sur un serveur : l’application fonctionne
              entièrement dans votre navigateur.
            </p>
          </Section>

          <Section title="Données affichées">
            <p>
              Les scores, classements, calendriers et effectifs proviennent de l’API publique{' '}
              <a
                href="https://www.thesportsdb.com"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#0a8f59] underline-offset-4 hover:underline"
              >
                TheSportsDB
              </a>
              . Les drapeaux sont fournis par{' '}
              <a
                href="https://flagcdn.com"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#0a8f59] underline-offset-4 hover:underline"
              >
                flagcdn.com
              </a>
              . Ces données sont fournies à titre informatif et peuvent comporter des écarts ou
              des retards de mise à jour.
            </p>
          </Section>

          <Section title="Données personnelles & cookies">
            <p>
              WC26 Tracker ne requiert aucun compte et ne dépose aucun cookie de suivi. Vos
              préférences (fuseau horaire, langue, thème, format d’heure) sont enregistrées
              uniquement dans le stockage local de votre navigateur et ne quittent jamais votre
              appareil.
            </p>
          </Section>

          <Section title="Propriété intellectuelle">
            <p>
              Le nom, le code et le design de WC26 Tracker appartiennent à leur auteur. Les noms
              d’équipes, logos, drapeaux et marques cités restent la propriété de leurs détenteurs
              respectifs.
            </p>
          </Section>

          <Section title="Absence d’affiliation">
            <p>
              WC26 Tracker est un projet de fan indépendant. Il n’est ni affilié, ni sponsorisé,
              ni approuvé par la FIFA, ses partenaires, ou les fédérations nationales.
            </p>
          </Section>

          <Section title="Responsabilité">
            <p>
              Les informations sont fournies « en l’état », sans garantie d’exactitude ou de
              disponibilité. L’éditeur ne saurait être tenu responsable d’une décision prise sur
              la base des données affichées.
            </p>
          </Section>
        </div>
      </main>

      <MarketingFooter />
    </div>
  )
}
