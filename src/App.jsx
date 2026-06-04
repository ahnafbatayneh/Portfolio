import { useState, useEffect, useRef } from "react";
import heroImg from "./assets/hero.png";

const TEAL = "#64FFDA";
const NAV = ["About", "Skills", "Experience", "Projects", "Apps"];

const data = {
  name: "Ahnaf Batayneh",
  title: "Senior Flutter & Full-Stack Developer",
  summary:
    "I've been building Flutter apps for over 5 years — long enough to have made the mistakes, learned from them, and built systems I'm actually proud of. I work across the full stack: Flutter on the front, Node.js or Laravel on the back, and whatever the project needs in between. Real products, real users. I don't stop until the thing actually works well.",
  contact: {
    location: "Irbid, Jordan",
    phone: "+962 798 999 814",
    email: "Ahnafbataineh97@gmail.com",
    linkedin: {
      label: "linkedin.com/in/ahnaf-batayneh",
      url: "https://www.linkedin.com/in/ahnaf-batayneh/",
    },
    github: { label: "github.com/ahnaf-batayneh", url: "https://github.com/" },
  },
  stats: [
    ["5+", "Years Flutter"],
    ["10+", "Apps Shipped"],
    ["500+", "Containers/mo"],
  ],
  skills: [
    {
      cat: "Mobile",
      items: [
        "Flutter",
        "Dart",
        "Provider",
        "GetX",
        "GoRouter",
        "Firebase",
        "FCM",
        "Google Maps",
        "Dio",
        "Bloc",
      ],
    },
    {
      cat: "Backend",
      items: [
        "Node.js",
        "Express",
        "Laravel",
        "PHP",
        "REST API",
        "Socket.io",
        "WebSockets",
        "WhatsApp Webhooks",
      ],
    },
    {
      cat: "Frontend",
      items: [
        "React.js",
        "JavaScript ES6+",
        "HTML5",
        "CSS3",
        "jQuery",
        "Bootstrap",
      ],
    },
    {
      cat: "Databases",
      items: ["MySQL", "MongoDB", "Firebase", "Firestore", "Mongoose"],
    },
    {
      cat: "DevOps & Tools",
      items: [
        "Git",
        "GitHub",
        "CI/CD",
        "Play Console",
        "App Store Connect",
        "Render",
      ],
    },
    {
      cat: "Architecture",
      items: [
        "MVC",
        "Clean Architecture",
        "Provider Pattern",
        "REST",
        "Microservices",
      ],
    },
  ],
  bars: [
    ["Flutter / Dart", 95],
    ["Node.js", 82],
    ["Laravel / PHP", 80],
    ["React.js", 72],
    ["Firebase", 90],
    ["MySQL / MongoDB", 85],
  ],
  experience: [
    {
      title: "Senior Flutter Developer",
      company: "Five Hundred Software Technology",
      location: "Amman, Jordan",
      dates: "Jan 2023 – Present",
      current: true,
      bullets: [
        "Architect and deliver cross-platform Flutter apps for Android, iOS, and Web from concept to store release.",
        "Built SabShip — real-time vessel tracking with Google Maps, Socket.io and Firebase push notifications.",
        "Designed Node.js servers on Render; built REST APIs and WhatsApp Bot via Facebook Webhooks.",
        "Applied MVC and Clean Architecture; mentored junior developers and handled framework upgrades.",
      ],
    },
    {
      title: "Flutter Developer",
      company: "Five Hundred Software Technology",
      location: "Amman, Jordan",
      dates: "Jan 2021 – Dec 2022",
      current: false,
      bullets: [
        "Built mobile and web apps using Flutter and PHP/Laravel with MySQL database integration.",
        "Worked with Firebase Authentication, Cloud Messaging, and Cloud Storage.",
        "Delivered food ordering, e-commerce, and shipping apps used by thousands of users.",
      ],
    },
    {
      title: "IT & Network Infrastructure Specialist",
      company: "Jordan Hazardous Device Training Center (JHDTC)",
      location: "Jordan",
      dates: "3 months",
      current: false,
      bullets: [
        "Designed and developed the center's official website from scratch.",
        "Configured internal network, IP surveillance cameras, and networked hardware.",
      ],
    },
  ],
  projects: [
    {
      name: "SAB Transport & Shipping",
      tech: ["Laravel", "Node.js", "Flutter", "MySQL"],
      url: "https://sabship.com/",
      desc: "Full logistics platform — website, internal portal & Flutter apps. 500+ monthly containers served.",
    },
    {
      name: "Zeroo — Car Parts Marketplace",
      tech: ["Flutter", "Node.js", "MySQL", "Laravel"],
      url: "https://zeroo-jo.com/",
      desc: "2-sided marketplace: web + customer app + trader app across Jordan.",
    },
    {
      name: "Affaq — Language Learning",
      tech: ["Flutter", "Firebase", "TTS/STT"],
      url: null,
      desc: "Arabic, English & Gulf dialect app with audio pronunciation & interactive exams.",
    },
    {
      name: "AI Camera — Deepfake Detector",
      tech: ["Flutter", "ML", "REST API"],
      url: null,
      desc: "Detects and flags AI-manipulated images using ML models via API.",
    },
    {
      name: "AI Chat — GPT Assistant",
      tech: ["Flutter", "OpenAI API", "Google Search"],
      url: null,
      desc: "AI chat app with QR scanning and Google Search integration.",
    },
    {
      name: "Donation Platform",
      tech: ["Flutter", "Firebase"],
      url: null,
      desc: "Social donation app connecting donors with beneficiaries across Jordan.",
    },
  ],
  apps: [
    {
      name: "SabShip – ProShip",
      sub: "Internal logistics & vessel management",
      url: "https://play.google.com/store/apps/details?id=com.five.proship",
    },
    {
      name: "SabShip – Customer",
      sub: "Container tracking for end customers",
      url: "https://play.google.com/store/apps/details?id=com.sabship.sab_ship",
    },
    {
      name: "Zeroo – Customer",
      sub: "Car parts marketplace — buyer side",
      url: "https://play.google.com/store/apps/details?id=com.ahnaf.zeroo",
    },
    {
      name: "Zeroo – Traders",
      sub: "Car parts marketplace — seller/trader side",
      url: "https://play.google.com/store/apps/details?id=com.ahnaf.zeroo_traders",
    },
  ],
};

