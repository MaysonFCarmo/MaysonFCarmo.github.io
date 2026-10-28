
import { useEffect, useState } from 'react'
import { projects } from './data/projects'
import './App.css'

const skills = [
  {
    title: 'Front-End',
    items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'TypeScript'],
  },
  {
    title: 'Back-End',
    items: ['Node.js', 'Python', 'PHP', 'Java', 'APIs REST'],
  },
  {
    title: 'Banco de Dados & Ferramentas',
    items: ['PostgreSQL', 'MySQL', 'Supabase', 'Git', 'GitHub'],
  },
]

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return localStorage.getItem('portfolio-theme') === 'light'
      ? 'light'
      : 'dark'
  })

  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(current => current === 'dark' ? 'light' : 'dark')
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site">
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#inicio" onClick={closeMenu}>
            M<span>.</span>Farias
          </a>

          <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Navegação principal">
            <a href="#sobre" onClick={closeMenu}>Sobre</a>
            <a href="#projetos" onClick={closeMenu}>Projetos</a>
            <a href="#habilidades" onClick={closeMenu}>Habilidades</a>
            <a href="#contato" onClick={closeMenu}>Contato</a>
          </nav>

          <div className="header-actions">
            <button
              className="theme-button"
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
              title="Alternar tema"
            >
              {theme === 'dark' ? '☀' : '☾'}
            </button>

            <button
              className="menu-button"
              type="button"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero container" id="inicio">
          <div className="hero-topline">
            <span className="eyebrow">DESENVOLVIMENTO DE SOFTWARE / PORTFÓLIO</span>
            <span className="hero-year">2026 — BRASIL</span>
          </div>

          <div className="hero-content">
            <div className="availability">
              <span className="status-dot" />
              Explorando oportunidades em desenvolvimento
            </div>

            <h1>
              Transformando <span>ideias</span>
              <br />
              em experiências
              <br />
              digitais<span className="period">.</span>
            </h1>

            <p className="hero-description">
              Olá, sou Mayson Farias. Profissional de tecnologia
              e estudante de Análise e Desenvolvimento de Sistemas,
              com foco em criar aplicações web funcionais,
              intuitivas e que resolvem problemas reais.
            </p>

            <div className="hero-buttons">
              <a className="button button-primary" href="#projetos">
                Explorar projetos <span aria-hidden="true">↗</span>
              </a>

              <a
                className="button button-outline"
                href="https://github.com/MaysonFCarmo"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="hero-bottom">
            <span>REACT / JAVASCRIPT / PYTHON / SQL</span>
            <a href="#sobre">ROLE PARA EXPLORAR ↓</a>
          </div>
        </section>

        <section className="section about-section" id="sobre">
          <div className="container section-grid">
            <div>
              <span className="section-kicker">01 / SOBRE MIM</span>
            </div>

            <div className="section-body">
              <h2>
                Tecnologia é sobre
                <span className="muted-heading"> resolver problemas.</span>
              </h2>

              <p>
                Minha trajetória na tecnologia começou com
                suporte a sistemas e resolução de problemas
                técnicos. Essa experiência fortaleceu minha
                capacidade analítica e minha visão sobre as
                necessidades reais dos usuários.
              </p>

              <p>
                Atualmente, direciono meus estudos e projetos
                para o desenvolvimento de aplicações web,
                trabalhando com interfaces, lógica de programação,
                APIs e bancos de dados.
              </p>

              <div className="about-facts">
                <div>
                  <span className="fact-label">FORMAÇÃO</span>
                  <strong>Análise e Desenvolvimento de Sistemas</strong>
                </div>
                <div>
                  <span className="fact-label">FOCO</span>
                  <strong>Desenvolvimento Web & Full Stack</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section projects-section" id="projetos">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="section-kicker">02 / TRABALHOS SELECIONADOS</span>
                <h2>Projetos<span className="period">.</span></h2>
              </div>

              <p>
                Aplicações que unem aprendizado, engenharia
                de software e soluções para problemas reais.
              </p>
            </div>

            <div className="projects-grid">
              {projects.filter(project => project.featured).map(project => (
                <article className="project-card" key={project.id}>
                  <div className={`project-visual visual-${project.id}`}>
                    <div className="project-visual-top">
                      <span>{project.number} / PROJETO</span>
                      <span className="visual-plus">✳</span>
                    </div>

                    <div className="project-visual-center">
                      <span className="project-symbol">
                        {project.id === 'conrapp' ? 'C/' : 'S/'}
                      </span>
                      <strong>{project.title}</strong>
                      <span>{project.category}</span>
                    </div>

                    <div className="project-visual-bottom">
                      <span>DESIGN & DEVELOPMENT</span>
                      <span>↗</span>
                    </div>
                  </div>

                  <div className="project-details">
                    <div className="project-title-row">
                      <h3>{project.title}</h3>
                      <span className="project-status">{project.status}</span>
                    </div>

                    <p>{project.description}</p>

                    <div className="tech-list">
                      {project.technologies.map(tech => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>

                    <div className="project-actions">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          Ver código ↗
                        </a>
                      )}
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          Demonstração ↗
                        </a>
                      )}
                      {!project.github && !project.demo && (
                        <span>Detalhes e demonstração em preparação</span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section skills-section" id="habilidades">
          <div className="container section-grid">
            <div>
              <span className="section-kicker">03 / CONHECIMENTOS</span>
            </div>

            <div className="section-body">
              <h2>
                Ferramentas que transformam
                <span className="muted-heading"> ideias em código.</span>
              </h2>

              <div className="skills-groups">
                {skills.map(group => (
                  <div className="skill-group" key={group.title}>
                    <h3>{group.title}</h3>

                    <div className="skills-tags">
                      {group.items.map(item => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contato">
          <div className="container">
            <span className="section-kicker">04 / CONTATO</span>
            <h2>
              Vamos construir
              <br />
              algo <span>incrível?</span>
            </h2>
            <p>
              Aberto a conexões, colaboração em projetos
              e oportunidades na área de desenvolvimento.
            </p>

            <div className="contact-links">
              <a
                className="button button-primary"
                href="https://www.linkedin.com/in/mayson-farias-44376826a/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Conectar no LinkedIn ↗
              </a>

              <a
                className="button button-outline"
                href="https://github.com/MaysonFCarmo"
                target="_blank"
                rel="noopener noreferrer"
              >
                Acessar GitHub ↗
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <a className="brand" href="#inicio">M<span>.</span>Farias</a>
          <span>© {new Date().getFullYear()} Mayson Farias</span>
          <a href="#inicio">VOLTAR AO TOPO ↑</a>
        </div>
      </footer>
    </div>
  )
}

export default App
