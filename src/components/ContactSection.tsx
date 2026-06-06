
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";
import { SceneEnvironment, ThreeCanvas } from "@/components/ThreeCanvas";

import {
  CONTACT_EMAIL,
  WEB3FORMS_ACCESS_KEY,
  WHATSAPP_LINK,
} from "@/lib/site-config";

const DESTINATION_EMAIL = CONTACT_EMAIL;

function MiniBlob() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.2;
    ref.current.rotation.y += delta * 0.25;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.0, 1]} />
        <MeshDistortMaterial
          color="#2e2e2e"
          metalness={0.95}
          roughness={0.12}
          envMapIntensity={2.2}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

type FieldKey = "name" | "email" | "biz" | "service" | "msg";
type Status = "idle" | "sending" | "sent" | "error";

const servicesList = [
  "Web Development",
  "Mobile Apps",
  "SaaS Platforms",
  "UI/UX Design",
  "AI Integrations",
  "Cloud & DevOps",
  "Not sure yet",
];

function Field({
  label,
  k,
  value,
  onChange,
  type = "text",
  invalid,
  disabled,
}: {
  label: string;
  k: FieldKey;
  value: string;
  onChange: (k: FieldKey, v: string) => void;
  type?: "text" | "email";
  invalid?: boolean;
  disabled?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const borderColor = invalid
    ? "#ff5b1a"
    : focused
    ? "var(--accent)"
    : "var(--line)";
  return (
    <div className="flex flex-col gap-2 py-5">
      <label
        style={{
          fontFamily: "var(--font-space), sans-serif",
          fontSize: 11,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: invalid
            ? "#ff5b1a"
            : focused
            ? "var(--accent)"
            : "var(--fg-muted)",
          transition: "color 0.3s",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(k, e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="bg-transparent outline-none text-[var(--fg)] py-2 disabled:opacity-50"
        style={{
          fontFamily: "var(--font-space), sans-serif",
          fontSize: 16,
          borderBottom: `1px solid ${borderColor}`,
          transition: "border-color 0.3s",
        }}
      />
    </div>
  );
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function ContactSection() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    biz: "",
    service: "",
    msg: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [touched, setTouched] = useState<Record<FieldKey, boolean>>({
    name: false,
    email: false,
    biz: false,
    service: false,
    msg: false,
  });
  const [focusedSelect, setFocusedSelect] = useState(false);
  const [focusedMsg, setFocusedMsg] = useState(false);

  const onChange = (k: FieldKey, v: string) => {
    setValues((p) => ({ ...p, [k]: v }));
    if (status === "error") setStatus("idle");
  };

  const validate = () => {
    const errors: FieldKey[] = [];
    if (!values.name.trim()) errors.push("name");
    if (!isEmail(values.email)) errors.push("email");
    if (!values.msg.trim()) errors.push("msg");
    setTouched({
      name: true,
      email: true,
      biz: true,
      service: true,
      msg: true,
    });
    return errors;
  };

  const sendViaMailto = () => {
    const lines = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Business: ${values.biz || "—"}`,
      `Service: ${values.service || "—"}`,
      "",
      "Project details:",
      values.msg,
      "",
      "— Sent from techbuilderz.in contact form",
    ];
    const body = encodeURIComponent(lines.join("\n"));
    const subject = encodeURIComponent(
      `New brief from ${values.name} — TecH BuilderZ`
    );
    window.location.href = `mailto:${DESTINATION_EMAIL}?subject=${subject}&body=${body}`;
  };

  const submit = async () => {
    const errors = validate();
    if (errors.length > 0) {
      setStatus("error");
      setErrorMsg("Please complete your name, a valid email, and a message.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    // Configured for real backgrounded send via Web3Forms
    if (WEB3FORMS_ACCESS_KEY) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            from_name: values.name,
            subject: `New brief from ${values.name} — TecH BuilderZ`,
            name: values.name,
            email: values.email,
            business: values.biz || "—",
            service: values.service || "—",
            message: values.msg,
            // optional honeypot field
            botcheck: "",
          }),
        });
        const data = await res.json();
        if (data.success) {
          setStatus("sent");
          return;
        }
        throw new Error(data.message || "Submission failed");
      } catch (err) {
        // Fall through to mailto fallback on error
        console.warn("Web3Forms failed, falling back to mailto:", err);
      }
    }

    // Fallback: open the user's email client with the brief pre-filled
    sendViaMailto();
    setStatus("sent");
  };

  const reset = () => {
    setValues({ name: "", email: "", biz: "", service: "", msg: "" });
    setTouched({
      name: false,
      email: false,
      biz: false,
      service: false,
      msg: false,
    });
    setStatus("idle");
    setErrorMsg("");
  };

  const invalid = (k: FieldKey) => {
    if (!touched[k]) return false;
    if (k === "name") return !values.name.trim();
    if (k === "email") return !isEmail(values.email);
    if (k === "msg") return !values.msg.trim();
    return false;
  };

  const sending = status === "sending";
  const sent = status === "sent";

  return (
    <section
      id="contact"
      className="relative w-full px-6 md:px-12 py-32 md:py-40"
      style={{ background: "var(--bg)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-start">
        {/* Left — Pitch + 3D + contact info */}
        <div className="flex flex-col">
          <p
            style={{
              fontFamily: "var(--font-space), sans-serif",
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            07 / Contact
          </p>
          <h2
            className="font-display text-[var(--fg)] mt-5"
            style={{
              fontSize: "clamp(56px, 8vw, 140px)",
              lineHeight: 0.88,
            }}
          >
            Crafting <br />
            <span className="font-editorial italic">tomorrow,</span>
            <br />
            together.
          </h2>

          <p
            className="mt-8 max-w-md"
            style={{
              fontSize: 15,
              color: "var(--fg-muted)",
              lineHeight: 1.7,
            }}
          >
            Tell us about your business in one paragraph. We reply within 24
            hours with thoughts and a free 20-minute consult.
          </p>

          {/* Contact info block */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "var(--fg-muted)",
                  fontFamily: "var(--font-space), sans-serif",
                }}
              >
                Email
              </span>
              <a
                href={`mailto:${DESTINATION_EMAIL}`}
                data-hover
                className="font-display link-underline"
                style={{
                  fontSize: "clamp(18px, 1.8vw, 24px)",
                  letterSpacing: "0.04em",
                  color: "var(--fg)",
                }}
              >
                {DESTINATION_EMAIL}
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "var(--fg-muted)",
                  fontFamily: "var(--font-space), sans-serif",
                }}
              >
                WhatsApp / Phone
              </span>
              <a
                href="https://wa.me/919398431573"
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="font-display link-underline"
                style={{
                  fontSize: "clamp(18px, 1.8vw, 24px)",
                  letterSpacing: "0.04em",
                  color: "var(--fg)",
                }}
              >
                +91 93984 31573
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "var(--fg-muted)",
                  fontFamily: "var(--font-space), sans-serif",
                }}
              >
                Studio
              </span>
              <span
                className="font-display"
                style={{
                  fontSize: "clamp(18px, 1.8vw, 24px)",
                  letterSpacing: "0.04em",
                  color: "var(--fg)",
                }}
              >
                Hyderabad, India
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "var(--fg-muted)",
                  fontFamily: "var(--font-space), sans-serif",
                }}
              >
                LinkedIn
              </span>
              <a
                href="https://linkedin.com/company/tech-builderz/"
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="font-display link-underline"
                style={{
                  fontSize: "clamp(18px, 1.8vw, 24px)",
                  letterSpacing: "0.04em",
                  color: "var(--fg)",
                }}
              >
                /tech-builderz
              </a>
            </div>
          </div>

          {/* 3D canvas */}
          <div className="mt-10 relative h-[260px] w-full md:h-[320px]">
            <ThreeCanvas
              camera={{ position: [0, 0, 3.2], fov: 38 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 2]}
            >
              <ambientLight intensity={0.45} />
              <pointLight position={[-3, 2, 2]} intensity={1.4} color="#ff5b1a" />
              <pointLight position={[3, -2, 2]} intensity={1.0} color="#4cb8ff" />
              <SceneEnvironment />
              <MiniBlob />
            </ThreeCanvas>
          </div>
        </div>

        {/* Right — Form */}
        <div
          className="p-8 md:p-10 flex flex-col"
          style={{
            background: "var(--bg-2)",
            border: "1px solid var(--line)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-space), sans-serif",
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--fg-muted)",
            }}
          >
            New project brief
          </p>
          <h3
            className="font-display mt-3 text-[var(--fg)]"
            style={{ fontSize: 28, letterSpacing: "0.02em" }}
          >
            {sent ? "Brief received." : "5 fields. 2 minutes."}
          </h3>

          {sent ? (
            <div className="mt-8 flex flex-col gap-6">
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: "var(--fg)",
                }}
              >
                Thanks{values.name ? `, ${values.name.split(" ")[0]}` : ""} — we
                got it. We'll reply to{" "}
                <span style={{ color: "var(--accent)" }}>{values.email}</span>{" "}
                within 24 hours with thoughts and a consult slot.
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--fg-muted)",
                  lineHeight: 1.7,
                }}
              >
                If you don't hear back, ping us on WhatsApp at +91 93984 31573 —
                we're real humans.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  type="button"
                  data-hover
                  onClick={reset}
                  className="btn-brut btn-brut-ghost"
                >
                  Send another →
                </button>
                <a
                  href="https://wa.me/919398431573"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="btn-brut"
                >
                  Continue on WhatsApp →
                </a>
              </div>
            </div>
          ) : (
            <div className="mt-6 flex flex-col">
              <Field
                label="Your name *"
                k="name"
                value={values.name}
                onChange={onChange}
                invalid={invalid("name")}
                disabled={sending}
              />
              <Field
                label="Email *"
                k="email"
                type="email"
                value={values.email}
                onChange={onChange}
                invalid={invalid("email")}
                disabled={sending}
              />
              <Field
                label="Company / business"
                k="biz"
                value={values.biz}
                onChange={onChange}
                disabled={sending}
              />

              <div className="flex flex-col gap-2 py-5">
                <label
                  style={{
                    fontFamily: "var(--font-space), sans-serif",
                    fontSize: 11,
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                    color: focusedSelect ? "var(--accent)" : "var(--fg-muted)",
                    transition: "color 0.3s",
                  }}
                >
                  Service interested
                </label>
                <select
                  value={values.service}
                  onChange={(e) => onChange("service", e.target.value)}
                  onFocus={() => setFocusedSelect(true)}
                  onBlur={() => setFocusedSelect(false)}
                  disabled={sending}
                  className="bg-transparent outline-none text-[var(--fg)] py-2 appearance-none disabled:opacity-50"
                  style={{
                    fontFamily: "var(--font-space), sans-serif",
                    fontSize: 16,
                    borderBottom: `1px solid ${
                      focusedSelect ? "var(--accent)" : "var(--line)"
                    }`,
                    transition: "border-color 0.3s",
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path d='M1 1l4 4 4-4' stroke='%238a857d' fill='none'/></svg>\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0 center",
                    paddingRight: 20,
                  }}
                >
                  <option value="" style={{ background: "var(--bg-2)" }}>
                    Select…
                  </option>
                  {servicesList.map((s) => (
                    <option
                      key={s}
                      value={s}
                      style={{ background: "var(--bg-2)" }}
                    >
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2 py-5">
                <label
                  style={{
                    fontFamily: "var(--font-space), sans-serif",
                    fontSize: 11,
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                    color: invalid("msg")
                      ? "#ff5b1a"
                      : focusedMsg
                      ? "var(--accent)"
                      : "var(--fg-muted)",
                    transition: "color 0.3s",
                  }}
                >
                  Tell us about it *
                </label>
                <textarea
                  value={values.msg}
                  onChange={(e) => onChange("msg", e.target.value)}
                  onFocus={() => setFocusedMsg(true)}
                  onBlur={() => setFocusedMsg(false)}
                  disabled={sending}
                  rows={4}
                  className="bg-transparent outline-none text-[var(--fg)] py-2 resize-none disabled:opacity-50"
                  style={{
                    fontFamily: "var(--font-space), sans-serif",
                    fontSize: 16,
                    borderBottom: `1px solid ${
                      invalid("msg")
                        ? "#ff5b1a"
                        : focusedMsg
                        ? "var(--accent)"
                        : "var(--line)"
                    }`,
                  }}
                />
              </div>

              {status === "error" && (
                <div
                  className="mt-2 p-3"
                  style={{
                    background: "rgba(255,91,26,0.08)",
                    border: "1px solid var(--accent)",
                    fontSize: 13,
                    color: "var(--accent)",
                    fontFamily: "var(--font-space), sans-serif",
                  }}
                >
                  {errorMsg}
                </div>
              )}

              <button
                type="button"
                data-hover
                onClick={submit}
                disabled={sending}
                className="btn-brut mt-8 w-full disabled:opacity-70"
                style={{
                  width: "100%",
                  background: "var(--accent)",
                  color: "var(--bg)",
                  padding: "1.4rem 2rem",
                  fontSize: 13,
                }}
              >
                {sending ? "Sending…" : "Send brief →"}
              </button>

              <a
                href="https://wa.me/919398431573"
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="btn-brut btn-brut-ghost mt-3 w-full"
                style={{
                  width: "100%",
                  padding: "1.1rem 2rem",
                  fontSize: 12,
                }}
              >
                Or, message us on WhatsApp →
              </a>

              <p
                className="mt-4 text-center"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  color: "var(--fg-muted)",
                  fontFamily: "var(--font-space), sans-serif",
                }}
              >
                Reply within 24 hours · No sales follow-ups
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
