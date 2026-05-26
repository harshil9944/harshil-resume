import { useState, useEffect } from 'react'
import './App.css'
import { portfolioConfigs } from './portfolioConfig'

// Sidebar navigation items — `id` matches the section rendered in the main area.
const NAV_ITEMS = [
  {
    id: 'home',
    label: 'Home',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 12L12 3l9 9" />
        <path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" />
      </svg>
    ),
  },
  {
    id: 'about',
    label: 'About',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: 'education',
    label: 'Education',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    id: 'research',
    label: 'Research',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    id: 'certification',
    label: 'Certification',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 6l-10 7L2 6" />
      </svg>
    ),
  },
]

function ThemeToggle({ theme, onToggle, className = '' }) {
  return (
    <button
      className={`theme-toggle ${className}`}
      onClick={onToggle}
      aria-label="Toggle light and dark theme"
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}

function App({ careerPath = 'aie' }) {
  const config = portfolioConfigs[careerPath]
  const [activeSection, setActiveSection] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [toast, setToast] = useState({ show: false, message: '' })

  // Apply + persist the theme.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  const selectSection = (id) => {
    setActiveSection(id)
    setSidebarOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const content = document.querySelector('.content')
    if (content) content.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const copyEmail = () => {
    navigator.clipboard.writeText('harshilcpatel9944@gmail.com')
    setToast({ show: true, message: 'Email copied to clipboard!' })
    setTimeout(() => setToast({ show: false, message: '' }), 3000)
  }

  const shareOn = (platform) => {
    const url = window.location.href
    const title = `Check out Harshil Patel's ${config.title} Portfolio`

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
      sms: `sms:?body=${encodeURIComponent(title + ' ' + url)}`,
      instagram: `https://www.instagram.com/`,
    }

    if (platform === 'instagram') {
      window.open(shareUrls.instagram, '_blank')
    } else if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400')
    }
  }

  const initials = config.hero.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="hero">
            <div className="hero-glow" aria-hidden="true" />
            <p className="hero-eyebrow">{config.hero.eyebrow}</p>
            <h1 className="hero-name">
              Hi, I&apos;m <span className="hero-name-accent">{config.hero.name.split(' ')[0]}</span>.
            </h1>
            <p className="hero-subtitle">{config.hero.subtitle}</p>
            <div className="hero-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => selectSection('projects')}
              >
                {config.hero.cta}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => selectSection('contact')}
              >
                Get in touch
              </button>
            </div>
            <div className="hero-meta">
              <div className="hero-meta-item">
                <span className="hero-meta-label">Role</span>
                <span className="hero-meta-value">{config.hero.meta}</span>
              </div>
              <div className="hero-meta-item">
                <span className="hero-meta-label">Focus</span>
                <span className="hero-meta-value">{config.focus}</span>
              </div>
            </div>
          </div>
        )

      case 'about':
        return (
          <>
            <h2>About</h2>
            <p className="lead">{config.hero.subtitle}</p>
            <p>{config.about}</p>
          </>
        )

      case 'skills':
        return (
          <>
            <h2>Skills</h2>
            <div className="pill-grid">
              {config.skills.map((skill, index) => (
                <span key={index} className="pill">{skill}</span>
              ))}
            </div>
          </>
        )

      case 'education':
        return (
          <>
            <h2>Education</h2>
            <div className="timeline">
              <article className="timeline-item">
                <header>
                  <div>
                    <h3>Master of Science in Applied Artificial Intelligence</h3>
                    <p className="muted">Stevens Institute of Technology, New Jersey, USA</p>
                  </div>
                  <p className="muted">GPA: 3.75/4.0</p>
                </header>
                <p>
                  Advanced coursework in cutting-edge AI and machine learning techniques with focus on deep learning,
                  pattern recognition, and practical optimization methods.
                </p>
                <ul>
                  <li>Deep Learning</li>
                  <li>Machine Learning</li>
                  <li>Applied Modelling and Optimization</li>
                  <li>Pattern Recognition and Classification</li>
                  <li>Data Structures and Algorithms</li>
                  <li>Probability and Statistics</li>
                  <li>Linear Algebra</li>
                </ul>
              </article>

              <article className="timeline-item">
                <header>
                  <div>
                    <h3>Bachelor of Technology in Computer Engineering</h3>
                    <p className="muted">Dharmsinh Desai University, India</p>
                  </div>
                  <p className="muted">CGPA: 7.5/10</p>
                </header>
                <p>
                  Comprehensive foundational engineering education with specialized focus on data structures, algorithms,
                  machine learning, and cloud computing technologies.
                </p>
                <ul>
                  <li>Data Structures and Algorithms</li>
                  <li>Database Management System</li>
                  <li>Design and Analysis of Algorithms</li>
                  <li>Software Engineering Practices</li>
                  <li>Advanced Algorithms</li>
                  <li>Machine Learning</li>
                  <li>Artificial Intelligence</li>
                  <li>Image Processing</li>
                  <li>Big Data Analytics</li>
                  <li>Cloud Computing</li>
                </ul>
              </article>
            </div>
          </>
        )

      case 'experience':
        return (
          <>
            <h2>Experience</h2>
            <div className="timeline">
              {config.experience && config.experience.length > 0 ? (
                config.experience.map((job, index) => (
                  <article className="timeline-item" key={index}>
                    <header>
                      <div>
                        <h3>{job.title}</h3>
                        <p className="muted">{job.organization}</p>
                      </div>
                      <p className="muted">{job.date}</p>
                    </header>
                    {job.description && <p>{job.description}</p>}
                    {job.highlights && (
                      <ul>
                        {job.highlights.map((highlight, i) => (
                          <li key={i}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                ))
              ) : (
                <article className="timeline-item">
                  <header>
                    <div>
                      <h3>Research Intern</h3>
                      <p className="muted">Bhaskaracharya Institute of Space Applications and Geo-informatics · Internship</p>
                    </div>
                    <p className="muted">Dec 2022 — Apr 2023</p>
                  </header>
                  <ul>
                    <li>
                      Developed a noise reduction model for audio signals using deep learning, sourcing diverse audio samples
                      and converting them into spectrograms for analysis with Python and TensorFlow.
                    </li>
                    <li>
                      Designed and trained a U-Net convolutional neural network with dropout layers, achieving a training loss
                      of 0.002129 and validation loss of 0.002406 while preserving audio quality.
                    </li>
                    <li>
                      Utilized large-scale distributed training strategies for model optimization, ensuring efficient processing
                      across diverse datasets.
                    </li>
                  </ul>
                </article>
              )}
            </div>
          </>
        )

      case 'projects':
        return (
          <>
            <h2>Projects</h2>
            <div className="grid">
              {config.projects && config.projects.length > 0 ? (
                config.projects.map((project, index) => (
                  <article className="card" key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                    <h3>{project.title}</h3>
                    <p className="muted">{project.description}</p>
                    <p className="tagline">{project.technologies}</p>
                    {project.links && project.links.length > 0 && (
                      <div className="card-links">
                        {project.links.map((link, linkIndex) => (
                          <a key={linkIndex} href={link.url} target="_blank" rel="noreferrer">
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </article>
                ))
              ) : (
                <>
                  <article className="card" style={{ animationDelay: '0s' }}>
                    <h3>Customer Lifetime Value Prediction</h3>
                    <p className="muted">
                      Analyzed transactional data and engineered RFM (Recency, Frequency, Monetary) features. Applied K-Means
                      clustering to segment customers into value tiers and built an XGBoost model achieving 96% prediction accuracy.
                      Implemented custom CUDA kernels for 10x inference speed improvement.
                    </p>
                    <p className="tagline">Python · XGBoost · CUDA · Machine Learning</p>
                    <div className="card-links">
                      <a href="#" target="_blank" rel="noreferrer">GitHub</a>
                    </div>
                  </article>

                  <article className="card" style={{ animationDelay: '0.1s' }}>
                    <h3>Fraud Detection Using Machine Learning</h3>
                    <p className="muted">
                      Analyzed and validated financial transaction data to identify fraud patterns. Experimented with multiple ML
                      algorithms (Naive Bayes, Random Forest, Logistic Regression). Successfully deployed Random Forest model achieving
                      99.5% accuracy in detecting fraudulent transactions.
                    </p>
                    <p className="tagline">Python · Random Forest · Data Analysis</p>
                    <div className="card-links">
                      <a href="#" target="_blank" rel="noreferrer">GitHub</a>
                    </div>
                  </article>

                  <article className="card" style={{ animationDelay: '0.2s' }}>
                    <h3>Seizure Prediction Using CNNs</h3>
                    <p className="muted">
                      Developed a hybrid CNN and self-attention model for early prediction of epileptic seizures using EEG signals.
                      Research paper exploring novel techniques for seizure prediction to improve patient outcomes and enable
                      preventive interventions.
                    </p>
                    <p className="tagline">Python · TensorFlow · Deep Learning · Research</p>
                    <div className="card-links">
                      <a href="#" target="_blank" rel="noreferrer">GitHub</a>
                    </div>
                  </article>
                </>
              )}
            </div>
          </>
        )

      case 'research':
        return (
          <>
            <h2>Research</h2>
            <div className="timeline">
              <article className="timeline-item">
                <header>
                  <div>
                    <h3>A Novel Seizure Prediction Technique Using CNNs and Self-Attention</h3>
                    <p className="muted">Yet to be Published</p>
                  </div>
                </header>
                <p>
                  Developed a hybrid CNN and self-attention model for early prediction of epileptic seizures using EEG signals.
                  This research explores innovative deep learning architectures to improve seizure prediction accuracy and enable
                  preventive interventions for patients with epilepsy.
                </p>
                <ul>
                  <li>
                    Designed a hybrid architecture combining convolutional neural networks with self-attention mechanisms to capture
                    both spatial and temporal patterns in EEG signals.
                  </li>
                  <li>
                    Achieved superior performance in seizure prediction compared to traditional machine learning approaches.
                  </li>
                  <li>
                    Demonstrates the potential for early intervention strategies that could significantly improve patient quality of life.
                  </li>
                </ul>
              </article>
            </div>
          </>
        )

      case 'certification':
        return (
          <>
            <h2>Certification</h2>
            <div className="timeline">
              <article className="timeline-item">
                <header>
                  <div>
                    <h3>AWS Certified AI Practitioner</h3>
                    <p className="muted">Amazon Web Services</p>
                  </div>
                </header>
                <p>
                  Proficient in applying AI/ML fundamentals, responsible AI practices, and leveraging AWS AI services
                  to design data-driven solutions.
                </p>
                <ul>
                  <li>Comprehensive understanding of AI/ML concepts and best practices.</li>
                  <li>Expertise in AWS AI services including SageMaker, Rekognition, and other AI/ML tools.</li>
                  <li>Knowledge of responsible AI principles and ethical considerations in AI deployment.</li>
                </ul>
              </article>
            </div>
          </>
        )

      case 'contact':
        return (
          <>
            <h2>Contact</h2>
            <div className="contact-grid">
              <div className="contact-card">
                <h3>Get in Touch</h3>
                <p className="muted">
                  Interested in collaborating or discussing opportunities? Let&apos;s connect!
                </p>
                <div className="footer-email-container">
                  <a href="mailto:harshilcpatel9944@gmail.com" className="footer-email">
                    harshilcpatel9944@gmail.com
                  </a>
                  <button
                    className="copy-email-btn"
                    onClick={copyEmail}
                    aria-label="Copy email"
                    title="Copy email to clipboard"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="contact-card">
                <h3>Connect</h3>
                <div className="social-links">
                  <a href="https://www.linkedin.com/in/harshilp9/" target="_blank" rel="noreferrer" title="LinkedIn" className="social-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.047-8.814 0-9.752h3.554v1.381c.43-.664 1.202-1.609 2.923-1.609 2.136 0 3.74 1.393 3.74 4.385v5.596zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.953.77-1.715 1.958-1.715 1.187 0 1.914.762 1.932 1.715 0 .953-.745 1.715-1.975 1.715zm1.946 11.597H3.392V9.1h3.891v11.352zM23.995 0H.005C.002 0 0 .007 0 .016v23.968C0 23.993.002 24 .005 24h23.99c.003 0 .005-.007.005-.016V.016C24 .007 23.998 0 23.995 0z" /></svg>
                  </a>
                  <a href="https://github.com/harshil9944" target="_blank" rel="noreferrer" title="GitHub" className="social-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  </a>
                  <a href="https://www.harshilcpatel.site" target="_blank" rel="noreferrer" title="Website" className="social-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="contact-card">
                <h3>Share</h3>
                <div className="share-buttons">
                  <button onClick={() => shareOn('linkedin')} className="share-btn share-linkedin" title="Share on LinkedIn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.047-8.814 0-9.752h3.554v1.381c.43-.664 1.202-1.609 2.923-1.609 2.136 0 3.74 1.393 3.74 4.385v5.596zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.953.77-1.715 1.958-1.715 1.187 0 1.914.762 1.932 1.715 0 .953-.745 1.715-1.975 1.715zm1.946 11.597H3.392V9.1h3.891v11.352zM23.995 0H.005C.002 0 0 .007 0 .016v23.968C0 23.993.002 24 .005 24h23.99c.003 0 .005-.007.005-.016V.016C24 .007 23.998 0 23.995 0z" /></svg>
                  </button>
                  <button onClick={() => shareOn('whatsapp')} className="share-btn share-whatsapp" title="Share on WhatsApp" aria-label="Share on WhatsApp">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.52 3.48A11.86 11.86 0 0 0 12 0C5.373 0 0 5.373 0 12a11.9 11.9 0 0 0 1.65 6.01L0 24l6.24-1.62A11.89 11.89 0 0 0 12 24c6.627 0 12-5.373 12-12 0-3.2-1.25-6.2-3.48-8.52zM12 21.9a9.9 9.9 0 0 1-5.17-1.43l-.37-.22-3.7.96.98-3.6-.24-.37A9.9 9.9 0 1 1 12 21.9z" />
                      <path d="M17.5 14.39c-.27-.14-1.6-.79-1.85-.88-.24-.09-.42-.14-.6.12-.18.27-.7.88-.86 1.06-.16.18-.34.2-.63.07-.29-.13-1.23-.45-2.34-1.44-.87-.76-1.45-1.7-1.62-1.99-.17-.29-.02-.45.13-.59.13-.13.29-.33.43-.5.14-.17.18-.29.27-.48.09-.19.05-.37-.02-.51-.08-.14-.68-1.63-.93-2.24-.24-.59-.49-.51-.63-.51-.16 0-.35-.01-.53-.01-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.27s.98 2.63 1.12 2.81c.14.18 1.93 2.95 4.68 4.24 1.94.9 2.7.98 3.07.92.37-.06 1.2-.49 1.37-.97.17-.48.17-.9.12-1 .05-.1.17-.21.27-.34.1-.14.3-.18.57-.32.28-.14 1.6-.73 1.83-.82.23-.09.39-.14.44-.23.05-.09.05-.67-.22-.8z" />
                    </svg>
                  </button>
                  <button onClick={() => shareOn('sms')} className="share-btn share-sms" title="Share via Text">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                  </button>
                  <button onClick={() => shareOn('instagram')} className="share-btn share-instagram" title="Follow on Instagram">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </>
        )

      default:
        return null
    }
  }

  return (
    <div className="layout">
      {/* Toast Notification */}
      {toast.show && (
        <div className="toast">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Mobile top bar */}
      <header className="topbar">
        <button
          className="hamburger"
          onClick={() => setSidebarOpen((o) => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={sidebarOpen}
        >
          <span className={sidebarOpen ? 'open' : ''}></span>
          <span className={sidebarOpen ? 'open' : ''}></span>
          <span className={sidebarOpen ? 'open' : ''}></span>
        </button>
        <span className="topbar-name">{config.hero.name}</span>
        <ThemeToggle theme={theme} onToggle={toggleTheme} className="topbar-toggle" />
      </header>

      {/* Backdrop for mobile drawer */}
      {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-profile">
          <div className="avatar">{initials}</div>
          <h1 className="profile-name">{config.hero.name}</h1>
          <p className="profile-role">{config.title}</p>
          <p className="profile-tagline">{config.hero.subtitle}</p>
        </div>

        <nav className="sidebar-nav" aria-label="Sections">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              aria-current={activeSection === item.id ? 'page' : undefined}
              onClick={() => selectSection(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <div className="sidebar-socials">
            <a href="https://www.linkedin.com/in/harshilp9/" target="_blank" rel="noreferrer" title="LinkedIn" className="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.047-8.814 0-9.752h3.554v1.381c.43-.664 1.202-1.609 2.923-1.609 2.136 0 3.74 1.393 3.74 4.385v5.596zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.953.77-1.715 1.958-1.715 1.187 0 1.914.762 1.932 1.715 0 .953-.745 1.715-1.975 1.715zm1.946 11.597H3.392V9.1h3.891v11.352zM23.995 0H.005C.002 0 0 .007 0 .016v23.968C0 23.993.002 24 .005 24h23.99c.003 0 .005-.007.005-.016V.016C24 .007 23.998 0 23.995 0z" /></svg>
            </a>
            <a href="https://github.com/harshil9944" target="_blank" rel="noreferrer" title="GitHub" className="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            </a>
            <a href="https://www.harshilcpatel.site" target="_blank" rel="noreferrer" title="Website" className="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </a>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="content">
        <section className="panel" key={activeSection}>
          {renderSection()}
        </section>
        <p className="content-footer muted">
          © {new Date().getFullYear()} Harshil Patel. Built with React &amp; Vite.
        </p>
      </main>
    </div>
  )
}

export default App
