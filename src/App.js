import { Typewriter } from 'react-simple-typewriter'
import './App.css';
import jamyImg from './image/jamy.jpg';
import { MapPin } from "lucide-react";
import { Github, Instagram, Linkedin } from "lucide-react";
import { Briefcase } from "lucide-react";
import { Folder } from "lucide-react";

//import for chatbot
import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X } from "lucide-react";


const openCalendly = () =>
  window.open("https://calendly.com/jamduarte", "_blank", "noopener,noreferrer");


// put this inside your component, above the return()
const openGmailCompose = () => {
  const to = "jamilahmarram@gmail.com";
  const subject = "Project Inquiry";
  const body = "Hi Jamilah,\n";

  const gmailUrl =
    `https://mail.google.com/mail/?view=cm&fs=1&tf=1` +
    `&to=${encodeURIComponent(to)}` +
    `&su=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  window.open(gmailUrl, "_blank", "noopener,noreferrer");
};

// function for chatbot
function FloatingChat() {
  const MAX_LEN = 1000;

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([
    {
      from: "bot",
      text:
        "Hi there! 👋 Thanks for visiting my website. Feel free to ask me anything about programming, web development, or my projects. How can I help?",
    },
  ]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  const sendMsg = () => {
    const text = input.trim();
    if (!text) return;
    setMsgs(m => [...m, { from: "user", text }]);
    setInput("");

    // fake reply
    setTimeout(() => {
      setMsgs(m => [
        ...m,
        {
          from: "bot",
          text:
            "Thanks! You can also ‘Schedule a Call’ or ‘Send Email’ using the buttons in the sidebar.",
        },
      ]);
    }, 600);
  };

  const onKeyDown = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMsg();
    }
  };

  return (
    <>
      {!open && (
        <button className="bc-chat-fab" onClick={() => setOpen(true)} aria-label="Open chat">
          <MessageCircle className="bc-chat-fab__icn" size={18} />
          <span className="bc-chat-fab__label">Chat with Jam</span>
        </button>
      )}

      {open && (
        <div className="bc-chat-panel" role="dialog" aria-label="Chat with Jam">
          {/* Header */}
          <div className="bc-chat-head">
            <div className="bc-chat-head__left">
              <img src={jamyImg} alt="Jamilah Duarte" className="bc-chat-head__avatar" />
              <div className="bc-chat-head__text">
                <div className="bc-chat-head__title">Chat with Jam</div>
                <div className="bc-chat-head__status">
                  <span className="bc-online-dot" /> Online
                </div>
              </div>
            </div>
            <button className="bc-chat-head__close" onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="bc-chat-body">
            {msgs.map((m, i) => (
              <div key={i} className={`bc-chat-row ${m.from === "user" ? "user" : "bot"}`}>
                {m.from === "bot" && (
                  <img src={jamyImg} alt="Jam avatar" className="bc-chat-avatar" />
                )}
                <div className={`bc-chat-bubble ${m.from === "user" ? "is-user" : "is-bot"}`}>{m.text}</div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Composer */}
          <div className="bc-chat-input">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, MAX_LEN))}
              onKeyDown={onKeyDown}
              placeholder="Type a message…"
              rows={1}
            />
            <button className="bc-chat-send" onClick={sendMsg} aria-label="Send">
              <Send size={16} />
            </button>
          </div>

          <div className="bc-chat-meta">
            <span className="bc-chat-hint">Ask me about programming, web dev, or tech!</span>
            <span className="bc-chat-count">{input.length}/{MAX_LEN}</span>
          </div>
        </div>
      )}
    </>
  );
}


function App() {
  return (
    <div className="bc-bg">
      <div className="bc-main-layout">
        <aside className="bc-fixed-sidebar">
          <div className="bc-sidebar-content">
          <div className="bc-avatar">
            <img src={jamyImg} alt="Jamilah Marram Duarte" />
          </div>
            <h1 className="bc-name">
              Jamilah Duarte
              <span className="bc-verified" aria-label="Verified" title="Verified">
                <svg viewBox="0 0 24 24" className="bc-verified-icn" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" fill="#1da1f2" />
                  <path d="M16.5 9l-5.5 6-3-3" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </h1>
          
            {/* Typing Role Animation */}
            <div className="bc-role">
              <Typewriter
                words={[
                  'Computer Engineer',
                  'Web Developer',
                  'AI Developer',
                  'Automation Specialist',
                  'E-commerce Developer',
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1200}
              />
            </div>
            <p className="bc-loc"><MapPin size={20} strokeWidth={2} /> Davao City, Philippines</p>

            {/* <div className="bc-desc">
              I help businesses scale through E-commerce websites, AI agents, chatbots,
              automation, and computer vision tools.
            </div> */}

          <div className="bc-cta-row">
            <button type="button" className="bc-cta" onClick={openCalendly} aria-label="Schedule a call">
              <svg className="bc-cta-icn" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="5" width="18" height="16" rx="3" ry="3" fill="none" stroke="currentColor" strokeWidth="1.7"/>
                <path d="M8 3v4M16 3v4M3 9h18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
              </svg>
              <span className="bc-cta-label">Schedule a Call</span>
              <svg className="bc-cta-arrow" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="bc-cta-row bc-cta-row--spaced">
            <button
              type="button"
              className="bc-cta bc-cta--ghost"
              onClick={openGmailCompose}
              aria-label="Send email via Gmail"
            >
              <svg className="bc-cta-icn" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="3" fill="none" stroke="currentColor" strokeWidth="1.7"/>
                <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="bc-cta-label">Send Email</span>
              <svg className="bc-cta-arrow" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>


            

            <nav className="bc-section-nav">
              <a href="#about" className="active">About</a>
              <a href="#experience">Experience</a>
              <a href="#projects">Projects</a>
            </nav>

            <div className="bc-social-icons">
              <a
                href="https://github.com/JamDev15"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
              >
                <Github size={22} strokeWidth={2} />
              </a>

              <a
                href="https://www.linkedin.com/in/jamilah-marram-duarte-a51900259/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <Linkedin size={22} strokeWidth={2} />
              </a>

              <a
                href="https://instagram.com/yourinstagram"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
              >
                <Instagram size={22} strokeWidth={2} />
              </a>
            </div>
            </div>
        </aside>

        <main className="bc-content-column">
          <section id="about" className="bc-section">
            <div className="bc-card">
              <div className="bc-card-header">
                <span className="bc-card-icon" aria-hidden="true">
                  <Briefcase className="bc-card-icon-svg" size={16} strokeWidth={2} />
                </span>
                <h2 className="bc-section-title">About</h2>
              </div>

              <div className="bc-card-content">
                <p>Hi, I’m <strong>Jamilah Marram Duarte</strong> — Computer Engineer.</p>
                <p>
                  A Web Developer, Automation Specialist, E-commerce Developer, &amp; AI Developer.
                  I design and build websites, e-commerce platforms, and intelligent agents like chatbots
                  and computer vision tools that help businesses run smarter.
                  With a strong background in <strong>Shopify, WordPress, GoHighLevel (GHL), AI agents,</strong>
                  and automation tools, I combine creativity and technical expertise to deliver solutions
                  that don’t just look good — they solve problems.
                </p>
                <p>
                  My approach is simple: understand your goals, build with the right tools, and scale with your growth.
                </p>
              </div>
            </div>
          </section>

{/* ===== EXPERIENCE ===== */}
<section id="experience" className="bc-section">
  <div className="bc-card">
    <div className="bc-card-header">
        <span className="bc-card-icon" aria-hidden="true">
          <Briefcase className="bc-card-icon-svg" size={16} strokeWidth={2} />
        </span>
      <h2 className="bc-section-title">Experience</h2>
    </div>

    <div className="bc-card-content">
      {/* timeline rail + dots + right-side year pills */}
      <div className="bc-exp-list bc-timeline-compact">

        <div className="bc-exp-item" data-year="2025">
          <div className="bc-exp-date">Aug 2023 — Jan 2025</div>
          <b> AI Developer & Web Developer · Apeiron LLC</b>
          <p>Built custom chatbots, AI avatars, and text-to-speech bots on proprietary datasets; shipped high-performance websites, optimized content workflows, implemented a componentized UI system, and led site migrations/updates.</p>
          <div className="bc-exp-tags">
            <span>Python</span><span>NLP</span><span>LLM</span><span>RAG</span><span>REACT</span><span>Automation</span><span>API</span><span>HTML</span><span>CSS</span><span>JavaScript</span>
          </div>
        </div>

        <div className="bc-exp-item" data-year="2025">
          <div className="bc-exp-date">Sep 2023 — Mar 2025</div>
          <b>Web Developer · Sicuro Brand LLC</b>
          <p>Create and Maintained and set up Shopify Website &amp; Webflow sites; ensured brand consistency across pages and landing pages and optimized page speed and SEO basics.</p>
          <div className="bc-exp-tags">
            <span>Shopify</span><span>Liquid</span><span>CheckoutChamp</span><span>SEO</span><span>Performance</span><span>QA</span>
          </div>
        </div>

        <div className="bc-exp-item" data-year="2025">
          <div className="bc-exp-date">Sep 2024 — Feb 2025</div>
          <b>AI Developer &amp; Automation &amp; Web Developer · Tractive World</b>
          <p>Built AI/NLP solutions using OpenAI and Python LLMs—trading bots, sentiment analysis tools, and a deepfake demo—plus WordPress e-commerce builds for gym products.</p>
          <div className="bc-exp-tags">
            <span>Python</span><span>OpenAI</span><span>NLP</span><span>LLM</span><span>WordPress</span>
          </div>
        </div>

        <div className="bc-exp-item" data-year="2025">
          <div className="bc-exp-date">Oct 2024 — Jan 2025</div>
          <b>Web Developer · Uptown Printing</b>
          <p>Developed and maintained marketing sites and funnels on Flowtrack and GoHighLevel to streamline automation and improve user experience.</p>
          <div className="bc-exp-tags">
            <span>Flowtrack</span><span>GoHighLevel</span><span>Funnels</span><span>Automation</span>
          </div>
        </div>

        <div className="bc-exp-item" data-year="2024">
          <div className="bc-exp-date">Jul 2023 — Apr 2024</div>
          <b>AI &amp; Front-End Developer · HalalGrowth</b>
          <p>Built an AI Doctor clone chatbot with Python, TensorFlow, and Keras; integrated into a React web app with robust API integrations and cloud deployment.</p>
          <div className="bc-exp-tags">
            <span>Python</span><span>TensorFlow</span><span>Keras</span><span>React</span><span>APIs</span><span>Cloud</span>
          </div>
        </div>

        <div className="bc-exp-item" data-year="2022">
          <div className="bc-exp-date">Jul 2022 — Dec 2022</div>
          <b>E-commerce Developer · Caring Mothers</b>
          <p>Developed and maintained Shopify/CheckoutChamp stores, optimized landing &amp; product pages for conversions, and improved onsite UX.</p>
          <div className="bc-exp-tags">
            <span>Shopify</span><span>CheckoutChamp</span><span>Liquid</span><span>Conversion</span>
          </div>
        </div>

        {/* optional GoDaddy block kept commented */}
      </div>
    </div>
  </div>
</section>



{/* ===== PROJECTS ===== */}
<section id="projects" className="bc-section">
  <div className="bc-card">
    <div className="bc-card-header">
        <span className="bc-card-icon" aria-hidden="true">
          <Folder size={16} strokeWidth={2} />
          {/* or <FolderOpen /> / <FolderClosed /> */}
      </span>
      <h2 className="bc-section-title">Projects</h2>
    </div>

    <div className="bc-card-content">
      <div className="bc-projects-list">

        <div className="bc-project-item">
          <b>AI Doctor Chatbot</b> — Python, TensorFlow, and Keras chatbot for real-time health inquiries; integrated into a React web app with API orchestration and cloud deployment.
          <div className="bc-exp-tags">
            <span>Python</span><span>TensorFlow</span><span>Keras</span><span>React</span><span>APIs</span>
          </div>
        </div>

        <div className="bc-project-item">
          <b>Trading &amp; Sentiment Bots</b> — LLM-powered tools for market sentiment and basic trading automations using OpenAI APIs and Python.
          <div className="bc-exp-tags">
            <span>OpenAI</span><span>LLM</span><span>Python</span>
          </div>
        </div>

        <div className="bc-project-item">
          <b>Deepfake Demo Site</b> — Prototype demonstrating controlled media generation for research &amp; educational purposes with guardrails.
          <div className="bc-exp-tags">
            <span>AI</span><span>Computer Vision</span>
          </div>
        </div>

        <div className="bc-project-item">
          <b>Gym E-commerce Platform</b> — WordPress storefront with checkout customizations and product catalog management.
          <div className="bc-exp-tags">
            <span>WordPress</span><span>E-commerce</span>
          </div>
        </div>

        <div className="bc-project-item">
          <b>Shopify / CheckoutChamp Stores</b> — Conversion-focused product pages, landing pages, and theme tweaks to improve UX and AOV.
          <div className="bc-exp-tags">
            <span>Shopify</span><span>Liquid</span><span>CheckoutChamp</span>
          </div>
        </div>

        <div className="bc-project-item">
          <b>GHL &amp; Flowtrack Funnels</b> — Lead-gen funnels with automation, CRM integrations, and responsive page blocks.
          <div className="bc-exp-tags">
            <span>GoHighLevel</span><span>Flowtrack</span><span>Automation</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>


        </main>
        <FloatingChat /> {/* ← add this */}
      </div>
    </div>
  );
}

export default App;
