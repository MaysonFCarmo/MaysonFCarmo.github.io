
export type Project = {
  id: string
  number: string
  title: string
  category: string
  description: string
  technologies: string[]
  status: string
  featured: boolean
  github?: string
  demo?: string
}

export const projects: Project[] = [
  {
    id: 'conrapp',
    number: '01',
    title: 'CONRAPP',
    category: 'Plataforma Web · Full Stack',
    description:
      'Comunidade acadêmica que reúne eventos, discussões, ' +
      'interações entre estudantes e professores em um só ambiente.',
    technologies: [
      'React',
      'JavaScript',
      'PostgreSQL',
      'UX/UI',
    ],
    status: 'Em desenvolvimento',
    featured: true,
  },
  {
    id: 'support-analytics',
    number: '02',
    title: 'Support Analytics',
    category: 'Aplicação Web · Data Analytics',
    description:
      'Plataforma de pesquisa de satisfação com métricas NPS, ' +
      'CES e CSAT, análise de resultados e dashboard interativo.',
    technologies: [
      'React',
      'JavaScript',
      'Supabase',
      'PostgreSQL',
    ],
    status: 'MVP desenvolvido',
    featured: true,
  },
]