/* ─── hooks ─── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function useActiveSection() {
  const [active, setActive] = useState("About");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.dataset.section);
        }),
      { threshold: 0.35 },
    );
    document
      .querySelectorAll("[data-section]")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return active;
}

/* ─── TypeWriter ─── */
function TypeWriter({ text, speed = 55 }) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setOut(text.slice(0, ++i));
      if (i >= text.length) {
        clearInterval(t);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return (
    <span>
      {out}
      {!done && (
        <span
          style={{
            borderRight: `2px solid ${TEAL}`,
            animation: "blink 1s step-end infinite",
          }}
        >
          &nbsp;
        </span>
      )}
    </span>
  );
}

/* ─── SkillBar ─── */
function SkillBar({ label, pct, delay }) {
  const [ref, vis] = useInView(0.2);
  return (
    <div ref={ref} style={{ marginBottom: 12 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          color: "#8892B0",
          marginBottom: 5,
        }}
      >
        <span>{label}</span>
        <span style={{ color: TEAL }}>{pct}%</span>
      </div>
      <div style={{ height: 3, background: "#1E3A5F", borderRadius: 2 }}>
        <div
          style={{
            height: "100%",
            borderRadius: 2,
            background: `linear-gradient(90deg, ${TEAL}, #00B4D8)`,
            width: vis ? `${pct}%` : "0%",
            transition: `width 1.3s cubic-bezier(.4,0,.2,1) ${delay}s`,
          }}
        />
      </div>
    </div>
  );
}

