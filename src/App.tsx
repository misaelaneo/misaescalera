import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
  type TouchEvent as ReactTouchEvent,
} from 'react';
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

/** Viewport query for the stacked (portrait / narrow / mobile) layout. Must
 *  stay in sync with the matching @media rule in globals.css. */
const STACK_MQ = '(max-width: 900px), (max-aspect-ratio: 1/1)';

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

/** Bio copy, hand-written onto the desk on first load. One entry per paragraph. */
const SUMMARY = [
  'Structural Engineer turned Product Lead.',
  'I build at the intersection of software, users, design, and a little bit of product magic.',
];

/** Words in SUMMARY rendered bold (matched ignoring case/punctuation). */
const EMPHASIS = new Set(['software', 'users', 'design']);

type MagicStar = {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  size: string;
  dur: string;
  delay: string;
  rot: string;
};

/** Hand-drawn sparkles scattered around "product magic". Positions are in `em`
 *  so they track the bio's font size; each twinkles slowly and out of sync.
 *  Kept to the left of and below the phrase — the −6° tilt rotates the right
 *  and top edges up into the line above, so those zones aren't safe. */
const MAGIC_STARS: MagicStar[] = [
  { top: '0.3em', left: '-0.95em', size: '0.52em', dur: '1.0s', delay: '0s', rot: '-8deg' },
  { bottom: '-0.7em', left: '4%', size: '0.4em', dur: '0.85s', delay: '0.4s', rot: '12deg' },
  { bottom: '-0.9em', left: '40%', size: '0.34em', dur: '1.05s', delay: '0.55s', rot: '-14deg' },
  { bottom: '-0.7em', right: '10%', size: '0.44em', dur: '0.9s', delay: '0.28s', rot: '7deg' },
  { bottom: '-0.2em', right: '-0.8em', size: '0.48em', dur: '0.95s', delay: '0.15s', rot: '5deg' },
];

/** Availability badge copy + LinkedIn destination. */
const BADGE_TEXT = 'Now looking to join a talented team!';
const LINKEDIN_URL = 'https://www.linkedin.com/in/misaelescalera/';

/** Multipoint "seal" star used to clip the holographic availability badge.
 *  A ring of shallow points (outer 50% / inner 43% of the box) → a circle
 *  edged with little spikes. Built once as a CSS polygon() string. */
