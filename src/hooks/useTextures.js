import { useMemo } from 'react'
import { TextureLoader } from 'three'
import { useLoader } from '@react-three/fiber'

function useTextures() {
  const textures = useLoader(TextureLoader, [
    '/particles/1.png',
    '/particles/3.png',
    '/particles/4.png',
    '/particles/5.png',
    '/particles/6.png'
  ])

  return useMemo(() => textures, [textures])
}

export default useTextures
