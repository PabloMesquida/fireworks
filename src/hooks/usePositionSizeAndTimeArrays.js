import { useMemo } from 'react'
import { Vector3, Spherical } from 'three'

function usePositionSizeAndTimeArrays(count, radius, trailLength) {
  return useMemo(() => {
    const positionsArray = new Float32Array(count * trailLength * 3)
    const sizesArray = new Float32Array(count * trailLength)
    const timeMultipliersArray = new Float32Array(count * trailLength)
    const trailOffsetsArray = new Float32Array(count * trailLength)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Generar valores esféricos uniformemente distribuidos
      const theta = Math.acos(2 * Math.random() - 1) // phi: ángulo polar
      const phi = Math.random() * Math.PI * 2 // theta: ángulo azimutal

      // Mantener el radio como en el código original
      const spherical = new Spherical(
        radius * (0.75 + Math.random() * 0.25),
        theta,
        phi
      )

      const position = new Vector3()
      position.setFromSpherical(spherical)

      positionsArray[i3] = position.x
      positionsArray[i3 + 1] = position.y
      positionsArray[i3 + 2] = position.z

      for (let j = 0; j < trailLength; j++) {
        const trailIndex = (i * trailLength + j) * 3

        // Asignar la misma posición inicial para todas las partículas del trail
        positionsArray[trailIndex] = position.x
        positionsArray[trailIndex + 1] = position.y
        positionsArray[trailIndex + 2] = position.z

        // Generar tamaños más pequeños aleatoriamente para las partículas del trail
        const baseSize = 1.0 // Tamaño base para la partícula original
        const trailSize = baseSize * (1.0 - (j / trailLength)) * (0.5 + Math.random() * 0.5)
        sizesArray[i * trailLength + j] = trailSize

        // Ajustar el tiempo multiplicador para todas las partículas del trail
        timeMultipliersArray[i * trailLength + j] = (0.9 - Math.random() * 0.2)

        // Ajustar el trailOffset para que las partículas se detengan progresivamente antes
        trailOffsetsArray[i * trailLength + j] = j / (trailLength + Math.random() * 12) // Ajusta la distancia de las partículas del trail
      }
    }

    return { positionsArray, sizesArray, timeMultipliersArray, trailOffsetsArray }
  }, [count, radius, trailLength])
}

export default usePositionSizeAndTimeArrays
