export function Nav() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-8 py-5">
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 40 40" className="h-9 w-9">
          <defs>
            <linearGradient id="lg" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--neon-blue)" />
              <stop offset="100%" stopColor="var(--neon-violet)" />
            </linearGradient>
          </defs>
          <circle cx="20" cy="20" r="16" fill="none" stroke="url(#lg)" strokeWidth="2">
            <animate attributeName="r" values="14;17;14" dur="3s" repeatCount="indefinite" />
          </circle>
          <path d="M12 26 L20 12 L28 26" fill="none" stroke="url(#lg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="20" cy="20" r="2" fill="var(--neon-cyan)">
            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
        <span className="text-lg font-semibold tracking-tight">TecH <span className="text-gradient">BuilderZ</span></span>
      </div>
      <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
        {["Work", "About", "Contact"].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} className="relative transition-colors hover:text-foreground">
            {l}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-primary transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>
      <button className="shimmer glass rounded-full px-5 py-2 text-sm font-medium">
        Start Project
      </button>
    </nav>
  );
}
