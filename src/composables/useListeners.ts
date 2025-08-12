import { gsap } from 'gsap'
import type { Card } from '@/types/game'
import { tileSize, canvasRef, drawBoard } from './useCanvas'

export function handleMouseMove(cards: Card[], cols: number) {
  return (e: MouseEvent) => {
    const rect = canvasRef.value!.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const col = Math.floor(mouseX / tileSize.value)
    const row = Math.floor(mouseY / tileSize.value)
    const index = row * cols + col

    cards.forEach((card, i) => {
      if (i === index) {
        const centerX = col * tileSize.value + tileSize.value / 2
        const centerY = row * tileSize.value + tileSize.value / 2
        const dx = (mouseX - centerX) / 20
        const dy = (mouseY - centerY) / 20

        gsap.to(card.parallaxOffset, {
          x: dx,
          y: dy,
          duration: 0.3,
          ease: 'power2.out',
          onUpdate: () => drawBoard(cards, cols, row + 1),
        })
      } else {
        gsap.to(card.parallaxOffset, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
          onUpdate: () => drawBoard(cards, cols, row + 1),
        })
      }
    })
  }
}
