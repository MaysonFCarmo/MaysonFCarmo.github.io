
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './ProjectLivePreview.css'

type ProjectLivePreviewProps = {
  url: string
  title: string
}

export default function ProjectLivePreview({
  url,
  title,
}: ProjectLivePreviewProps) {
  const [isOpen, setIsOpen] = useState(false)
  const openButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      openButtonRef.current?.focus()
    }
  }, [isOpen])

  return (
    <>
      <div className="live-preview-launcher">
        <div className="live-preview-icon">↗</div>

        <h3>Explore o {title}</h3>

        <p>
          Navegue pela aplicação real diretamente
          pelo portfólio.
        </p>


        <div className="demo-credentials">
          <strong>🔐 Acesso de demonstração</strong>

          <p>
            Utilize uma conta pública de teste para explorar
            os gráficos e indicadores do painel administrativo.
          </p>

          <div className="demo-credential-row">
            <span>Usuário:</span>
            <code>admin@test.com</code>
          </div>

          <div className="demo-credential-row">
            <span>Senha:</span>
            <code>test123</code>
          </div>

          <small>
            Ambiente destinado à demonstração do projeto.
          </small>
        </div>


        <button
          ref={openButtonRef}
          type="button"
          className="live-preview-open"
          onClick={() => setIsOpen(true)}
        >
          Abrir demonstração interativa
        </button>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="live-preview-external"
        >
          Abrir em nova aba ↗
        </a>
      </div>

      {isOpen && createPortal(
        <div
          className="live-preview-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`Demonstração de ${title}`}
        >
          <header className="live-preview-header">
            <div className="live-preview-heading">
              <strong>{title}</strong>
              <span>Demonstração interativa</span>
            </div>

            <div className="live-preview-actions">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Nova aba ↗
              </a>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar demonstração"
                autoFocus
              >
                ✕
              </button>
            </div>
          </header>

          <iframe
            src={url}
            title={`Aplicação ${title}`}
            className="live-preview-frame"
          />
        </div>,
        document.body
      )}
    </>
  )
}
