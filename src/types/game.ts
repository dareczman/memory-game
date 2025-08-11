export interface Card {
  id: number
  image: string
  revealed: boolean
  matched: boolean
  quality: WeaponQuality
  parallaxOffset: { x: number; y: number }
}

type WeaponQuality = 'ancient' | 'common' | 'immortal' | 'legendary' | 'rare'

export type Weapon = {
  quality: WeaponQuality
  name: string
}
