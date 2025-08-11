import { ref } from 'vue'
import { qualityGradients } from '@/data/qualityGradients'
import type { Card } from '@/types/game'

export const canvasRef = ref<HTMLCanvasElement | null>(null)
export const tileSize = ref(150)

const imageCache: Record<string, HTMLImageElement> = {}

export function drawBoard(cards: Card[], cols: number, rows: number) {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  cards.forEach((card, i) => {
    const col = i % cols
    const row = Math.floor(i / cols)
    const x = col * tileSize.value
    const y = row * tileSize.value

    const tilePadding = 8
    const tileX = x + tilePadding / 2 + (card.parallaxOffset?.x || 0)
    const tileY = y + tilePadding / 2 + (card.parallaxOffset?.y || 0)
    const tileW = tileSize.value - tilePadding
    const tileH = tileSize.value - tilePadding

    const gradient = ctx.createLinearGradient(tileX, tileY, tileX, tileY + tileH)
    const colors = card.matched
      ? qualityGradients[card.quality].active
      : qualityGradients[card.quality].inactive

    gradient.addColorStop(0, colors[0])
    gradient.addColorStop(1, colors[1])

    ctx.fillStyle = gradient
    ctx.fillRect(tileX, tileY, tileW, tileH)

    if (card.revealed || card.matched) {
      const img = imageCache[card.image]
      if (img && img.complete) {
        const scale = 1.1 // lub dynamicznie w zależności od parallaxOffset

        const offsetX = (tileW * (1 - scale)) / 2
        const offsetY = (tileH * (1 - scale)) / 2

        ctx.drawImage(
          img,
          tileX + 10 + offsetX + card.parallaxOffset.x,
          tileY + 10 + offsetY + card.parallaxOffset.y,
          (tileW - 20) * scale,
          (tileH - 20) * scale,
        )
      }
    } else {
      ctx.fillStyle = '#222'
      ctx.fillRect(tileX, tileY, tileW, tileH)
    }
  })
}

export function preloadImages(cards: Card[], drawCallback: () => void) {
  cards.forEach((card) => {
    if (!imageCache[card.image]) {
      const img = new Image()
      img.src = `${import.meta.env.BASE_URL}${card.image}`
      img.onload = drawCallback
      imageCache[card.image] = img
    }
  })
}

export function setCanvasSize(cols: number, rows: number) {
  if (!canvasRef.value) return
  tileSize.value = canvasRef.value.clientWidth / cols
  canvasRef.value.width = cols * tileSize.value
  canvasRef.value.height = rows * tileSize.value
}
