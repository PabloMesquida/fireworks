import { useMemo } from 'react'
import { Spherical, Vector3 } from 'three'

function usePositionSizeAndTimeArrays(count, radius, position, trailLength) {
  return useMemo(() => {
    const positionsArray = new Float32Array(count * trailLength * 3)
    const sizesArray = new Float32Array(count * trailLength)
    const timeMultipliersArray = new Float32Array(count * trailLength)
    const trailOffsetsArray = new Float32Array(count * trailLength)

    const spherical = new Spherical()
    const pos = new Vector3(...position)

    for (let i = 0; i < count; i++) {
      // const i3 = i * 3

      // Generar la posición original de la partícula
      spherical.radius = radius * (0.65 + Math.random() * 0.35)
      spherical.phi = Math.random() * Math.PI
      spherical.theta = Math.random() * Math.PI * 2

      pos.setFromSpherical(spherical)

      const originalX = pos.x
      const originalY = pos.y
      const originalZ = pos.z

      for (let j = 0; j < trailLength; j++) {
        const trailIndex = (i * trailLength + j) * 3

        // Asignar la misma posición inicial para todas las partículas del trail
        positionsArray[trailIndex] = originalX
        positionsArray[trailIndex + 1] = originalY
        positionsArray[trailIndex + 2] = originalZ

        sizesArray[i * trailLength + j] = Math.random() * 1.5

        timeMultipliersArray[i * trailLength + j] = 1 + Math.random()

        // Ajustar el trailOffset para que estén más pegadas a la original
        trailOffsetsArray[i * trailLength + j] = (j / trailLength) * 0.05 // Pequeño desplazamiento temporal
      }
    }

    return { positionsArray, sizesArray, timeMultipliersArray, trailOffsetsArray }
  }, [count, radius, position, trailLength])
}

export default usePositionSizeAndTimeArrays
