import { useEffect, useMemo, useRef, useState } from "react";
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/lib/site-config";

type Message = { role: "bot" | "user"; text: string };

const QUICK_PROMPTS = [
  { key: "services", label: "Services" },
  { key: "timeline", label: "Timeline" },
  { key: "pricing", label: "Pricing" },
  { key: "process", label: "Process" },
  { key: "contact", label: "Contact" },
] as const;

const RESPONSES: Record<(typeof QUICK_PROMPTS)[number]["key"], string> = {
  services:
    "We deliver Web Development, Mobile Apps, SaaS Platforms, UI/UX Design, AI Integrations, and Cloud & DevOps — from discovery through launch, with motion and 3D where it elevates the product.",
  timeline:
    "Typical engagements run 3–10 weeks: a focused marketing site often ships in 3–5 weeks; product MVPs with integrations commonly need 6–10 weeks. You receive a written roadmap after the discovery call.",
  pricing:
    "We do not sell template packages. Every quote follows a free 20-minute discovery call, then a fixed line-itemed proposal within 24 hours — scope, design depth, engineering, and QA drive the number.",
  process:
    "Our flow is Discover → Design → Build → Launch. You get weekly walkthroughs, a staging link from week one, and clear approvals at each gate.",
  contact: `Email ${CONTACT_EMAIL}, WhatsApp ${WHATSAPP_NUMBER}, or use the contact form on this page. We reply within 24 hours.`,
};

function resolveAnswer(input: string): string {
  const q = input.toLowerCase().trim();
  if (!q) return "Ask about services, timeline, pricing, process, or how to reach us.";

  if (/(service|build|website|app|saas|design|ai|cloud|devops|offer)/.test(q))
    return RESPONSES.services;
  if (/(time|week|month|deliver|duration|how long|deadline)/.test(q))
    return RESPONSES.timeline;
  if (/(price|cost|budget|quote|fee|rupee|₹|pay)/.test(q)) return RESPONSES.pricing;
  if (/(process|step|workflow|discover|design phase)/.test(q)) return RESPONSES.process;
  if (/(contact|email|phone|whatsapp|call|reach|hyderabad)/.test(q))
    return RESPONSES.contact;
  if (/(hello|hi|hey|namaste)/.test(q))
    return "Hello — I'm the TecH BuilderZ assistant. Ask about services, timelines, pricing, or how to start a project.";
  if (/(thank|thanks)/.test(q))
    return "You're welcome. When you're ready, send a brief via the contact section or WhatsApp us directly.";

  return `Thanks for your message. For project-specific questions, email ${CONTACT_EMAIL} or WhatsApp us — a human on the team will respond within 24 hours.`;
}

export default function SiteChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hello — I'm the TecH BuilderZ assistant. Ask about services, timelines, pricing, or how to start a project.",
    },
  ]);

  const pushExchange = (userText: string, displayText?: string) => {
    const answer =
      RESPONSES[userText as keyof typeof RESPONSES] ?? resolveAnswer(userText);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: displayText ?? userText },
      { role: "bot", text: answer },
    ]);
  };

  useEffect(() => {
    if (!open) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, open]);

  const panelStyle = useMemo(
    () => ({
      background: "var(--bg-2)",
      border: "1px solid var(--line)",
      color: "var(--fg)",
    }),
    [],
  );

  return (
    <div className="fixed bottom-5 left-4 right-4 z-[250] flex flex-col items-end gap-3 sm:left-auto sm:right-6 pointer-events-none">
      {open && (
        <div
          className="w-full pointer-events-auto sm:w-[400px] md:w-[440px] p-5 md:p-6 flex flex-col gap-4 max-h-[min(520px,78vh)]"
          style={panelStyle}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  fontFamily: "var(--font-space), sans-serif",
                }}
              >
                Assistant
              </p>
              <p className="font-display mt-1" style={{ fontSize: 22, letterSpacing: "0.04em" }}>
                TECH BUILDERZ
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              data-hover
              style={{
                width: 36,
                height: 36,
                border: "1px solid var(--line)",
                background: "transparent",
                color: "var(--fg)",
                fontFamily: "var(--font-space), sans-serif",
              }}
            >
              ✕
            </button>
          </div>

          <div className="chat-scroll flex-1 min-h-[140px] max-h-[min(280px,42vh)] overflow-y-auto overflow-x-hidden space-y-2 pr-2 -mr-1">
            {messages.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                style={{
                  padding: "0.65rem 0.85rem",
                  fontSize: 13,
                  lineHeight: 1.55,
                  fontFamily: "var(--font-space), sans-serif",
                  background:
                    m.role === "bot" ? "rgba(245,241,234,0.06)" : "var(--accent)",
                  color: m.role === "bot" ? "var(--fg)" : "var(--bg)",
                  border:
                    m.role === "bot" ? "1px solid var(--line)" : "1px solid var(--accent)",
                }}
              >
                {m.text}
              </div>
            ))}
            <div ref={messagesEndRef} aria-hidden />
          </div>

          <div className="flex flex-wrap gap-2">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p.key}
                type="button"
                data-hover
                onClick={() => pushExchange(p.key, p.label)}
                style={{
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  padding: "0.45rem 0.65rem",
                  border: "1px solid var(--line)",
                  background: "transparent",
                  color: "var(--fg-muted)",
                  fontFamily: "var(--font-space), sans-serif",
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const raw = input.trim();
              if (!raw) return;
              pushExchange(raw);
              setInput("");
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a question…"
              className="flex-1 bg-transparent outline-none"
              style={{
                borderBottom: "1px solid var(--line)",
                padding: "0.6rem 0",
                fontSize: 14,
                color: "var(--fg)",
                fontFamily: "var(--font-space), sans-serif",
              }}
            />
            <button type="submit" data-hover className="btn-brut" style={{ padding: "0.7rem 1rem", fontSize: 11 }}>
              Send
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        data-hover
        onClick={() => setOpen((v) => !v)}
        className="btn-brut pointer-events-auto"
        style={{ padding: "1rem 1.4rem", fontSize: 12 }}
      >
        {open ? "Close" : "Chat"} →
      </button>
    </div>
  );
}
