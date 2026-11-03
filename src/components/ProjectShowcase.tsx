
import { useState } from 'react'
import ProjectCarousel from './ProjectCarousel'
import ProjectLivePreview from './ProjectLivePreview'
import './ProjectShowcase.css'

type ProjectShowcaseProps = {
  images: string[]
  title: string
  demo?: string
}

export default function ProjectShowcase({
  images,
  title,
  demo,
}: ProjectShowcaseProps) {
  const [mode, setMode] = useState<'gallery' | 'live'>('gallery')

  return (
    <div className="project-showcase">
      <div
        className="showcase-tabs"
        aria-label="Visualização do projeto"
      >
        <button
          type="button"
          className={mode === 'gallery' ? 'active' : ''}
          onClick={() => setMode('gallery')}
          aria-pressed={mode === 'gallery'}
        >
          Galeria
        </button>

        {demo && (
          <button
            type="button"
            className={mode === 'live' ? 'active' : ''}
            onClick={() => setMode('live')}
            aria-pressed={mode === 'live'}
          >
            Demonstração ao vivo
          </button>
        )}
      </div>

      {mode === 'live' && demo ? (
        <ProjectLivePreview url={demo} title={title} />
      ) : (
        <ProjectCarousel images={images} title={title} />
      )}
    </div>
  )
}
