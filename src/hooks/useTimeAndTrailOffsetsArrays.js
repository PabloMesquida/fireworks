import { useMemo } from 'react'

function useTimeAndTrailOffsetsArrays(trailLength) {
  return useMemo(() => {
    const timeMultipliersArray = new Float32Array(trailLength)
    const trailOffsetsArray = new Float32Array(trailLength)

    for (let j = 0; j < trailLength; j++) {
      // Ajustar el tiempo multiplicador para todas las partículas del trail
      timeMultipliersArray[j] = Math.random() // Todas las partículas tienen el mismo tiempo multiplicador

      // Ajustar el trailOffset para que las partículas se detengan progresivamente antes
      trailOffsetsArray[j] = j / (trailLength + Math.random() * 12) // Ajusta la distancia de las partículas del trail
    }

    return { timeMultipliersArray, trailOffsetsArray }
  }, [trailLength])
}

export default useTimeAndTrailOffsetsArrays
