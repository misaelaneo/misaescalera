import { useEffect, useMemo, useState, type CSSProperties } from 'react';
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

/** Portrait shown on the desk. Hovering a dock icon swaps to a matching pose. */
type HoverKey = 'resume' | 'linkedin' | 'phone' | 'email';

const PHOTOS: Record<HoverKey, string> = {
  resume: '/assets/photo-resume.png',
  linkedin: '/assets/photo-linkedin.png',
  phone: '/assets/photo-phone.png',
  email: '/assets/photo-email.png',
};

// Word revealed in the hover label for each contact icon.
const HOLO_LABELS: Record<HoverKey, string> = {
  resume: 'ABOUT ME',
  linkedin: 'LINKEDIN',
  phone: 'CALL ME',
  email: 'EMAIL ME',
};

// Intrinsic size of the portrait (misa.png). Used to reproduce the paper
// shader's `fit: contain` + `scale` geometry so the contact hint can be pinned
// to the visible portrait's bottom-right corner.
const PORTRAIT_W = 1027;
const PORTRAIT_H = 1532;

type InkChar = { c: string; style: CSSProperties };

/**
 * Deterministic per-character "typewriter ink" jitter, ported from the design.
 * When `offsetChars` is null every glyph is jittered; otherwise only glyphs
 * present in that string are nudged, so a word can mix clean and hand-set letters.
 */
function ink(word: string, size: number, seed: number, offsetChars: string | null): InkChar[] {
  return word.split('').map((c, i) => {
    const r1 = Math.abs(Math.sin(i * 127.1 + seed) * 43758.5453) % 1;
    const r3 = Math.abs(Math.sin(i * 89.4 + seed * 2.3 + 5.1) * 15731.74) % 1;
    const offset = offsetChars == null ? true : offsetChars.includes(c);
    const px = size * (offset ? 0.92 + r3 * 0.2 : 1);
    return {
      c,
      style: {
        display: 'inline-block',
        fontFamily: "'Spectral SC','Space Mono',monospace",
        fontWeight: 500,
        lineHeight: 1,
        fontSize: `min(${Math.round(px)}px, ${(px / 14).toFixed(2)}vw)`,
        color: '#161311',
        transform: offset ? `translateY(${((r1 - 0.5) * size * 0.22).toFixed(1)}px)` : 'none',
        textShadow: '0 0 1px rgba(28,26,23,.35)',
      },
    };
  });
}

export default function App() {
  const [page, setPage] = useState<PageKey | null>(null);
  const [hover, setHover] = useState<HoverKey | null>(null);

  const enter = (key: HoverKey) => {
    setHover(key);
  };
  const leave = () => setHover(null);

  // Margins from the viewport edges to the visible portrait's edges, so the
  // holo card can sit at the photo's bottom-right corner at any screen size.
  const [photoInset, setPhotoInset] = useState({ right: 0, bottom: 0 });

  useEffect(() => {
    const compute = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const fit = Math.min(W / PORTRAIT_W, H / PORTRAIT_H);
      const dispW = PORTRAIT_W * fit * PAPER.scale;
      const dispH = PORTRAIT_H * fit * PAPER.scale;
      setPhotoInset({ right: (W - dispW) / 2, bottom: (H - dispH) / 2 });
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  const nameRow1 = useMemo(() => ink('(MISA)', 92, 3.7, ''), []);
  const nameRow2 = useMemo(() => ink('Escalera', 32, 8.2, 'Eea'), []);

  const p = page ? PAGES[page] : null;
  const photoSrc = hover ? PHOTOS[hover] : '/assets/misa.png';

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
      {/* Portrait rendered through the same paper texture; swaps on hover, fades out on a page */}
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
          image={photoSrc}
          colorBack="#ffffff"
          colorFront={PAPER_COLOR}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {!page && (
        <div className="home">
          {/* Grainy-ink displacement filter applied to the name */}
          <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
            <filter id="inkgrain" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.35"
                numOctaves="2"
                seed="7"
                result="noise"
              />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" result="disp" />
              <feColorMatrix
                in="noise"
                type="matrix"
                values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.5 0.5 0.5 0 -0.35"
                result="alphaNoise"
              />
              <feComposite in="disp" in2="alphaNoise" operator="out" />
            </filter>
          </svg>

          <div
            className="name"
            style={{
              transform: `rotate(${NAME_SLANT}deg)`,
              transformOrigin: 'left top',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex' }}>
                {nameRow1.map((ch, i) => (
                  <span key={i} style={ch.style}>
                    {ch.c}
                  </span>
                ))}
              </div>
              <div style={{ margin: '0 0 8px 4px' }}>
                <div style={{ display: 'flex' }}>
                  {nameRow2.map((ch, i) => (
                    <span key={i} style={ch.style}>
                      {ch.c}
                    </span>
                  ))}
                </div>
                <div className="tagline">product leader</div>
              </div>
            </div>
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
              onMouseEnter={() => enter('resume')}
              onMouseLeave={leave}
            >
              <ResumeIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/misaelescalera/"
              className="dock-link"
              title="LinkedIn"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => enter('linkedin')}
              onMouseLeave={leave}
            >
              <span className="in-badge">in</span>
            </a>
            <a
              href="tel:+13526424703"
              className="dock-link"
              title="(352) 642-4703"
              onMouseEnter={() => enter('phone')}
              onMouseLeave={leave}
            >
              <PhoneIcon />
            </a>
            <a
              href="mailto:misaelaneo@gmail.com"
              className="dock-link"
              title="misaelaneo@gmail.com"
              onMouseEnter={() => enter('email')}
              onMouseLeave={leave}
            >
              <MailIcon />
            </a>
          </div>

          <div
            className={`contact-hint${hover || true ? ' is-on' : ''}`}
            style={{ right: photoInset.right - 8, bottom: photoInset.bottom - 58 }}
            aria-hidden
          >
            {hover ? HOLO_LABELS[hover] : 'HI :)'}
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
