import { useMemo } from 'react'
import { Vector3 } from 'three'

function usePositionSizeAndTimeArrays(count, radius, position, trailLength) {
  return useMemo(() => {
    const positionsArray = new Float32Array(count * trailLength * 3)
    const sizesArray = new Float32Array(count * trailLength)
    const timeMultipliersArray = new Float32Array(count * trailLength)
    const trailOffsetsArray = new Float32Array(count * trailLength)

    const pos = new Vector3(...position)

    // Generar posiciones de partículas utilizando Fibonacci Sphere
    for (let i = 0; i < count; i++) {
      const index = i + 0.5 // Ajuste de índice para la distribución uniforme
      const phi = Math.acos(1 - 2 * index / count) // Ángulo polar
      const theta = Math.PI * (1 + Math.sqrt(5)) * index // Ángulo azimutal

      const randomRadius = radius * (0.8 + Math.random() * 0.2) // Aleatoriedad entre 0.8 y 1.0 del radio original

      let x = randomRadius * Math.sin(phi) * Math.cos(theta)
      let y = randomRadius * Math.sin(phi) * Math.sin(theta)
      let z = randomRadius * Math.cos(phi)

      // Añadir un pequeño desplazamiento aleatorio para mayor aleatoriedad
      const randomnessFactor = 0.2 * radius // Factor de aleatoriedad adicional
      x += (Math.random() - 0.5) * randomnessFactor
      y += (Math.random() - 0.5) * randomnessFactor
      z += (Math.random() - 0.5) * randomnessFactor

      const originalX = pos.x + x
      const originalY = pos.y + y
      const originalZ = pos.z + z

      for (let j = 0; j < trailLength; j++) {
        const trailIndex = (i * trailLength + j) * 3

        // Asignar la misma posición inicial para todas las partículas del trail
        positionsArray[trailIndex] = originalX
        positionsArray[trailIndex + 1] = originalY - 3
        positionsArray[trailIndex + 2] = originalZ

        // Generar tamaños más pequeños aleatoriamente para las partículas del trail
        const baseSize = 1.0 // Tamaño base para la partícula original
        const trailSize = baseSize * (1.0 - (j / trailLength)) * (0.5 + Math.random() * 0.5)
        sizesArray[i * trailLength + j] = trailSize

        // Ajustar el tiempo multiplicador para todas las partículas del trail
        timeMultipliersArray[i * trailLength + j] = 1 // Todas las partículas tienen el mismo tiempo multiplicador

        // Ajustar el trailOffset para que las partículas se detengan progresivamente antes
        trailOffsetsArray[i * trailLength + j] = j / (trailLength + Math.random() * 12) // Ajusta la distancia de las partículas del trail
      }
    }

    return { positionsArray, sizesArray, timeMultipliersArray, trailOffsetsArray }
  }, [count, radius, position, trailLength])
}

export default usePositionSizeAndTimeArrays
