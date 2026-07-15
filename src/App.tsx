import { useMemo, useState, type CSSProperties } from 'react';
import { PaperTexture } from '@paper-design/shaders-react';
import { MailIcon, PhoneIcon, ResumeIcon, DownloadIcon } from './components/icons';

/** Paper-shader settings, ported verbatim from the design's paper-shader.js */
const PAPER = {
  contrast: 0.15,
  roughness: 0.1,
  fiber: 0.13,
  fiberSize: 0.13,
  crumples: 0.3,
  crumpleSize: 0.51,
  folds: 0.15,
  foldCount: 2,
  drops: 0.2,
  fade: 0,
  seed: 209.8,
  scale: 0.72,
  fit: 'contain',
} as const;

const PAPER_COLOR = '#9fadbc';
const NAME_SLANT = -6; // degrees

type PageKey = 'experience' | 'strategy' | 'execution' | 'ai' | 'marketing';

const PAGES: Record<PageKey, { label: string; title: string; body: string }> = {
  experience: {
    label: 'Experience',
    title: 'Experience',
    body: 'The long version of the story — roles, teams, and the products that shipped along the way. This page is still in the typewriter; the résumé below is the best map for now.',
  },
  strategy: {
    label: 'Strategy',
    title: 'Strategy',
    body: 'Notes on picking the right problems: positioning, sequencing, and the discipline of the not-now list. First essay coming soon.',
  },
  execution: {
    label: 'Execution',
    title: 'Execution',
    body: 'How the work actually gets done — rituals, roadmaps, and keeping teams honest without keeping them slow. First essay coming soon.',
  },
  ai: {
    label: 'Thoughts on AI',
    title: 'Thoughts on AI',
    body: 'Working notes on building with (and around) AI — what changes, what doesn’t, and what product leaders should do about it. First essay coming soon.',
  },
  marketing: {
    label: 'Marketing & Branding',
    title: 'Marketing & Branding',
    body: 'Where product meets story — naming, launches, and making things people remember. First essay coming soon.',
  },
};

const PAGE_ORDER: PageKey[] = ['experience', 'strategy', 'execution', 'ai', 'marketing'];

type InkChar = { c: string; style: CSSProperties };

/** Deterministic per-character "typewriter ink" jitter, ported from the design. */
function ink(word: string, size: number, seed: number): InkChar[] {
  return word.split('').map((c, i) => {
    const r1 = Math.abs(Math.sin(i * 127.1 + seed) * 43758.5453) % 1;
    const r2 = Math.abs(Math.sin(i * 269.5 + seed * 1.7 + 13.3) * 24634.63) % 1;
    const r3 = Math.abs(Math.sin(i * 89.4 + seed * 2.3 + 5.1) * 15731.74) % 1;
    const px = size * (0.92 + r3 * 0.2);
    return {
      c,
      style: {
        display: 'inline-block',
        fontFamily: "'Remingtoned','Space Mono',monospace",
        fontWeight: 400,
        lineHeight: 1,
        fontSize: `min(${Math.round(px)}px, ${(px / 14).toFixed(2)}vw)`,
        color: '#1c1a17',
        transform: `translateY(${((r1 - 0.5) * size * 0.22).toFixed(1)}px) rotate(${(
          (r2 - 0.5) *
          8
        ).toFixed(1)}deg)`,
        textShadow: '0 0 1px rgba(28,26,23,.35)',
      },
    };
  });
}

export default function App() {
  const [page, setPage] = useState<PageKey | null>(null);

  const nameRow1 = useMemo(() => ink('Misa', 46, 3.7), []);
  const nameRow2 = useMemo(() => ink('Escalera', 76, 8.2), []);

  const p = page ? PAGES[page] : null;

  return (
    <div className="screen">
      {/* Procedural paper background */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <PaperTexture
          {...PAPER}
          colorBack="#ffffff"
          colorFront={PAPER_COLOR}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      {/* Portrait rendered through the same paper texture, fades out on a page */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: page ? 0 : 1,
          transition: 'opacity .55s ease',
          pointerEvents: 'none',
        }}
      >
        <PaperTexture
          {...PAPER}
          image="/assets/misa.png"
          colorBack="#ffffff"
          colorFront={PAPER_COLOR}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {!page && (
        <div className="home">
          <div
            className="name"
            style={{
              transform: `rotate(${NAME_SLANT}deg)`,
              transformOrigin: 'left top',
            }}
          >
            <div style={{ display: 'flex' }}>
              {nameRow1.map((ch, i) => (
                <span key={i} style={ch.style}>
                  {ch.c}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', margin: '-6px 0 0 26px' }}>
              {nameRow2.map((ch, i) => (
                <span key={i} style={ch.style}>
                  {ch.c}
                </span>
              ))}
            </div>
            <div className="tagline">product leader</div>
          </div>

          <nav className="nav">
            {PAGE_ORDER.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                className="nav-item"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(key);
                }}
              >
                <span className="nav-bullet">&#8226;</span>
                {PAGES[key].label}
              </a>
            ))}
          </nav>

          <div className="dock">
            <a
              href="#experience"
              className="dock-link"
              title="Résumé"
              onClick={(e) => {
                e.preventDefault();
                setPage('experience');
              }}
            >
              <ResumeIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/misaelescalera/"
              className="dock-link"
              title="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <span className="in-badge">in</span>
            </a>
            <a href="tel:+13526424703" className="dock-link" title="(352) 642-4703">
              <PhoneIcon />
            </a>
            <a href="mailto:misaelaneo@gmail.com" className="dock-link" title="misaelaneo@gmail.com">
              <MailIcon />
            </a>
          </div>
        </div>
      )}

      {p && (
        <div className="page" key={page}>
          <a
            href="#home"
            className="back-link"
            onClick={(e) => {
              e.preventDefault();
              setPage(null);
            }}
          >
            &#8592; back to the desk
          </a>
          <div className="page-title">{p.title}</div>
          <div className="page-body">{p.body}</div>
          {page === 'experience' && (
            <a href="#resume-doc" className="resume-btn">
              <DownloadIcon />
              download résumé (google doc)
            </a>
          )}
        </div>
      )}
    </div>
  );
}