const BADGE_STAR_POINTS = 14;
const BADGE_STAR_CLIP = (() => {
  const pts: string[] = [];
  for (let i = 0; i < BADGE_STAR_POINTS * 2; i += 1) {
    const r = i % 2 === 0 ? 50 : 43;
    const a = (Math.PI / BADGE_STAR_POINTS) * i - Math.PI / 2;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)}% ${(50 + r * Math.sin(a)).toFixed(2)}%`);
  }
  return `polygon(${pts.join(',')})`;
})();

/* Intro choreography (ms / s): portrait fades, then dock + nav, then the bio writes itself. */
const INTRO_WRITE_DELAY_S = 1.7; // bio writing starts
const INTRO_CHAR_S = 0.022; // per-character writing pace

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
        fontSize: `clamp(${Math.round(px * 0.52)}px, ${(px / 14).toFixed(2)}vw, ${Math.round(px)}px)`,
        color: '#161311',
        transform: offset ? `translateY(${((r1 - 0.5) * size * 0.22).toFixed(1)}px)` : 'none',
        textShadow: '0 0 1px rgba(28,26,23,.35)',
      },
    };
  });
}

type SumWordData = {
  word: string;
  delays: number[];
  bold: boolean;
  magic: boolean;
};

/** One bio word: a leading space (when not first) plus its per-character
 *  "pen stroke" spans. `bold` words get the emphasis class. */
function SumWord({ data, space }: { data: SumWordData; space: boolean }) {
  return (
    <span>
      {space && ' '}
      <span className={`sum-word${data.bold ? ' sum-em' : ''}`}>
        {data.word.split('').map((c, k) => (
          <span
            key={k}
            className="sum-ch"
            style={{ animationDelay: `${data.delays[k].toFixed(3)}s` }}
          >
            {c}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function App() {
  const [page, setPage] = useState<PageKey | null>(null);
  const [hover, setHover] = useState<HoverKey | null>(null);
  // Touch devices have no hover, so a tap on a dock icon drives the blue hint
  // label instead. Kept separate from `hover` so it doesn't swap the hero pose.
  const [tapped, setTapped] = useState<HoverKey | null>(null);

  // First-load intro: portrait → dock/nav → hand-written bio → sparkles. Once
  // it has played, the flag flips so returning from a page renders everything
  // static. (The timer is armed below, once `starsDelay` is known.)
  const [introPlayed, setIntroPlayed] = useState(false);

  // ── Mobile "slide deck" ───────────────────────────────────────────────
  // Below the stacked breakpoint the home doesn't scroll; it's two
  // crossfading slides (0 = profile, 1 = nav menu) driven by wheel / swipe.
  const [isStacked, setIsStacked] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(STACK_MQ).matches,
  );
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia(STACK_MQ);
    const on = () => setIsStacked(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  // Always land on the profile slide when entering the stacked view or coming
  // back from a blog page.
  useEffect(() => {
    if (!isStacked || page) setSlide(0);
  }, [isStacked, page]);

  // Wheel / swipe flip the slide (a short lock debounces trackpad momentum).
  const wheelLock = useRef(false);
  const onScreenWheel = (e: ReactWheelEvent<HTMLDivElement>) => {
    if (!isStacked || page || Math.abs(e.deltaY) < 16 || wheelLock.current) return;
    wheelLock.current = true;
    window.setTimeout(() => (wheelLock.current = false), 700);
    setSlide(e.deltaY > 0 ? 1 : 0);
  };
  const touchY = useRef(0);
  const onScreenTouchStart = (e: ReactTouchEvent<HTMLDivElement>) => {
    touchY.current = e.touches[0].clientY;
  };
  const onScreenTouchEnd = (e: ReactTouchEvent<HTMLDivElement>) => {
    if (!isStacked || page) return;
    const dy = e.changedTouches[0].clientY - touchY.current;
    if (Math.abs(dy) < 40) return;
    setSlide(dy < 0 ? 1 : 0); // swipe up → menu, swipe down → profile
  };

  const enter = (key: HoverKey) => {
    setHover(key);
  };
  const leave = () => setHover(null);

  // Holographic availability badge: the cursor drives the foil's glare and a
  // subtle 3D tilt via CSS vars (no re-render); on leave it eases back flat.
  const badgeRef = useRef<HTMLAnchorElement>(null);
  const onBadgeMove = (e: ReactPointerEvent<HTMLAnchorElement>) => {
    const el = badgeRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--px', `${(px * 100).toFixed(1)}%`);
    el.style.setProperty('--py', `${(py * 100).toFixed(1)}%`);
    el.style.setProperty('--rx', `${((0.5 - py) * 64).toFixed(1)}deg`);
    el.style.setProperty('--ry', `${((px - 0.5) * 64).toFixed(1)}deg`);
    el.style.setProperty('--on', '1');
  };
  const onBadgeLeave = () => {
    const el = badgeRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--on', '0');
  };

  // The blue contact hint sits just below the portrait's bottom-right corner,
  // over the light paper where its multiply "ink" blend reads well. On short
  // screens (e.g. 1080p) the shrunken portrait's corner lands near the centred
  // dock, so we keep the hint at that same (over-paper) height and instead
  // shift it right into the paper margin just enough to clear the dock — never
  // up into the dark portrait, where multiply would hide it.
  const hintRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const [hintPos, setHintPos] = useState({ right: 0, bottom: 0 });

  useLayoutEffect(() => {
    const compute = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const fit = Math.min(W / PORTRAIT_W, H / PORTRAIT_H);
      const dispW = PORTRAIT_W * fit * PAPER.scale;
      const dispH = PORTRAIT_H * fit * PAPER.scale;

      // Natural spot: pinned to the photo's bottom-right corner, sitting just
      // below the photo so it's over paper.
      const naturalRight = (W - dispW) / 2 - 8;
      const bottom = (H - dispH) / 2 - 58;

      // Don't let the hint's left edge cross into the centred dock. Measure the
      // dock and the hint's actual width (varies per label) for an exact floor.
      const hintW = hintRef.current?.offsetWidth ?? 0;
      const dockW = dockRef.current?.offsetWidth ?? 0;
      const dockRightFromEdge = (W - dockW) / 2; // dock's right edge → viewport right
      const gap = 20;
      // Largest `right` (px from viewport right) that still keeps
      // hint.left ≥ dock.right + gap.
      const maxRight = dockRightFromEdge - gap - hintW;
      const right = Math.min(naturalRight, maxRight);

      setHintPos({ right, bottom });
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [hover]);

  const nameRow1 = useMemo(() => ink('(MISA)', 92, 3.7, ''), []);
  const nameRow2 = useMemo(() => ink('Escalera', 32, 8.2, 'Eea'), []);

  // Bio split into paragraphs → words → characters, each with a staggered
  // "pen stroke" delay. The clock runs continuously across paragraphs; spaces
  // (and the gap between paragraphs) advance it too, reading as the pen lifting.
  // Words are tagged: `bold` for emphasis, `magic` for the "product magic"
  // phrase we sprinkle twinkling stars around.
  const summaryParas = useMemo(() => {
    const base = (w: string) => w.replace(/[^a-zA-Z]/g, '').toLowerCase();
    let i = 0;
    return SUMMARY.map((para) => {
      const words = para.split(' ').map((word) => {
        const delays = word
          .split('')
          .map((_, k) => INTRO_WRITE_DELAY_S + (i + k) * INTRO_CHAR_S);
        i += word.length + 1; // +1: the space advances the pen too
        return { word, delays, bold: EMPHASIS.has(base(word)), magic: false };
      });
      // Tag the trailing "product magic" phrase (only where it actually ends a
      // paragraph, so "Product Lead." in the intro line isn't matched).
      const n = words.length;
      if (n >= 2 && base(words[n - 2].word) === 'product' && base(words[n - 1].word) === 'magic') {
        words[n - 2].magic = true;
        words[n - 1].magic = true;
      }
      return words;
    });
  }, []);

  // When the stars should fade in on first load: just after the final glyph of
  // "magic" has been written.
  const starsDelay = useMemo(() => {
    const lastPara = summaryParas[summaryParas.length - 1];
    const lastWord = lastPara[lastPara.length - 1];
    return lastWord.delays[lastWord.delays.length - 1] + 0.4;
  }, [summaryParas]);

  // The badge is the final beat of the intro: it fades in only once the bio and
  // its sparkles have finished (sparkles fade over 0.6s from `starsDelay`).
  const badgeDelay = starsDelay + 0.6 + 0.3;

  // Hold the intro state until the last thing (the badge's 0.6s fade) has
  // finished, so `.intro` gating outlives every intro animation.
  useEffect(() => {
    const total = (badgeDelay + 0.6 + 0.1) * 1000;
    const t = setTimeout(() => setIntroPlayed(true), total);
    return () => clearTimeout(t);
  }, [badgeDelay]);

  const p = page ? PAGES[page] : null;
  // The hero pose only swaps on desktop hover; on mobile it stays the default.
  const photoSrc = !isStacked && hover ? PHOTOS[hover] : '/assets/misa.png';
  // The blue hint reads hover on desktop, the last-tapped icon on mobile.
  const hintKey = isStacked ? tapped : hover;

  return (
    <div
      className={`screen slide-${slide}`}
      onWheel={onScreenWheel}
      onTouchStart={onScreenTouchStart}
      onTouchEnd={onScreenTouchEnd}
    >
      {/* Procedural paper background */}
      <div className="paper-bg">
        <PaperTexture
          {...PAPER}
          colorBack="#ffffff"
          colorFront={PAPER_COLOR}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      {/* Full-screen portrait (wide layout only); swaps on hover, fades on a page.
          In the stacked layout the portrait moves into the profile slide below. */}
      {!isStacked && (
        <div
          className={`portrait${introPlayed ? '' : ' portrait-intro'}`}
          style={{
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
      )}

      {/* Grainy-ink displacement filter applied to the name + summary */}
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

      {!page && (
        <div className={`home${introPlayed ? '' : ' intro'}`}>
          {/* ── Slide 1: name · portrait · summary ─────────────────────────
              On wide screens .stage is display:contents, so these keep their
              absolute desk positions; in the stacked layout the stage becomes a
              crossfading full-viewport slide. */}
          <div className="stage stage-profile">
            <div className="name">
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

            {/* Portrait hero + its bottom-right greeting. .hero-wrap is a
                display:contents passthrough on wide screens (the hint keeps its
                JS desk position); in the stacked slide it's a relative frame
                sized to the photo, so the hint pins to the photo's corner. */}
            <div className="hero-wrap">
              {/* Sized to the photo's aspect (below); scale bumped from the
                  shared 0.72 so the photo fills the frame (Instagram-style). */}
              {isStacked && (
                <div className={`portrait-hero${introPlayed ? '' : ' portrait-intro'}`}>
                  <PaperTexture
                    {...PAPER}
                    scale={0.98}
                    image={photoSrc}
                    colorBack="#ffffff"
                    colorFront={PAPER_COLOR}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              )}

              {/* Blue greeting / contact label. Pinned to the photo's
                  bottom-right (mobile) or JS-positioned near the portrait
                  (desktop). Text follows hover (desktop) or last-tapped icon. */}
              <div
                ref={hintRef}
                className="contact-hint is-on"
                style={isStacked ? undefined : { right: hintPos.right, bottom: hintPos.bottom }}
                aria-hidden
              >
                {hintKey ? HOLO_LABELS[hintKey] : 'HI :)'}
              </div>
            </div>

            {/* Hand-written summary. */}
            <div className="summary">
            {summaryParas.map((words, pi) => {
              const magicStart = words.findIndex((w) => w.magic);
              const lead = magicStart === -1 ? words : words.slice(0, magicStart);
              const magic = magicStart === -1 ? [] : words.slice(magicStart);
              return (
                <p className="sum-para" key={pi}>
                  {lead.map((w, wi) => (
                    <SumWord key={wi} data={w} space={wi > 0} />
                  ))}
                  {magic.length > 0 && (
                    <>
                      {' '}
                      <span className="magic">
                        {magic.map((w, wi) => (
                          <SumWord key={wi} data={w} space={wi > 0} />
                        ))}
                        <span
                          className="magic-stars"
                          style={{ '--stars-delay': `${starsDelay.toFixed(2)}s` } as CSSProperties}
                          aria-hidden
                        >
                          {MAGIC_STARS.map((s, si) => (
                            <span
                              key={si}
                              className="star"
                              style={{
                                top: s.top,
                                left: s.left,
                                right: s.right,
                                bottom: s.bottom,
                                width: s.size,
                                height: s.size,
                                animationDuration: s.dur,
                                animationDelay: s.delay,
                                ['--rot' as string]: s.rot,
                              } as CSSProperties}
                            >
                              <svg viewBox="0 0 24 24" width="100%" height="100%">
                                <path
                                  d="M12 0.5C12.9 7 12.2 8.1 23.5 12C12.4 15.7 13 16.9 12 23.5C11 17 11.7 15.8 0.5 12C11.6 8.2 11.1 7 12 0.5Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          ))}
                        </span>
                      </span>
                    </>
                  )}
                </p>
              );
            })}
            </div>
          </div>

          {/* ── Slide 2: the navigation menu ─────────────────────────────── */}
          <div className="stage stage-menu">
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
          </div>

          <div className="dock" ref={dockRef}>
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
              onClick={() => setTapped('linkedin')}
              onMouseEnter={() => enter('linkedin')}
              onMouseLeave={leave}
            >
              <span className="in-badge">in</span>
            </a>
            <a
              href="tel:+13526424703"
              className="dock-link"
              title="(352) 642-4703"
              onClick={() => setTapped('phone')}
              onMouseEnter={() => enter('phone')}
              onMouseLeave={leave}
            >
              <PhoneIcon />
            </a>
            <a
              href="mailto:misaelaneo@gmail.com"
              className="dock-link"
              title="misaelaneo@gmail.com"
              onClick={() => setTapped('email')}
              onMouseEnter={() => enter('email')}
              onMouseLeave={leave}
            >
              <MailIcon />
            </a>
          </div>

          {/* Holographic "open to work" badge → LinkedIn (new tab). */}
          <a
            ref={badgeRef}
            className="badge"
            style={
              {
                ['--star' as string]: BADGE_STAR_CLIP,
                ['--badge-delay' as string]: `${badgeDelay.toFixed(2)}s`,
              } as CSSProperties
            }
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            aria-label={`${BADGE_TEXT} Opens LinkedIn.`}
            onPointerMove={onBadgeMove}
            onPointerLeave={onBadgeLeave}
          >
            <span className="badge-inner">
              <span className="badge-foil" aria-hidden />
              <span className="badge-glare" aria-hidden />
              <span className="badge-text">{BADGE_TEXT}</span>
            </span>
          </a>

          {/* Swipe / wheel hint for the two-slide stacked view (mobile only). */}
          <div className="slide-hint" aria-hidden>
            <span className="slide-hint-chev">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path
                  d="M6 15l6-6 6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="slide-hint-label">{slide === 0 ? 'menu' : 'profile'}</span>
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
            <a
              href="https://docs.google.com/document/d/1X7S3SYq6Kx-deva0lSc41CSdRhlYmHB9kca7n2BzM14/edit?usp=sharing"
              className="resume-btn"
              target="_blank"
              rel="noreferrer"
            >
              <DownloadIcon />
              download résumé (google doc)
            </a>
          )}
        </div>
      )}
    </div>
  );
}
