
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './ProjectCarousel.css'

type ProjectCarouselProps = {
  images: string[]
  title: string
}

export default function ProjectCarousel({
  images,
  title,
}: ProjectCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const total = images.length

  const nextImage = () => {
    if (total > 0) {
      setCurrent(prev => (prev + 1) % total)
    }
  }

  const previousImage = () => {
    if (total > 0) {
      setCurrent(prev => (prev - 1 + total) % total)
    }
  }

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }

      if (event.key === 'ArrowRight' && total > 0) {
        setCurrent(prev => (prev + 1) % total)
      }

      if (event.key === 'ArrowLeft' && total > 0) {
        setCurrent(prev => (prev - 1 + total) % total)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, total])

  if (total === 0) {
    return (
      <div className="carousel-empty">
        Imagens em preparação
      </div>
    )
  }

  return (
    <>
      <div
        className="project-carousel"
        role="region"
        aria-label={`Galeria do projeto ${title}`}
      >
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div className="carousel-slide" key={image}>
              <button
                type="button"
                className="carousel-image-button"
                onClick={() => {
                  setCurrent(index)
                  setIsOpen(true)
                }}
                aria-label={`Ampliar imagem ${index + 1} de ${title}`}
              >
                <img
                  src={image}
                  alt={`${title} - Tela ${index + 1}`}
                  loading="lazy"
                />
              </button>
            </div>
          ))}
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              className="carousel-arrow carousel-prev"
              onClick={previousImage}
              aria-label="Imagem anterior"
            >
              &#10094;
            </button>

            <button
              type="button"
              className="carousel-arrow carousel-next"
              onClick={nextImage}
              aria-label="Próxima imagem"
            >
              &#10095;
            </button>

            <div className="carousel-bottom">
              <div className="carousel-dots">
                {images.map((image, index) => (
                  <button
                    type="button"
                    key={image}
                    className={
                      index === current
                        ? 'carousel-dot active'
                        : 'carousel-dot'
                    }
                    onClick={() => setCurrent(index)}
                    aria-label={`Mostrar imagem ${index + 1}`}
                    aria-current={
                      current === index
                        ? 'true'
                        : undefined
                    }
                  />
                ))}
              </div>

              <span className="carousel-counter">
                {String(current + 1).padStart(2, '0')}
                {' / '}
                {String(total).padStart(2, '0')}
              </span>
            </div>
          </>
        )}
      </div>

      {isOpen && createPortal(
        <div
          className="carousel-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Visualização ampliada de ${title}`}
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setIsOpen(false)}
            aria-label="Fechar visualização"
            autoFocus
          >
            ×
          </button>

          <div
            className="lightbox-content"
            onClick={event => event.stopPropagation()}
          >
            <img
              src={images[current]}
              alt={`${title} - Imagem ampliada ${current + 1}`}
              className="lightbox-image"
            />

            <span className="lightbox-counter">
              {String(current + 1).padStart(2, '0')}
              {' / '}
              {String(total).padStart(2, '0')}
            </span>
          </div>

          {total > 1 && (
            <>
              <button
                type="button"
                className="lightbox-arrow lightbox-prev"
                onClick={event => {
                  event.stopPropagation()
                  previousImage()
                }}
                aria-label="Imagem anterior"
              >
                &#10094;
              </button>

              <button
                type="button"
                className="lightbox-arrow lightbox-next"
                onClick={event => {
                  event.stopPropagation()
                  nextImage()
                }}
                aria-label="Próxima imagem"
              >
                &#10095;
              </button>
            </>
          )}
        </div>,
        document.body
      )}
    </>
  )
}
