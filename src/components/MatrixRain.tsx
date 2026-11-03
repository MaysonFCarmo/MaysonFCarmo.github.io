
import { useEffect, useRef } from 'react'
import './MatrixRain.css'

type RainColumn = {
  x: number
  y: number
  speed: number
  length: number
  digits: string[]
}

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const motionPreference = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    const fontSize = 15
    const columnWidth = 25
    const lineHeight = 19
    const frameInterval = 1000 / 30

    let width = 0
    let height = 0
    let columns: RainColumn[] = []
    let animationId = 0
    let lastFrame = 0
    let lastMovement = 0
    let isLight = false

    const randomDigit = () =>
      Math.random() > 0.5 ? '1' : '0'

    const createColumn = (x: number): RainColumn => {
      const length = 8 + Math.floor(Math.random() * 17)

      return {
        x,
        y: -Math.random() * height,
        speed: 35 + Math.random() * 75,
        length,
        digits: Array.from(
          { length },
          randomDigit
        ),
      }
    }

    const updateTheme = () => {
      isLight =
        document.documentElement.dataset.theme === 'light'
    }

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return

      width = parent.clientWidth
      height = parent.clientHeight

      if (!width || !height) return

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      )

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const totalColumns = Math.ceil(
        width / columnWidth
      )

      columns = Array.from(
        { length: totalColumns },
        (_, index) => createColumn(
          index * columnWidth
        )
      )
    }

    const render = (timestamp: number) => {
      animationId = requestAnimationFrame(render)

      if (document.hidden) {
        lastMovement = timestamp
        return
      }

      if (timestamp - lastFrame < frameInterval) {
        return
      }

      const delta = lastMovement
        ? Math.min(
            (timestamp - lastMovement) / 1000,
            0.1
          )
        : 0

      lastFrame = timestamp
      lastMovement = timestamp

      ctx.clearRect(0, 0, width, height)

      ctx.font = `${fontSize}px monospace`
      ctx.textBaseline = 'top'

      const mainColor = isLight
        ? '37, 99, 235'
        : '57, 232, 124'

      const headColor = isLight
        ? '15, 65, 170'
        : '210, 255, 225'

      columns.forEach((column, index) => {
        column.y += column.speed * delta

        for (let i = 0; i < column.length; i++) {
          const y = column.y - i * lineHeight

          if (y < -lineHeight || y > height) {
            continue
          }

          // Troca números continuamente
          if (Math.random() < 0.18) {
            column.digits[i] = randomDigit()
          }

          const fade = 1 - i / column.length

          const opacity = Math.pow(fade, 1.8)

          ctx.fillStyle = `rgba(
            ${mainColor},
            ${0.08 + opacity * 0.85}
          )`

          ctx.fillText(
            column.digits[i],
            column.x,
            y
          )

          // Ponta brilhante
          if (i === 0) {
            ctx.fillStyle = `rgba(${headColor}, 0.95)`

            ctx.fillText(
              column.digits[i],
              column.x,
              y
            )
          }
        }

        // Reinicia a coluna em posição aleatória
        if (
          column.y -
          column.length * lineHeight > height
        ) {
          columns[index] = createColumn(column.x)
        }
      })
    }

    const startAnimation = () => {
      cancelAnimationFrame(animationId)

      lastFrame = 0
      lastMovement = 0

      ctx.clearRect(0, 0, width, height)

      if (!motionPreference.matches) {
        animationId = requestAnimationFrame(render)
      }
    }

    updateTheme()
    resizeCanvas()
    startAnimation()

    const resizeObserver = new ResizeObserver(
      resizeCanvas
    )

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement)
    }

    const themeObserver = new MutationObserver(() => {
      updateTheme()
      ctx.clearRect(0, 0, width, height)
    })

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    motionPreference.addEventListener(
      'change',
      startAnimation
    )

    return () => {
      cancelAnimationFrame(animationId)
      resizeObserver.disconnect()
      themeObserver.disconnect()

      motionPreference.removeEventListener(
        'change',
        startAnimation
      )
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="matrix-rain"
      aria-hidden="true"
    />
  )
}
