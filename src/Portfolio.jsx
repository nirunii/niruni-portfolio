import { useState, useEffect, useRef, useCallback } from "react";
import profilePic from './assets/profile.jpg';
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  Copy,
  Check,
  Moon,
  Sun,
  ArrowUp,
  Menu,
  X,
  Code2,
  Database,
  Cloud,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Content — edit this block to update the site                       */
/* ------------------------------------------------------------------ */

const PROFILE = {
  name: "Niruni Prabhasha",
  roles: ["Software Engineer", "Full-Stack Developer", "React Developer"],
  bio:
    "I build exceptional and accessible digital experiences. Focused on creating scalable, performant applications with clean, maintainable code.",
  email: "udeshiniruni@gmail.com",
  phone: "+94 71 869 0162",
  location: "Sri Lanka",
  github: "https://github.com/nirunii",
  linkedin:
    "https://www.linkedin.com/in/j-m-u-niruni-prabhasha-a42668343/",
};

const SKILLS = [
  {
    group: "Frontend",
    icon: Code2,
    items: ["React", "JavaScript", "HTML5", "CSS3"],
  },
  {
    group: "Backend & Databases",
    icon: Database,
    items: ["PHP", "Java", "C#", "SQL", "Oracle APEX"],
  },
  {
    group: "Cloud & Tools",
    icon: Cloud,
    items: ["AWS Academy Cloud Foundations"],
  },
];

const PROJECTS = [
  {
    title: "Cricket Tournament Management System",
    summary:
      "Full-stack management platform handling teams, player records, and match fixtures.",
    details:
      "A complete tournament administration tool built to replace spreadsheet-based tracking. Handles team registration, player rosters, fixture scheduling, and live score entry, with a relational schema designed to keep results and standings consistent as the tournament progresses.",
    tech: ["PHP", "SQL", "JavaScript"],
    highlights: [
      "Relational schema for teams, players, and fixtures",
      "Server-side validation for match results and standings",
      "Admin views for scheduling and roster management",
    ],
    github: PROFILE.github,
    demo: "",
  },
  {
    title: "Movie-Theater Management System",
    summary:
      "Database-driven movie booking and theater management application.",
    details:
      "A booking platform for managing multiple theaters, showtimes, and seat inventory. Built on Oracle APEX for rapid form-driven administration, paired with PHP for the customer-facing booking flow.",
    tech: ["Oracle APEX", "PHP", "SQL"],
    highlights: [
      "Movie-theater, movie-showtime seat inventory",
      "Oracle APEX admin console for staff",
      "Booking flow with conflict-free seat selection",
    ],
    github: PROFILE.github,
    demo: "",
  },
  {
    title: "Student Management System",
    summary: "Academic tracking and management platform.",
    details:
      "A records system for tracking student enrollment, grades, and academic progress, designed around clear data ownership between administrators, teachers, and students.",
    tech: ["PHP", "SQL", "HTML/CSS"],
    highlights: [
      "Role-based views for admins, staff, and students",
      "Grade and attendance tracking",
      "Structured reporting for academic progress",
    ],
    github: PROFILE.github,
    demo: "",
  },
  {
    title: "Interactive React Portfolio",
    summary: "Modern personal portfolio web application built with React.",
    details:
      "This site — a component-based, fully responsive portfolio built with React and Tailwind CSS, focused on clean structure and smooth, purposeful motion.",
    tech: ["React", "Tailwind CSS"],
    highlights: [
      "Component-driven, fully responsive layout",
      "Scroll-triggered reveals and micro-interactions",
      "Dark / light theme switching",
    ],
    github: PROFILE.github,
    demo: "",
  },
];

/* ------------------------------------------------------------------ */
/* Theme tokens                                                       */
/* ------------------------------------------------------------------ */

const theme = {
  dark: {
    bg: "#05070c",
    bgAlt: "#0a0f1a",
    card: "rgba(17, 24, 39, 0.55)",
    cardBorder: "rgba(148, 163, 184, 0.12)",
    text: "#e7ecf5",
    textDim: "#8b96ab",
    cyan: "#22d3ee",
    violet: "#a78bfa",
  },
  light: {
    bg: "#f5f6fa",
    bgAlt: "#ffffff",
    card: "rgba(255, 255, 255, 0.7)",
    cardBorder: "rgba(15, 23, 42, 0.08)",
    text: "#0f172a",
    textDim: "#5b6577",
    cyan: "#0891b2",
    violet: "#7c3aed",
  },
};