/* ─── Reveal wrapper ─── */
function Reveal({ children, delay = 0, y = 28 }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Section title ─── */
function SectionTitle({ num, title }) {
  return (
    <Reveal>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 36,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 12,
            color: TEAL,
            letterSpacing: 3,
          }}
        >
          {num}.
        </span>
        <h2
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 26,
            fontWeight: 700,
            color: "#CCD6F6",
            margin: 0,
          }}
        >
          {title}
        </h2>
        <div style={{ flex: 1, height: 1, background: "#1E3A5F" }} />
      </div>
    </Reveal>
  );
}

/* ─── NAV ─── */
function Nav({ active }) {
  const scrollTo = (id) =>
    document
      .querySelector(`[data-section="${id}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(10,25,47,0.93)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid #1E3A5F",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 56,
        animation: "fadeDown 0.6s ease",
      }}
    >
      <div
        style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontWeight: 700,
          fontSize: 18,
          color: TEAL,
          letterSpacing: 1,
          cursor: "default",
        }}
      >
        AB.
      </div>
      <div style={{ display: "flex", gap: 2 }}>
        {NAV.map((n) => (
          <button
            key={n}
            onClick={() => scrollTo(n)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontFamily: "inherit",
              padding: "6px 12px",
              borderRadius: 4,
              color: active === n ? TEAL : "#8892B0",
              fontWeight: active === n ? 500 : 400,
              transition: "all 0.2s",
              borderBottom:
                active === n ? `2px solid ${TEAL}` : "2px solid transparent",
            }}
          >
            {n}
          </button>
        ))}
      </div>
    </nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section
      data-section="About"
      style={{
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
        paddingTop: 40,
        paddingBottom: 40,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 48,
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Left */}
        <div>
          <p
            style={{
              color: TEAL,
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: 13,
              letterSpacing: 3,
              marginBottom: 20,
              opacity: 0,
              animation: "fadeUp 0.7s ease 0.2s forwards",
            }}
          >
            HELLO, I'M
          </p>
          <h1
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(38px,6.5vw,68px)",
              fontWeight: 700,
              color: "#CCD6F6",
              lineHeight: 1.05,
              marginBottom: 14,
              opacity: 0,
              animation: "fadeUp 0.7s ease 0.35s forwards",
            }}
          >
            <TypeWriter text={data.name} />
          </h1>
          <h2
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(16px,2.8vw,24px)",
              fontWeight: 400,
              color: "#8892B0",
              marginBottom: 24,
              opacity: 0,
              animation: "fadeUp 0.7s ease 0.5s forwards",
            }}
          >
            {data.title}
          </h2>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.8,
              color: "#8892B0",
              maxWidth: 500,
              marginBottom: 36,
              opacity: 0,
              animation: "fadeUp 0.7s ease 0.65s forwards",
            }}
          >
            {data.summary}
          </p>
          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: 36,
              marginBottom: 36,
              opacity: 0,
              animation: "fadeUp 0.7s ease 0.75s forwards",
            }}
          >
            {data.stats.map(([n, l]) => (
              <div key={l}>
                <div
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: 28,
                    fontWeight: 700,
                    color: TEAL,
                  }}
                >
                  {n}
                </div>
                <div style={{ fontSize: 11, color: "#4A6280", marginTop: 2 }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
          {/* Contact pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 9,
              opacity: 0,
              animation: "fadeUp 0.7s ease 0.85s forwards",
            }}
          >
            {[
              { icon: "ti-map-pin", text: data.contact.location },
              { icon: "ti-phone", text: data.contact.phone },
              { icon: "ti-mail", text: data.contact.email },
              {
                icon: "ti-brand-linkedin",
                text: "LinkedIn",
                url: data.contact.linkedin.url,
              },
              {
                icon: "ti-brand-github",
                text: "GitHub",
                url: data.contact.github.url,
              },
            ].map(({ icon, text, url }) => {
              const Tag = url ? "a" : "span";
              return (
                <Tag
                  key={text}
                  href={url}
                  target={url ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    fontSize: 12,
                    color: url ? TEAL : "#8892B0",
                    background: "rgba(100,255,218,0.04)",
                    border: `1px solid ${url ? "rgba(100,255,218,0.25)" : "#1E3A5F"}`,
                    borderRadius: 20,
                    padding: "5px 14px",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  <i
                    className={`ti ${icon}`}
                    style={{ fontSize: 13, color: TEAL }}
                    aria-hidden="true"
                  />
                  {text}
                </Tag>
              );
            })}
          </div>
        </div>

        {/* Right — photo */}
        <div
          style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.4s forwards" }}
        >
          <div style={{ position: "relative", width: 220 }}>
            {/* Rotating ring */}
            <div
              style={{
                position: "absolute",
                inset: -12,
                borderRadius: "50%",
                border: `1px dashed rgba(100,255,218,0.25)`,
                animation: "spin 18s linear infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: -6,
                borderRadius: "50%",
                border: `1px solid rgba(100,255,218,0.1)`,
              }}
            />
            {/* Photo frame */}
            <div
              style={{
                width: 220,
                height: 220,
                borderRadius: "50%",
                overflow: "hidden",
                border: `3px solid ${TEAL}`,
                position: "relative",
                zIndex: 1,
              }}
            >
              <img
                src={heroImg}
                alt="Ahnaf Batayneh"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 15%",
                }}
              />
            </div>
            {/* Teal dot badge */}
            <div
              style={{
                position: "absolute",
                bottom: 12,
                right: 8,
                zIndex: 2,
                background: "#0A192F",
                borderRadius: 20,
                padding: "4px 10px",
                border: `1px solid ${TEAL}`,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: TEAL,
                  animation: "pulse 2s ease infinite",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  color: TEAL,
                  fontFamily: "'Space Grotesk',sans-serif",
                }}
              >
                Available
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SKILLS ─── */
function Skills() {
  return (
    <section
      data-section="Skills"
      style={{ paddingTop: 80, paddingBottom: 40 }}
    >
      <SectionTitle num="02" title="Technical Skills" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))",
          gap: 16,
          marginBottom: 20,
        }}
      >
        {data.skills.map((s, si) => (
          <Reveal key={s.cat} delay={si * 0.07}>
            <div
              style={{
                background: "#112240",
                border: "1px solid #1E3A5F",
                borderRadius: 12,
                padding: "20px 22px",
                transition: "border-color 0.3s, transform 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(100,255,218,0.4)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1E3A5F";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: TEAL,
                  letterSpacing: 2,
                  marginBottom: 14,
                  fontFamily: "'Space Grotesk',sans-serif",
                }}
              >
                {s.cat.toUpperCase()}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {s.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontSize: 12,
                      background: "rgba(100,255,218,0.05)",
                      color: "#8892B0",
                      border: "1px solid #1E3A5F",
                      borderRadius: 4,
                      padding: "3px 9px",
                      cursor: "default",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(100,255,218,0.12)";
                      e.currentTarget.style.color = TEAL;
                      e.currentTarget.style.borderColor =
                        "rgba(100,255,218,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(100,255,218,0.05)";
                      e.currentTarget.style.color = "#8892B0";
                      e.currentTarget.style.borderColor = "#1E3A5F";
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.35}>
        <div
          style={{
            background: "#112240",
            border: "1px solid #1E3A5F",
            borderRadius: 12,
            padding: "24px 28px",
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: TEAL,
              letterSpacing: 2,
              marginBottom: 20,
              fontFamily: "'Space Grotesk',sans-serif",
            }}
          >
            PROFICIENCY
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
              gap: "0 40px",
            }}
          >
            {data.bars.map(([l, p], i) => (
              <SkillBar key={l} label={l} pct={p} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── EXPERIENCE ─── */
function Experience() {
  return (
    <section
      data-section="Experience"
      style={{ paddingTop: 80, paddingBottom: 40 }}
    >
      <SectionTitle num="03" title="Work Experience" />
      <div style={{ position: "relative", paddingLeft: 28 }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 8,
            bottom: 8,
            width: 1,
            background: "#1E3A5F",
          }}
        />
        {data.experience.map((job, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div
              style={{
                position: "relative",
                marginBottom: i < data.experience.length - 1 ? 44 : 0,
              }}
            >
              {/* timeline dot */}
              <div
                style={{
                  position: "absolute",
                  left: -32,
                  top: 6,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: job.current ? TEAL : "#0A192F",
                  border: `2px solid ${TEAL}`,
                  boxShadow: job.current
                    ? `0 0 0 4px rgba(100,255,218,0.15)`
                    : "none",
                  animation: job.current
                    ? "dotPulse 2.5s ease infinite"
                    : "none",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk',sans-serif",
                      fontSize: 17,
                      fontWeight: 600,
                      color: "#CCD6F6",
                      margin: 0,
                    }}
                  >
                    {job.title}
                  </h3>
                  <div style={{ fontSize: 14, color: TEAL, marginTop: 3 }}>
                    {job.company}
                  </div>
                  <div style={{ fontSize: 12, color: "#4A6280", marginTop: 2 }}>
                    {job.location}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    color: TEAL,
                    background: "rgba(100,255,218,0.07)",
                    border: "1px solid rgba(100,255,218,0.2)",
                    borderRadius: 20,
                    padding: "4px 13px",
                    height: "fit-content",
                    whiteSpace: "nowrap",
                  }}
                >
                  {job.dates}
                </span>
              </div>
              <ul
                style={{
                  paddingLeft: 18,
                  display: "flex",
                  flexDirection: "column",
                  gap: 7,
                  marginTop: 10,
                }}
              >
                {job.bullets.map((b, bi) => (
                  <li
                    key={bi}
                    style={{ fontSize: 14, color: "#8892B0", lineHeight: 1.75 }}
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── PROJECTS ─── */
function Projects() {
  return (
    <section
      data-section="Projects"
      style={{ paddingTop: 80, paddingBottom: 40 }}
    >
      <SectionTitle num="04" title="Key Projects" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))",
          gap: 18,
        }}
      >
        {data.projects.map((p, i) => (
          <Reveal key={i} delay={i * 0.07}>
            <div
              style={{
                background: "#112240",
                border: "1px solid #1E3A5F",
                borderRadius: 12,
                padding: "22px",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                transition: "all 0.3s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = TEAL;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1E3A5F";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 14,
                }}
              >
                <i
                  className="ti ti-folder"
                  style={{ fontSize: 22, color: TEAL }}
                  aria-hidden="true"
                />
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#8892B0",
                      fontSize: 16,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = TEAL)}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#8892B0")
                    }
                  >
                    <i className="ti ti-external-link" aria-hidden="true" />
                  </a>
                )}
              </div>
              <h3
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#CCD6F6",
                  marginBottom: 10,
                }}
              >
                {p.name}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: "#8892B0",
                  lineHeight: 1.7,
                  flex: 1,
                  marginBottom: 16,
                }}
              >
                {p.desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 10,
                      color: TEAL,
                      fontFamily: "monospace",
                      background: "rgba(100,255,218,0.05)",
                      padding: "2px 7px",
                      borderRadius: 3,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── APPS + EDUCATION + LANGUAGES ─── */
function Apps() {
  return (
    <section data-section="Apps" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <SectionTitle num="05" title="Published Apps" />
      <Reveal>
        <div
          style={{
            background: "#112240",
            border: "1px solid #1E3A5F",
            borderRadius: 12,
            overflow: "hidden",
            marginBottom: 18,
          }}
        >
          {data.apps.map((app, i) => (
            <a
              key={i}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "17px 22px",
                borderBottom:
                  i < data.apps.length - 1 ? "1px solid #1E3A5F" : "none",
                textDecoration: "none",
                color: "inherit",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(100,255,218,0.04)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: "rgba(100,255,218,0.07)",
                  border: "1px solid rgba(100,255,218,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <i
                  className="ti ti-brand-google-play"
                  style={{ fontSize: 16, color: TEAL }}
                  aria-hidden="true"
                />
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{ fontSize: 14, fontWeight: 500, color: "#CCD6F6" }}
                >
                  {app.name}
                </div>
                <div style={{ fontSize: 12, color: "#4A6280", marginTop: 2 }}>
                  {app.sub}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 12,
                  color: TEAL,
                  whiteSpace: "nowrap",
                }}
              >
                Play Store{" "}
                <i
                  className="ti ti-arrow-right"
                  style={{ fontSize: 13 }}
                  aria-hidden="true"
                />
              </div>
            </a>
          ))}
        </div>
      </Reveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: 16,
          marginBottom: 60,
        }}
      >
        <Reveal delay={0.1}>
          <div
            style={{
              background: "#112240",
              border: "1px solid #1E3A5F",
              borderRadius: 12,
              padding: "22px 24px",
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: TEAL,
                letterSpacing: 2,
                marginBottom: 14,
                fontFamily: "'Space Grotesk',sans-serif",
              }}
            >
              EDUCATION
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: "#CCD6F6",
                marginBottom: 5,
              }}
            >
              B.Sc. Software Engineering
            </div>
            <div style={{ fontSize: 13, color: "#8892B0", marginBottom: 5 }}>
              Jordan University of Science & Technology
            </div>
            <div style={{ fontSize: 12, color: "#4A6280" }}>
              2015 – 2019 · Good
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div
            style={{
              background: "#112240",
              border: "1px solid #1E3A5F",
              borderRadius: 12,
              padding: "22px 24px",
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: TEAL,
                letterSpacing: 2,
                marginBottom: 14,
                fontFamily: "'Space Grotesk',sans-serif",
              }}
            >
              LANGUAGES
            </div>
            {[
              ["Arabic", "Native Speaker"],
              ["English", "Professional Working"],
            ].map(([l, p]) => (
              <div
                key={l}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <span
                  style={{ fontSize: 14, color: "#CCD6F6", fontWeight: 500 }}
                >
                  {l}
                </span>
                <span style={{ fontSize: 12, color: "#4A6280" }}>{p}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <div style={{ textAlign: "center", paddingTop: 20 }}>
          <div style={{ fontSize: 11, color: "#1E3A5F", marginBottom: 8 }}>
            Designed & Built by
          </div>
          <div
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: 13,
              color: TEAL,
              letterSpacing: 3,
            }}
          >
            AHNAF BATAYNEH
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── ROOT ─── */
export default function App() {
  const active = useActiveSection();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;700&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');
        @keyframes blink { 50% { opacity: 0 } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-16px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(100,255,218,0.4) } 50% { box-shadow: 0 0 0 6px rgba(100,255,218,0) } }
        @keyframes dotPulse { 0%,100% { box-shadow: 0 0 0 4px rgba(100,255,218,0.15) } 50% { box-shadow: 0 0 0 7px rgba(100,255,218,0.05) } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A192F; }
        ::-webkit-scrollbar-thumb { background: #64FFDA; border-radius: 2px; }
      `}</style>
      <div
        style={{
          fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
          background: "#0A192F",
          color: "#CCD6F6",
          minHeight: "100vh",
        }}
      >
        <Nav active={active} />
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>
          <Hero />
          <Skills />
          <Experience />
          <Projects />
          <Apps />
        </div>
      </div>
    </>
  );
}
