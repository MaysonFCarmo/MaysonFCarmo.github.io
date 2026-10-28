
export type Project = {
  id: string
  number: string
  title: string
  category: string
  description: string
  technologies: string[]
  status: string
  featured: boolean
  images: string[]
  github?: string
  demo?: string
}

export const projects: Project[] = [
  {
    id: 'conrapp',
    number: '01',
    title: 'CONRAPP',
    category: 'Plataforma Acadêmica · Desenvolvimento Web',
    description:
      'Comunidade acadêmica com calendário de eventos, ' +
      'discussões e interação entre estudantes e professores.',
    technologies: [
      'React',
      'JavaScript',
      'PostgreSQL',
      'UX/UI',
    ],
    status: 'Em desenvolvimento',
    featured: false,
    images: [],
  },
  {
    id: 'avali-plus',
    number: '01',
    title: 'Avali+',
    category: 'Aplicação Web · Pesquisa de Satisfação',
    description:
      'Sistema de pesquisas NPS, CSAT e CES com coleta ' +
      'de respostas, dashboard administrativo, gráficos ' +
      'interativos e integração com Supabase.',
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'React',
      'Supabase',
      'PostgreSQL',
      'ApexCharts',
    ],
    status: 'MVP desenvolvido',
    featured: true,
    images: [
      '/projects/avali-plus/01-inicio.webp.png',
      '/projects/avali-plus/02-csat.webp.png',
      '/projects/avali-plus/03-ces.webp.png',
      '/projects/avali-plus/04-nps.webp.png',
      '/projects/avali-plus/05-comentario.webp.png',
      '/projects/avali-plus/06-conclusao.webp.png',
      '/projects/avali-plus/07-login.webp.png',
      '/projects/avali-plus/08-dashboard.webp.png',
      '/projects/avali-plus/09-indicadores.webp.png',
    ],
    github: 'https://github.com/MaysonFCarmo/Avali-plus',
    demo: 'https://maysonfcarmo.github.io/Avali-plus/',
  },
]
