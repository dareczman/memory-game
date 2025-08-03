import { shuffle } from '@/utils/shuffleArray'
import { allWeapons } from '@/data/weapons'
import type { Card } from '@/types/game'

export function generateShuffledCards(rows: number, cols: number): Card[] {
  const totalCards = rows * cols
  const uniqueCount = totalCards / 2
  const shuffledWeapons = [...allWeapons]
  shuffle(shuffledWeapons)

  const selectedWeapons = shuffledWeapons.slice(0, uniqueCount)
  const images = [...selectedWeapons, ...selectedWeapons]
  shuffle(images)

  return images.map((img, index) => ({
    id: index,
    image: `/images/weapons/${img.quality}/${img.name}.webp`,
    revealed: false,
    matched: false,
    quality: img.quality,
    parallaxOffset: { x: 0, y: 0 },
  }))
}