/* ------------------------------------------------------------------ */
/* Reveal-on-scroll wrapper                                           */
/* ------------------------------------------------------------------ */

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: "opacity 0.7s ease, transform 0.7s ease",
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Typewriter role rotator                                            */
/* ------------------------------------------------------------------ */

function useTypewriter(words, typeSpeed = 55, deleteSpeed = 30, pause = 1400) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    let timeout;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length + 1)),
        typeSpeed
      );
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length - 1)),
        deleteSpeed
      );
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setIndex((i) => i + 1);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

/* ------------------------------------------------------------------ */
/* Small UI atoms                                                     */
/* ------------------------------------------------------------------ */

function Badge({ children, t }) {
  return (
    <span
      className="font-mono text-[11px] sm:text-xs px-2.5 py-1 rounded-full border transition-colors"
      style={{
        color: t.cyan,
        borderColor: `${t.cyan}40`,
        background: `${t.cyan}0d`,
      }}
    >
      {children}
    </span>
  );
}

function SectionLabel({ n, children, t }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span
        className="font-mono text-xs tracking-widest"
        style={{ color: t.cyan }}
      >
        {n}
      </span>
      <span
        className="h-px flex-1 max-w-[40px]"
        style={{ background: t.cardBorder }}
      />
      <span
        className="font-mono text-xs tracking-[0.2em] uppercase"
        style={{ color: t.textDim }}
      >
        {children}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                     */
/* ------------------------------------------------------------------ */

export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const t = isDark ? theme.dark : theme.light;

  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [formState, setFormState] = useState("idle"); // idle | sending | sent
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const glowRef = useRef(null);

  const typed = useTypewriter(PROFILE.roles);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseMove = useCallback((e) => {
    const el = glowRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--gx", `${x}%`);
    el.style.setProperty("--gy", `${y}%`);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
    } catch (e) {
      /* clipboard may be unavailable in this preview */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Replace this with your own Formspree endpoint (see README for how to get one).
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/myegnlzk";

  const submitForm = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setFormState("sending");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target),
      });

      if (res.ok) {
        setFormState("sent");
        setTimeout(() => {
          setFormState("idle");
          setForm({ name: "", email: "", subject: "", message: "" });
        }, 2200);
      } else {
        setFormState("error");
        setTimeout(() => setFormState("idle"), 2500);
      }
    } catch (err) {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 2500);
    }
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div
      className="min-h-screen w-full transition-colors duration-500"
      style={{
        background: isDark
          ? `radial-gradient(1200px 600px at 80% -10%, ${t.violet}14, transparent), radial-gradient(1000px 500px at 0% 10%, ${t.cyan}12, transparent), ${t.bg}`
          : `radial-gradient(1200px 600px at 80% -10%, ${t.violet}10, transparent), radial-gradient(1000px 500px at 0% 10%, ${t.cyan}10, transparent), ${t.bg}`,
        color: t.text,
        fontFamily:
          "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Space Grotesk', 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .grid-bg {
          background-image:
            linear-gradient(${t.cardBorder} 1px, transparent 1px),
            linear-gradient(90deg, ${t.cardBorder} 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 100%);
        }
        .glow-frame { position: relative; }
        .glow-frame::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 9999px;
          background: radial-gradient(180px circle at var(--gx, 50%) var(--gy, 50%), ${t.cyan}, ${t.violet}, transparent 70%);
          opacity: 0.55;
          filter: blur(6px);
          transition: opacity 0.3s ease;
          z-index: 0;
        }
        .cursor-blink { animation: blink 1s steps(1) infinite; }
        @keyframes blink { 50% { opacity: 0; } }
        .pulse-dot { animation: pulseDot 2s ease-in-out infinite; }
        @keyframes pulseDot {
          0%, 100% { box-shadow: 0 0 0 0 ${t.cyan}66; }
          50% { box-shadow: 0 0 0 6px ${t.cyan}00; }
        }
        .tilt-card { transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease; }
        .tilt-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px -20px ${t.cyan}30; }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
        }
      `}</style>

      {/* Background grid */}
      <div className="fixed inset-0 grid-bg pointer-events-none opacity-60" />

      {/* Floating nav */}
      <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 px-4">
        <div
          className="max-w-3xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-3 rounded-full backdrop-blur-xl border"
          style={{ background: t.card, borderColor: t.cardBorder }}
        >
          <button
            onClick={() => scrollTo("home")}
            className="font-mono font-semibold tracking-wide text-sm sm:text-base"
            style={{ color: t.text }}
          >
            NIRUNI<span style={{ color: t.cyan }}>.</span>DEV
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="font-mono text-xs tracking-wide uppercase hover:opacity-100 transition-opacity"
                style={{ color: t.textDim }}
                onMouseEnter={(e) => (e.currentTarget.style.color = t.cyan)}
                onMouseLeave={(e) => (e.currentTarget.style.color = t.textDim)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              aria-label="Toggle theme"
              onClick={() => setIsDark((d) => !d)}
              className="p-2 rounded-full border transition-colors"
              style={{ borderColor: t.cardBorder }}
            >
              {isDark ? (
                <Sun size={16} style={{ color: t.cyan }} />
              ) : (
                <Moon size={16} style={{ color: t.violet }} />
              )}
            </button>
            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen((m) => !m)}
              className="md:hidden p-2 rounded-full border"
              style={{ borderColor: t.cardBorder }}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className="md:hidden max-w-3xl mx-auto mt-2 rounded-2xl backdrop-blur-xl border overflow-hidden"
            style={{ background: t.card, borderColor: t.cardBorder }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="block w-full text-left px-6 py-3 font-mono text-sm uppercase"
                style={{ color: t.textDim }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-16 sm:pb-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-8 items-center">
          <div>
            <Reveal>
              <div
                className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full border mb-6"
                style={{ borderColor: t.cardBorder, background: t.card, color: t.textDim }}
              >
                <span
                  className="w-2 h-2 rounded-full pulse-dot"
                  style={{ background: t.cyan }}
                />
                Available for new projects
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="font-display font-bold leading-[1.05] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-5">
                Hi, I&apos;m {PROFILE.name.split(" ")[0]}
                <span style={{ color: t.cyan }}> —</span>
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${t.cyan}, ${t.violet})`,
                  }}
                >
                  {typed}
                </span>
                <span className="cursor-blink" style={{ color: t.violet }}>
                  |
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p
                className="text-base sm:text-lg max-w-xl mb-8 leading-relaxed"
                style={{ color: t.textDim }}
              >
                {PROFILE.bio}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <button
                  onClick={() => scrollTo("projects")}
                  className="px-5 sm:px-6 py-3 rounded-xl font-semibold text-sm transition-transform hover:-translate-y-0.5"
                  style={{ background: t.cyan, color: "#04141a" }}
                >
                  View Work
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="px-5 sm:px-6 py-3 rounded-xl font-semibold text-sm border transition-transform hover:-translate-y-0.5"
                  style={{ borderColor: t.cyan, color: t.cyan }}
                >
                  Get in Touch
                </button>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="flex items-center gap-4">
                {[
                  { icon: Github, href: PROFILE.github, label: "GitHub" },
                  { icon: Linkedin, href: PROFILE.linkedin, label: "LinkedIn" },
                  { icon: Mail, href: `mailto:${PROFILE.email}`, label: "Email" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="p-2.5 rounded-full border transition-all hover:-translate-y-1"
                    style={{ borderColor: t.cardBorder, color: t.textDim }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = t.cyan)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = t.textDim)}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="flex justify-center lg:justify-end">
              <div
                ref={glowRef}
                onMouseMove={handleMouseMove}
                className="glow-frame relative w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full"
              >
                {/*<div
                  className="relative z-10 w-full h-full rounded-full flex items-center justify-center border backdrop-blur-xl"
                  style={{ background: t.card, borderColor: t.cardBorder }}
                >
                  <span
                    className="font-display font-bold text-5xl sm:text-6xl"
                    style={{ color: t.cyan }}
                  >
                    NP
                  </span>
                </div>*/}

                <img 
  src={profilePic} 
  alt="Niruni Prabhasha" 
  className="relative z-10 w-full h-full rounded-full object-cover" 
/>



                {["React", "SQL", "PHP", "AWS"].map((tag, i) => (
                  <span
                    key={tag}
                    className="absolute font-mono text-[10px] sm:text-xs px-2 py-1 rounded-full border backdrop-blur-xl"
                    style={{
                      borderColor: t.cardBorder,
                      background: t.card,
                      color: t.violet,
                      top: `${[8, 25, 70, 88][i]}%`,
                      left: `${[-8, 95, -10, 90][i]}%`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
      >
        <Reveal>
          <SectionLabel n="01" t={t}>
            About Me
          </SectionLabel>
        </Reveal>
        <Reveal delay={80}>
          <div
            className="rounded-2xl border backdrop-blur-xl p-6 sm:p-8 lg:p-10"
            style={{ background: t.card, borderColor: t.cardBorder }}
          >
            <p
              className="text-lg sm:text-xl leading-relaxed max-w-3xl"
              style={{ color: t.text }}
            >
              {PROFILE.bio} My background spans full-stack web development —
              from React interfaces to PHP and SQL-driven backends — with a
              growing focus on cloud fundamentals through AWS Academy.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Skills */}
      <section
        id="skills"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
      >
        <Reveal>
          <SectionLabel n="02" t={t}>
            Skill Matrix
          </SectionLabel>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-6">
          {SKILLS.map((group, gi) => (
            <Reveal key={group.group} delay={gi * 100}>
              <div
                className="tilt-card h-full rounded-2xl border backdrop-blur-xl p-6"
                style={{ background: t.card, borderColor: t.cardBorder }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="p-2 rounded-lg"
                    style={{ background: `${t.cyan}14` }}
                  >
                    <group.icon size={18} style={{ color: t.cyan }} />
                  </div>
                  <h3 className="font-display font-semibold text-base sm:text-lg">
                    {group.group}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item} t={t}>
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
      >
        <Reveal>
          <SectionLabel n="03" t={t}>
            Featured Work
          </SectionLabel>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mt-6">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.title} delay={i * 90}>
              <div
                className="tilt-card h-full flex flex-col rounded-2xl border backdrop-blur-xl overflow-hidden"
                style={{ background: t.card, borderColor: t.cardBorder }}
              >
                <div
                  className="h-36 sm:h-40 flex items-center justify-center font-mono text-xs px-4 text-center"
                  style={{
                    background: `linear-gradient(135deg, ${t.cyan}1a, ${t.violet}1a)`,
                    color: t.textDim,
                  }}
                >
                  {project.title}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-semibold text-lg mb-2">
                    {project.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-4 flex-1"
                    style={{ color: t.textDim }}
                  >
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((tag) => (
                      <Badge key={tag} t={t}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div
                    className="flex items-center justify-between pt-4 border-t"
                    style={{ borderColor: t.cardBorder }}
                  >
                    <button
                      onClick={() => setActiveProject(project)}
                      className="font-mono text-xs uppercase tracking-wide"
                      style={{ color: t.cyan }}
                    >
                      Details
                    </button>
                    <div className="flex items-center gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                        style={{ color: t.textDim }}
                      >
                        <Github size={17} />
                      </a>
                      <a
                        href={project.demo || project.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Live demo"
                        style={{ color: t.textDim }}
                      >
                        <ExternalLink size={17} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Project modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={() => setActiveProject(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border backdrop-blur-xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto"
            style={{ background: t.bgAlt, borderColor: t.cardBorder }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-display font-bold text-xl sm:text-2xl pr-4">
                {activeProject.title}
              </h3>
              <button
                onClick={() => setActiveProject(null)}
                aria-label="Close"
                style={{ color: t.textDim }}
              >
                <X size={20} />
              </button>
            </div>
            <p
              className="text-sm sm:text-base leading-relaxed mb-5"
              style={{ color: t.textDim }}
            >
              {activeProject.details}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {activeProject.tech.map((tag) => (
                <Badge key={tag} t={t}>
                  {tag}
                </Badge>
              ))}
            </div>
            <h4
              className="font-mono text-xs uppercase tracking-widest mb-3"
              style={{ color: t.cyan }}
            >
              Highlights
            </h4>
            <ul className="space-y-2 mb-6">
              {activeProject.highlights.map((h) => (
                <li
                  key={h}
                  className="text-sm flex gap-2"
                  style={{ color: t.text }}
                >
                  <span style={{ color: t.cyan }}>▸</span>
                  {h}
                </li>
              ))}
            </ul>
            <div className="flex gap-3">
              <a
                href={activeProject.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium"
                style={{ borderColor: t.cardBorder, color: t.text }}
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href={activeProject.demo || activeProject.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: t.cyan, color: "#04141a" }}
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Contact */}
      <section
        id="contact"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
      >
        <Reveal>
          <SectionLabel n="04" t={t}>
            Contact
          </SectionLabel>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 mt-6">
          <Reveal delay={80}>
            <div className="flex flex-col gap-4 h-full">
              <div
                className="rounded-2xl border backdrop-blur-xl p-5 flex items-center justify-between gap-3"
                style={{ background: t.card, borderColor: t.cardBorder }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Mail size={18} style={{ color: t.cyan }} className="shrink-0" />
                  <span className="text-sm truncate">{PROFILE.email}</span>
                </div>
                <button
                  onClick={copyEmail}
                  aria-label="Copy email"
                  className="shrink-0 p-2 rounded-lg border"
                  style={{ borderColor: t.cardBorder }}
                >
                  {copied ? (
                    <Check size={15} style={{ color: t.cyan }} />
                  ) : (
                    <Copy size={15} style={{ color: t.textDim }} />
                  )}
                </button>
              </div>

              <div
                className="rounded-2xl border backdrop-blur-xl p-5 flex items-center gap-3"
                style={{ background: t.card, borderColor: t.cardBorder }}
              >
                <Phone size={18} style={{ color: t.violet }} className="shrink-0" />
                <span className="text-sm">{PROFILE.phone}</span>
              </div>

              <div
                className="rounded-2xl border backdrop-blur-xl p-5 flex items-center gap-3"
                style={{ background: t.card, borderColor: t.cardBorder }}
              >
                <MapPin size={18} style={{ color: t.violet }} className="shrink-0" />
                <span className="text-sm">{PROFILE.location}</span>
              </div>

              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border backdrop-blur-xl p-5 flex items-center gap-3 transition-transform hover:-translate-y-0.5"
                style={{ background: t.card, borderColor: t.cardBorder }}
              >
                <Linkedin size={18} style={{ color: t.cyan }} className="shrink-0" />
                <span className="text-sm">LinkedIn Profile</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <form
              onSubmit={submitForm}
              className="rounded-2xl border backdrop-blur-xl p-6 sm:p-8"
              style={{ background: t.card, borderColor: t.cardBorder }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input
                  required
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-transparent border outline-none text-sm transition-shadow"
                  style={{ borderColor: t.cardBorder, color: t.text }}
                  onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px ${t.cyan}33`)}
                  onBlur={(e) => (e.target.style.boxShadow = "none")}
                />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-transparent border outline-none text-sm transition-shadow"
                  style={{ borderColor: t.cardBorder, color: t.text }}
                  onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px ${t.cyan}33`)}
                  onBlur={(e) => (e.target.style.boxShadow = "none")}
                />
              </div>
              <input
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-transparent border outline-none text-sm mb-4 transition-shadow"
                style={{ borderColor: t.cardBorder, color: t.text }}
                onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px ${t.cyan}33`)}
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
              <textarea
                required
                rows={5}
                name="message"
                placeholder="Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-transparent border outline-none text-sm mb-5 resize-none transition-shadow"
                style={{ borderColor: t.cardBorder, color: t.text }}
                onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px ${t.cyan}33`)}
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
              <button
                type="submit"
                disabled={formState !== "idle"}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm transition-all"
                style={{
                  background:
                    formState === "sent"
                      ? "#34d399"
                      : formState === "error"
                      ? "#f87171"
                      : t.cyan,
                  color: "#04141a",
                  opacity: formState === "sending" ? 0.7 : 1,
                }}
              >
                {formState === "idle" && "Send Message"}
                {formState === "sending" && "Sending..."}
                {formState === "sent" && "✓ Message Sent"}
                {formState === "error" && "✕ Something went wrong — try again"}
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative z-10 border-t"
        style={{ borderColor: t.cardBorder }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono font-semibold text-sm">
            NIRUNI<span style={{ color: t.cyan }}>.</span>DEV
          </span>
          <div
            className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full border"
            style={{ borderColor: t.cardBorder, color: t.textDim }}
          >
            <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: t.cyan }} />
            Available for work
          </div>
          <span className="text-xs" style={{ color: t.textDim }}>
            © 2026 {PROFILE.name} {/*· Built with React &amp; Tailwind*/}
          </span>
        </div>
      </footer>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full border backdrop-blur-xl transition-transform hover:-translate-y-1"
          style={{ background: t.card, borderColor: t.cardBorder, color: t.cyan }}
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}
