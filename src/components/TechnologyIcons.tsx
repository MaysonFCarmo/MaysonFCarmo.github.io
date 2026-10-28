import './TechnologyIcons.css'
type TechnologyIconsProps = {
  technologies: string[]
}

const icons: Record<string, string> = {
  React: 'react',
  JavaScript: 'javascript',
  TypeScript: 'typescript',
  HTML5: 'html5',
  CSS3: 'css3',
  Supabase: 'supabase',
  PostgreSQL: 'postgresql',
  'Node.js': 'nodejs',
  Python: 'python',
  Java: 'java',
  Git: 'git',
  GitHub: 'github',
}

export default function TechnologyIcons({
  technologies,
}: TechnologyIconsProps) {
  return (
    <div className="technology-icons">
      {technologies.map(technology => {
        const icon = icons[technology]

        return (
          <div
            key={technology}
            className="technology-icon"
            title={technology}
            aria-label={technology}
          >
            {icon ? (
              <img
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${icon}-original.svg`}
                alt={technology}
                width="32"
                height="32"
                loading="lazy"
              />
            ) : (
              <span className="technology-fallback">
                {technology === 'ApexCharts'
                  ? 'APX'
                  : technology.slice(0, 3)}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
